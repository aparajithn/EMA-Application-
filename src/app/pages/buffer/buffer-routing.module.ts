import {Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NativeScriptRouterModule} from "nativescript-angular";
import {BufferComponent} from "~/app/pages/buffer/buffer.component";

const routes: Routes = [
    { path: "", component: BufferComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BufferRoutingModule { }
