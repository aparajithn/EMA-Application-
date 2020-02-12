import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/sign-in", pathMatch: "full" },
    { path: "sign-in", loadChildren: "~/app/pages/sign-in/sign-in.module#SignInModule"},
    { path: "sign-up", loadChildren: "~/app/pages/sign-up/sign-up.module#SignUpModule"},
    { path: "home", loadChildren: "~/app/pages/home/home.module#HomeModule"},
    { path: "buffer", loadChildren: "~/app/pages/buffer/buffer.module#BufferModule"},
    { path: "scaled-question", loadChildren: "~/app/pages/questions/scaled-question/scaled-question.module#ScaledQuestionModule"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
