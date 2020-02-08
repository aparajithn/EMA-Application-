import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as dialogs from "ui/dialogs";
import { device } from "tns-core-modules/platform";
const firebase = require("nativescript-plugin-firebase");

import { HttpPostService } from "~/app/services/http-post.service";
import {Page} from "ui/page";

@Component({
    selector: "SignUp",
    moduleId: module.id,
    styleUrls: ["./sign-up.component.css"],
    templateUrl: "./sign-up.component.html"
})
export class SignUpComponent implements OnInit {

    evaluationId: string = "";
    password1: string = "";
    password2: string = "";

    constructor(private router: Router,
                private postService: HttpPostService,
                private page: Page) {
    }
    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    async signUpButtonTapped(): Promise<string> {
        let result_str = "";
        let class_scope = this;

        if(this.evaluationId === "") {
            result_str = "Sign-up failed: No evaluation id";
            dialogs.alert({
                title: "Unable to sign up",
                message: "An Evaluation ID is required.",
                okButtonText: "OK"
            }).then(() => {})
        }
        else if((this.password1 === "") || (this.password2 === "")) {
            result_str = "Sign-up failed: No password";
            dialogs.alert({
                title: "Unable to sign up",
                message: "A password and password re-entry is required.",
                okButtonText: "OK"
            }).then(() => {})
        }
        else if(!(this.password1 === this.password2)) {
            result_str = "Sign-up failed: Passwords do not match";
            dialogs.alert({
                title: "Unable to sign up",
                message: "The passwords provided must match.",
                okButtonText: "OK"
            }).then(() => {})
        }
        else if(this.password1.length < 6) {
            result_str = "Sign-up failed: invalid password"
            dialogs.alert({
                title: "Unable to sign in",
                message: "Password should be at least 6 characters long.",
                okButtonText: "OK"
            }).then(() => {})
        }
        else {
            // Send a request to the server to see if evaluation ID exists
            this.postService
                .postData(
                    { userID: +this.evaluationId // evaluation ID (int)
                          // the following values will be added later:
                           //deviceID: device.uuid,     // device ID
                           //notificationToken: "",     // firebase notification token
                           //firebaseUserToken: ""      // firebase user token
                    },
                    "https://psubehrendema.org/checkUser.php")
                .subscribe(res => {
                    let evalId_exists = (<any>res).exists;

                    // if evaluationId does not exist alert user
                    if(!evalId_exists) {
                        dialogs.alert({
                            title: "Unable to sign up",
                            message: "Evaluation ID does not exist.",
                            okButtonText: "OK"
                        }).then(() => {})
                        result_str = "Sign-up failed: Non-existent evaluation id";
                    }
                    // if evaluationId does exist, use firebase to create a user and nav back to sign in page
                    else {
                        firebase.createUser({
                            email: this.evaluationId + "@ema.org",
                            password: this.password1
                        }).then(
                            function (result) {
                                result_str = "Sign-up succeeded";
                                dialogs.alert({
                                    title: "Sign up successful",
                                    okButtonText: "OK"
                                }).then(() => {
                                    //class_scope.router.navigate(["/sign-in"]);
                                })
                            },
                            function (error) {
                                if (error.includes("The email address is already in use by another account.")) {
                                    result_str = "Sign-up failed: Evaluation id already in use";
                                    dialogs.alert({
                                        title: "Unable to sign up",
                                        message: "An error occurred while signing up",
                                        okButtonText: "OK"
                                    }).then(() => {})
                                }
                                else {
                                    dialogs.alert({
                                        title: "Unable to sign up",
                                        message: "An error occurred while signing up",
                                        okButtonText: "OK"
                                    }).then(() => {})
                                }
                            }

                        )
                    }
                });
        }

        return result_str;
    }

    routeSignIn(): void {
        this.router.navigate(["/sign-in"]);
    }
}
