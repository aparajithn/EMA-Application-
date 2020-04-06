import {Component} from "@angular/core";
import {Page} from "ui/page";

@Component({
    selector: "Buffer",
    moduleId: module.id,
    styleUrls: ["./buffer.component.css"],
    templateUrl: "./buffer.component.html"
})
export class BufferComponent {

    constructor(private page: Page) {
        // disable back swipe navigation for ios
        this.page.enableSwipeBackNavigation = false;
    }

}
