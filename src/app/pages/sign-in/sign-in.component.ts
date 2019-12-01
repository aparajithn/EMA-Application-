import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { fromObject, fromObjectRecursive, Observable, PropertyChangeData } from "tns-core-modules/data/observable";

const firebase = require("nativescript-plugin-firebase");
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "SignIn",
    moduleId: module.id,
    styleUrls: ["./sign-in.component.css"],
    templateUrl: "./sign-in.component.html"
})
export class SignInComponent implements OnInit {

    evaluationId: string = "";
    password : string = "";
    viewModel : any;

    constructor(private router: Router) {
    }
    ngOnInit(): void {
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
                    dialogs.alert({
                        title: "Successful",
                        message: "Successfully logged in as " + JSON.stringify(result.email),
                        okButtonText: "OK"
                    }).then(() => {
                        this.router.navigate(["/home"]);
                    })
                    //console.log("RESULT EMAIL: " + JSON.stringify(result.email));
                    this.router.navigate(["/home"]);
                })
                .catch(error => {
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
                        }).then(() => {
                        })
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

    private delay(ms: number)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
