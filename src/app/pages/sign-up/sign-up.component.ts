import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as dialogs from "ui/dialogs";

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

    constructor(private router: Router) {
    }
    ngOnInit(): void {
        // Init your component properties here
    }

    async signUpButtonTapped(): Promise<string> {
        let result_str = "";

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
                message: "The passwords provided do not match.",
                okButtonText: "OK"
            }).then(() => {})
        }
        else if(this.password1.length < 6) {
            dialogs.alert({
                title: "Unable to sign in",
                message: "Password should be at least 6 characters long.",
                okButtonText: "OK"
            }).then(() => {})
        }
        else {
            dialogs.alert({
                title: "For demo",
                message: "Valid credentials. This is where the call to the database is made.",
                okButtonText: "OK"
            }).then(() => {})
            // Send a request to the server to see if evaluation ID exists
            // If it does, use firebase to create a user
        }

        return result_str;
    }

    routeSignIn(): void {
        this.router.navigate(["/sign-in"]);
    }
}
