import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import * as application from "tns-core-modules/application";
import * as firebase from 'nativescript-plugin-firebase';

const appSettings = require("application-settings");

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

            showNotifications: true,
            showNotificationsWhenInForeground: true,

            onPushTokenReceivedCallback: (token) => {
                console.log('[Firebase] onPushTokenReceivedCallback:', { token });
            },

            onMessageReceivedCallback: (message: firebase.Message) => {
                console.log('[Firebase] onMessageReceivedCallback:', { message });
            }

        }).then(
            () => {
                console.log('[Firebase] Initialized');
            },
            error => {
                console.log('[Firebase] Initialize', { error });
            }
        );

        firebase.registerForPushNotifications({onPushTokenReceivedCallback: (token: string):
            void => {console.log("Firebase plugin received a push token: " + token); }});

        firebase.getCurrentPushToken().then(function(token) {
            console.log("token: " + token);
        });

        // if the user has previously signed in to the app with an evaluation id
        // route them directly to the home page
        if(appSettings.getString("evaluationId") != null) {
            this.router.navigate(["/home"]);
        }

        // disable android back button
        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
            args.cancel = true;
        });
    }
}
