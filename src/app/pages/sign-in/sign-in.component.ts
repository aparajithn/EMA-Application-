import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpPostService } from "~/app/services/http-post.service";
const appSettings = require("application-settings");
import * as firebase from 'nativescript-plugin-firebase';
import * as dialogs from "tns-core-modules/ui/dialogs";
import {Page} from "ui/page";

@Component({
    selector: "SignIn",
    moduleId: module.id,
    styleUrls: ["./sign-in.component.css"],
    templateUrl: "./sign-in.component.html"
})
export class SignInComponent implements OnInit {

    evaluationId: string = "";
    password : string = "";
    isBusy: boolean = false;

    constructor(private router: Router,
                private page: Page,
                private postService: HttpPostService) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    async signInButtonTapped(): Promise<string> {
        let result_str = "";

        if(this.evaluationId === "") {
            result_str = "Sign-in failed: No evaluation id";
            dialogs.alert({
                title: "Unable to sign in",
                message: "An Evaluation ID is required.",
                okButtonText: "OK"
            }).then(() => {})
        }
        else if(this.password === "") {
            result_str = "Sign-in failed: No password";
            dialogs.alert({
                title: "Unable to sign in",
                message: "A password is required.",
                okButtonText: "OK"
            }).then(() => {})
        }
        else if(this.password.length < 6) {
            result_str = "Sign-in failed: invalid password"
            dialogs.alert({
                title: "Unable to sign in",
                message: "Password should be at least 6 characters long.",
                okButtonText: "OK"
            }).then(() => {})
        }
        else {
            this.isBusy = true;
            let firebasePushToken = "";
            // get firebase (push) notification token
            firebase.getCurrentPushToken().then(function(token) {
                console.log("token: " + token);
                firebasePushToken = token;
            });

            await firebase.login(
                {
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                        email: this.evaluationId + "@ema.org",
                        password: this.password
                    }
                })
                .then(result => {
                    result_str = "Sign-in succeeded";
                    console.log("success sign in");

                    // save evaluation id to local data under name "evaluationId"
                    appSettings.setString("evaluationId", this.evaluationId);

                    // save firebase notification token to server
                    this.postService
                        .postData(
                            { userID: +this.evaluationId, // evaluation ID (int)
                                deviceID: "0",     // device ID
                                notificationToken: firebasePushToken,     // firebase (push) notification token
                                firebaseUserToken: "0"      // firebase user token
                            },
                            "https://psubehrendema.org/setNotificationToken.php")
                        .subscribe(
                            res => {
                            },
                            err => {
                                console.log(err);
                                if((<any>err).error.text == "SUCCESSFULLY STORED NOTIFICATION TOKEN\n") {
                                    this.isBusy = false;
                                    this.router.navigate(["/home"]);
                                }
                                else {
                                    this.isBusy = false;
                                    dialogs.alert({
                                        title: "Unable to sign in",
                                        message: "An error occurred.",
                                        okButtonText: "OK"
                                    }).then(() => {})
                                }
                            });
                })
                .catch(error => {
                    this.isBusy = false;
                    console.log(error);
                    // if evaluation ID not found
                    if (error.includes('There is no user record corresponding to this identifier. The user may have been deleted.')) {
                        result_str = "Sign-in failed: invalid evaluation ID";
                        console.error("USER NOT FOUND");
                        dialogs.alert({
                            title: "Unable to sign in",
                            message: "Evaluation ID does not exist.",
                            okButtonText: "OK"
                        }).then(() => {
                        })
                    } else if (error.includes('The password is invalid or the user does not have a password.')) {
                        result_str = "Sign-in failed: incorrect password";
                        console.error("INCORRECT PASSWORD");
                        dialogs.alert({
                            title: "Unable to sign in",
                            message: "The password is invalid or the user does not have a password.",
                            okButtonText: "OK"
                        }).then(() => {})
                    } else {
                        result_str = "Sign-in failed";
                    }
                });
        }
        console.log("returning: " + result_str);
        return result_str;
    }

    routeSignUp(): void {
         this.router.navigate(["/sign-up"]);
    }
}
