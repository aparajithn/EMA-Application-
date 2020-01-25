import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

const appSettings = require("application-settings");
const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit{

    constructor(private router: Router) {
    }

    ngOnInit() {
        firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
        }).then(
            () => {
                console.log("firebase.init done");
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );

        // if the user has previously signed in to the app with an evaluation id
        // route them directly to the home page
        if(appSettings.getString("evaluationId") != null) {
            this.router.navigate(["/home"]);
        }
    }
}
