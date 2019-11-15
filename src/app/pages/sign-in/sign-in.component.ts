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

    signInButtonTapped(): void {
        console.log("BUTTON TAPPED");
        console.log("Evaluation ID: " + this.evaluationId);
        console.log("Password: " + this.password);
        firebase.login(
            {
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: this.evaluationId + "@ema.org",
                    password: this.password
                }
            })
            .then(result =>
                {
                    // ALERT FOR DEMO PURPOSES ONLY. TO BE REMOVED.
                    JSON.stringify(result);
                    console.log("RESULT EMAIL: " + JSON.stringify(result.email));
                    dialogs.alert({
                        title: "Successful",
                        message: "Successfully logged in as " + JSON.stringify(result.email),
                        okButtonText: "OK"
                    }).then(() => {

                    })
                })
            .catch(error => console.log(error));
    }

     routeSignUp(): void {
         this.router.navigate(["/sign-up"]);
     }
}
