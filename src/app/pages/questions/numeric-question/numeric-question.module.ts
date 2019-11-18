import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NumericQuestionRoutingModule } from "./numeric-question-routing.module";
import { NumericQuestionComponent } from "./numeric-question.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NumericQuestionRoutingModule
    ],
    declarations: [
        NumericQuestionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NumericQuestionModule { }
