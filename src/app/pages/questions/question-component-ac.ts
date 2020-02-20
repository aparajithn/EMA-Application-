import {SurveyQuestionManager} from "~/app/models/survey-question-manager";
import {Question} from "~/app/models/question";
import {Router} from "@angular/router";
import {Slider} from "ui/slider";

export abstract class QuestionComponentAc {

    survey_question_manager: SurveyQuestionManager;
    question: Question;

    maxValue: number;
    minValue: number;
    text: string;
    lb_desc: string;
    up_desc: string;

    prev_button_hidden: boolean = false;
    next_button_text: string = "Next";

    protected constructor(private router: Router) {
    }

    // Function to save responses to questions when the user leaves the question page.
    // Will have different implementations for different types of questions.
    abstract saveResponse(): void;

    // first function called when a question page is routed to
    init(): void {

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

    // route the user to the next question
    // NOTE: acts as the submit button if this is the last question
    nextButtonTapped(): void {
        // save response
        this.saveResponse();
        if(this.survey_question_manager.isLastQuestion()) {
            this.survey_question_manager.submitSurvey();
        }
        else {
            // go to next question
            this.survey_question_manager.nextQuestion();
        }
    }

    // route the user to the previous question
    // NOTE: will not do anything if this is the first question
    previousButtonTapped(): void {
        // save response
        this.saveResponse();
        // go to previous question
        this.survey_question_manager.previousQuestion();
    }
}