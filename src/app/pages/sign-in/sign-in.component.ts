import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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

    constructor(private router: Router) {
    }
    ngOnInit(): void {
        // Init your component properties here
    }

    async signInButtonTapped(): Promise<string> {
        let result_str = "";

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
                //console.log("RESULT EMAIL: " + JSON.stringify(result.email));
                // save information and route to main page
            })
            .catch(error => {
                result_str = "Sign-in failed";
                console.log(error)
            });

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
