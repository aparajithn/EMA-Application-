import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Slider } from "tns-core-modules/ui/slider";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import {device} from "platform";
import {QuestionComponentAc} from "~/app/pages/questions/question-component-ac";
registerElement('CardView', () => CardView);
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
    selector: "OpenEnded",
    moduleId: module.id,
    styleUrls: ["./openended-question.component.css"],
    templateUrl: "./openended-question.component.html"
})
export class OpenEndedQuestionComponent extends QuestionComponentAc implements OnInit  {

    input:string;

    constructor(private _router: Router) {
        super(_router);
    }

    ngOnInit(): void {
        super.init();
        if(this.question.response) {
            this.input = this.question.response;
        }
    }

    saveResponse(): void {
        this.question.response = this.input;
        console.log("Response recorded: " + this.question.response);
    }

   onTextChanged(args){
       let textField = <TextField>args.object;
        console.log(textField.text);
        this.input = textField.text;
   }
}

