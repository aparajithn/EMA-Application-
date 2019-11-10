import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SignUpRoutingModule } from "./sign-up-routing.module";
import { SignUpComponent } from "./sign-up.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SignUpRoutingModule
    ],
    declarations: [
        SignUpComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SignUpModule { }