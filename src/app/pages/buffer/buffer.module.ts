import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {BufferComponent} from "~/app/pages/buffer/buffer.component";
import {BufferRoutingModule} from "~/app/pages/buffer/buffer-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BufferRoutingModule
    ],
    declarations: [
        BufferComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BufferModule { }