import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {EventData, Page} from "tns-core-modules/ui/page";
import { ListPicker } from "tns-core-modules/ui/list-picker/list-picker";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import {fromObject} from "data/observable";
import {QuestionComponentAC} from "~/app/pages/questions/question-component-ac";
import {Question} from "~/app/models/question";
registerElement('CardView', () => CardView);
let i;

@Component({
    selector: "NumericQuestion",
    moduleId: module.id,
    styleUrls: ["./numeric-question.component.css"],
    templateUrl: "./numeric-question.component.html"
})
export class NumericQuestionComponent extends QuestionComponentAC implements OnInit {
    selectedItem:any;
    private input: Array<number>;

    constructor(private _router: Router) {
        super(_router);
        this.input = new Array<number>();
    }
    ngOnInit(): void {
        super.init();
        //populate list picker fields
        for(i = this.minValue;i<=this.maxValue;i++){
            this.input.push(i);
        }

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
            this.selectedItem= (<any>picker).selectedValue + 1;

        });
    }
}
