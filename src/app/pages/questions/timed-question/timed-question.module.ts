import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TimedQuestionRoutingModule } from "./timed-question-routing.module";
import { TimedQuestionComponent } from "./timed-question.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        TimedQuestionRoutingModule
    ],
    declarations: [
        TimedQuestionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TimedQuestionModule { }
