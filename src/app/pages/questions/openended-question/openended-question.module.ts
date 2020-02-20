import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { OpenEndedQuestionRoutingModule } from "./openended-question.routing.module";
import { OpenEndedQuestionComponent } from "./openended-question.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        OpenEndedQuestionRoutingModule
    ],
    declarations: [
        OpenEndedQuestionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OpenEndedQuestionModule { }
