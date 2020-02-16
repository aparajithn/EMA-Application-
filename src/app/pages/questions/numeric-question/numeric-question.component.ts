import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {EventData, Page} from "tns-core-modules/ui/page";
import { ListPicker } from "tns-core-modules/ui/list-picker/list-picker";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import {fromObject} from "data/observable";
import {QuestionComponentAc} from "~/app/pages/questions/question-component-ac";
registerElement('CardView', () => CardView);
const years = [1980, 1990, 2000, 2010, 2020];


@Component({
    selector: "NumericQuestion",
    moduleId: module.id,
    styleUrls: ["./numeric-question.component.css"],
    templateUrl: "./numeric-question.component.html"
})
export class NumericQuestionComponent extends QuestionComponentAc implements OnInit {
    selectedItem:Number = 0;

    constructor(private _router: Router) {
        super(_router);
    }
    ngOnInit(): void {
        super.init();
        if(this.question.response) {
            this.selectedItem = this.question.response;
        }
    }

    saveResponse(): void {
        this.question.response = this.selectedItem;
        console.log("Response recorded: " + this.question.response);
    }

    onListPickerLoaded(fargs) {
        const listPickerComponent = fargs.object;
        listPickerComponent.on("selectedIndexChange", (args: EventData) => {
            const picker = <ListPicker>args.object;
            console.log(`index: ${picker.selectedIndex}; item" ${years[picker.selectedIndex]}`);
        });
    }
}
