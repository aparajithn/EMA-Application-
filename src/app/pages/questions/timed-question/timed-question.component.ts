import { Component, OnInit } from "@angular/core";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import { QuestionComponentAC } from "~/app/pages/questions/question-component-ac";
import { Router } from "@angular/router";
import {HttpPostService} from "~/app/services/http-post.service";
registerElement('CardView', () => CardView);

@Component({
    selector: "TimedQuestion",
    moduleId: module.id,
    styleUrls: ["./timed-question.component.css"],
    templateUrl: "./timed-question.component.html"
})
export class TimedQuestionComponent extends QuestionComponentAC implements OnInit {

    todayObj: Date = new Date();

    constructor(private _router: Router,
                private _postService: HttpPostService) {
        super(_router, _postService);
    }

    ngOnInit(): void {
        super.init();
        if(this.question.response) {
            let split_time = this.question.response.split(":");
            this.todayObj = new Date(null, null, null, split_time[0], split_time[1], null, null);
        }
    }

    saveResponse(): void {
        this.question.response = this.todayObj.getHours() + ":" + this.todayObj.getMinutes();
        console.log("Response recorded: " + this.question.response);
    }
    onPickerLoaded(args) {
        let timePicker = <TimePicker>args.object;

        // handling 'timeChange' event via code behind
        timePicker.on("timeChange", (argstm: any) => {
            // args is of type PropertyChangeData
            this.todayObj = argstm.value;

        });
    }
}

