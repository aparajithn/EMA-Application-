import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ScaledQuestionRoutingModule } from "./scaled-question-routing.module";
import { ScaledQuestionComponent } from "./scaled-question.component";
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ScaledQuestionRoutingModule,
        Ng5SliderModule
    ],
    declarations: [
        ScaledQuestionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ScaledQuestionModule { }
