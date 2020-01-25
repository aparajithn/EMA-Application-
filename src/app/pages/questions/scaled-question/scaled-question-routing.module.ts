import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ScaledQuestionComponent } from "./scaled-question.component";

const routes: Routes = [
    { path: "", component: ScaledQuestionComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ScaledQuestionRoutingModule { }
