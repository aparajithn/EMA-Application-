import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// set up firebase plugin
const firebase = require("nativescript-plugin-firebase");

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

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
