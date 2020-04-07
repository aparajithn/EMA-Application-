import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as dialogs from "ui/dialogs";
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
    isBusy: boolean = false;

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
            this.isBusy = true;
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
                    this.handleSignup((<any>res).exists, class_scope);
                });
        }

        return result_str;
    }

    async handleSignup(evalId_exists: boolean, class_scope: any): Promise<string> {
        let result_str = "";

        if(!evalId_exists) {
            this.isBusy = false;
            dialogs.alert({
                title: "Unable to sign up",
                message: "Evaluation ID does not exist.",
                okButtonText: "OK"
            }).then(() => {})
            result_str = "Sign-up failed: Non-existent evaluation id";
        }
        else {
            firebase.createUser({
                email: this.evaluationId + "@ema.org",
                password: this.password1
            }).then(
                function (result) {
                    // successful sign up
                    class_scope.handleFirebaseResponse(true, null, class_scope);
                },
                function (error) {
                    let id_in_use: boolean = false;

                    if (error.includes("The email address is already in use by another account.")) {
                        id_in_use = true;
                    }
                    
                    class_scope.handleFirebaseResponse(false, id_in_use, null);
                }
            )
        }

        return result_str;
    }

    async handleFirebaseResponse(is_success: boolean, id_in_use: boolean, class_scope: any): Promise<string> {
        let result_str = "";
        this.isBusy = false;

        // if successful signup
        if(is_success) {
            result_str = "Sign-up succeeded";
            dialogs.alert({
                title: "Sign up successful",
                okButtonText: "OK"
            }).then(() => {
                class_scope.router.navigate(["/sign-in"]);
            })
        }
        // if unsuccessful sign-up because evaluation id already in use
        else if(id_in_use) {
            result_str = "Sign-up failed: Evaluation id already in use";
            dialogs.alert({
                title: "Unable to sign up",
                message: "Evaluation ID already in use.",
                okButtonText: "OK"
            }).then(() => {})
        }
        // if unsuccessful sign-up for any other reason
        else {
            dialogs.alert({
                title: "Unable to sign up",
                message: "An error occurred while signing up",
                okButtonText: "OK"
            }).then(() => {})
        }

        return result_str;
    }

    routeSignIn(): string {
        this.router.navigate(["/sign-in"]);
        return "Successfully Navigated"
    }
}
