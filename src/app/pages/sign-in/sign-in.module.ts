import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {NativeScriptFormsModule} from "nativescript-angular/forms";

import { SignInRoutingModule } from "./sign-in-routing.module";
import { SignInComponent } from "./sign-in.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SignInRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SignInComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SignInModule { }
