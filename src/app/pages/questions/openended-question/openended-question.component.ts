import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import {QuestionComponentAC} from "~/app/pages/questions/question-component-ac";
import { TextField } from "tns-core-modules/ui/text-field";
import {HttpPostService} from "~/app/services/http-post.service";
import {Page} from "ui/page";
registerElement('CardView', () => CardView);

@Component({
    selector: "OpenEnded",
    moduleId: module.id,
    styleUrls: ["./openended-question.component.css"],
    templateUrl: "./openended-question.component.html"
})
export class OpenEndedQuestionComponent extends QuestionComponentAC implements OnInit  {

    input: string = "";

    constructor(private _router: Router,
                private _postService: HttpPostService,
                private page: Page) {
        super(_router, _postService);

        // disable back swipe navigation for ios
        this.page.enableSwipeBackNavigation = false;
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
       this.input = textField.text;
   }
}

