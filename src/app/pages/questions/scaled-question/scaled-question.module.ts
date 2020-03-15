import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ScaledQuestionRoutingModule } from "./scaled-question-routing.module";
import { ScaledQuestionComponent } from "./scaled-question.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        ScaledQuestionRoutingModule
    ],
    declarations: [
        ScaledQuestionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ScaledQuestionModule { }
