import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import {Page} from "tns-core-modules/ui/page";
import { ListPicker } from "tns-core-modules/ui/list-picker/list-picker";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import {QuestionComponentAC} from "~/app/pages/questions/question-component-ac";
import {HttpPostService} from "~/app/services/http-post.service";
registerElement('CardView', () => CardView);

@Component({
    selector: "NumericQuestion",
    moduleId: module.id,
    styleUrls: ["./numeric-question.component.css"],
    templateUrl: "./numeric-question.component.html"
})
export class NumericQuestionComponent extends QuestionComponentAC implements OnInit/*, AfterViewInit*/ {
    selectedIndex: number = 0;
    private list_values: Array<number>;

    constructor(private _router: Router,
                private _postService: HttpPostService,
                private page: Page) {
        super(_router, _postService);
        this.list_values = new Array<number>();

        // disable back swipe navigation for ios
        this.page.enableSwipeBackNavigation = false;
    }
    ngOnInit(): void {
        super.init();
        //populate list picker fields
        for(let i = this.minValue;i<=this.maxValue;i++){
            this.list_values.push(i);
        }
        // set the initial list picker position if a response has already been recorded
        if(this.question.response && (this.list_values.indexOf(+this.question.response) > -1)) {
            this.selectedIndex = this.list_values.indexOf(+this.question.response);
        }
    }

    saveResponse(): void {
        this.question.response = this.list_values[this.selectedIndex].toString();
    }

    onListPickerIndexChange(args) {
        let picker = <ListPicker>args.object;
        this.selectedIndex = picker.selectedIndex;
    }
}
