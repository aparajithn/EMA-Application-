import { Component, OnInit } from "@angular/core";
import { Observable } from "tns-core-modules/data/observable";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import {QuestionComponentAC} from "~/app/pages/questions/question-component-ac";
import {Router} from "@angular/router";
registerElement('CardView', () => CardView);
const question = {
    id: 182,
    type:"Timed",
    text1:"What time have you been going to bed on average over the course of the last month?",
    lower_bound:0,
    upper_bound:4,
    lb_desc: "Not at all",
    up_desc: "Extremely"
}
@Component({
    selector: "TimedQuestion",
    moduleId: module.id,
    styleUrls: ["./timed-question.component.css"],
    templateUrl: "./timed-question.component.html"
})
export class TimedQuestionComponent extends QuestionComponentAC implements OnInit {


    todayObj: Date = new Date();

    constructor(private _router: Router) {
        super(_router);
    }

    ngOnInit(): void {
        super.init();
        if(this.question.response) {
            this.todayObj = this.question.response
        }
    }
    //save response
    saveResponse(): void {
        this.question.response = this.todayObj;
        console.log("Response recorded: " + this.question.response);
    }


     onPickerLoaded(args) {
        let timePicker = <TimePicker>args.object;

        // handling 'timeChange' event via code behind
        timePicker.on("timeChange", (argstm: any) => {
            // args is of type PropertyChangeData
            console.log("Picked TIME: ", argstm.value);
            console.log("Previous TIME: ", argstm.oldValue);
            this.todayObj = argstm.value;

        });
    }


}

