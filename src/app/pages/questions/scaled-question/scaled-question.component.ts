import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Slider } from "tns-core-modules/ui/slider";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import { SurveyQuestionManager } from "~/app/models/survey-question-manager";
import { Question } from "~/app/models/question";
import {device} from "platform";
registerElement('CardView', () => CardView);

@Component({
    selector: "ScaledQuestion",
    moduleId: module.id,
    styleUrls: ["./scaled-question.component.css"],
    templateUrl: "./scaled-question.component.html"
})
export class ScaledQuestionComponent implements OnInit  {

    survey_question_manager: SurveyQuestionManager;
    question: Question;

    maxValue: number;
    minValue: number;
    text: string;
    lb_desc: string;
    up_desc: string;

    prev_button_hidden: boolean = false;
    next_button_text: string = "Next";

    constructor(private router: Router) {
    }

    ngOnInit(): void {

        this.survey_question_manager = SurveyQuestionManager.getInstance(this.router);
        this.question = this.survey_question_manager.getCurrentQuestion();

        // previous button should be hidden on first question
        if(this.survey_question_manager.question_index == 0) {
            this.prev_button_hidden = true;
        }

        // next button text should be "submit" if last question
        if(this.survey_question_manager.isLastQuestion()) {
            this.next_button_text = "Submit";
        }

        // populate question fields
        this.maxValue = this.question.upper_bound;
        this.minValue = this.question.lower_bound;
        this.text = this.question.text;
        this.lb_desc = this.question.lb_desc;
        this.up_desc = this.question.ub_desc;
    }

    onSliderValueChange(args) {
        // if device is iOS, need to manually set anchor points
        if(device.os === "iOS") {
            let slider = <Slider>args.object;
            slider.value = Math.floor(slider.value);
        }
    }

    // route the user to the next question
    // NOTE: acts as the submit button if this is the last question
    nextButtonTapped(): void {
        console.log("Next button tapped.");
        this.survey_question_manager.nextQuestion();
    }

    // route the user to the previous question
    // NOTE: will not do anything if this is the first question
    previousButtonTapped(): void {
        this.survey_question_manager.previousQuestion();
    }

}

