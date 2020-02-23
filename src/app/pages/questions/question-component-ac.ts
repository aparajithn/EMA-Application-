import {Router} from "@angular/router";
import {SurveyHelper} from "~/app/models/survey-helper";
import {Question} from "~/app/models/question";

export abstract class QuestionComponentAC {

    survey_helper: SurveyHelper;
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

    //---------------------------------------------------------------
    // Abstract function: saveResponse
    // Purpose: To save the user-entered response to a particular
    //              question to the survey manager.
    // Inputs:  none
    // Outputs: void
    //
    // NOTE: Will have different implementations for different types
    //          of questions.
    //---------------------------------------------------------------
    abstract saveResponse(): void;

    //---------------------------------------------------------------
    // Function: init
    // Purpose:  To initialize the elements of a question page.
    // Inputs:   none
    // Outputs:  void
    //
    // NOTE: This should be the first function called when a question
    //          page is routed to.
    //---------------------------------------------------------------
    init(): void {

        this.survey_helper = new SurveyHelper(this.router);
        this.question = this.survey_helper.getCurrentQuestion();

        // previous button should be hidden on first question
        if(this.survey_helper.survey_manager.question_index == 0) {
            this.prev_button_hidden = true;
        }

        // next button text should be "submit" if last question
        if(this.survey_helper.isLastQuestion()) {
            this.next_button_text = "Submit";
        }

        // populate question fields
        this.maxValue = this.question.upper_bound;
        this.minValue = this.question.lower_bound;
        this.text = this.question.text;
        this.lb_desc = this.question.lb_desc;
        this.up_desc = this.question.ub_desc;
    }

    //---------------------------------------------------------------
    // Function: nextButtonTapped
    // Purpose:  To save the user's response and route the user to
    //              the next question, or submit the survey if called
    //              from the last question.
    // Inputs:   none
    // Outputs:  void
    //
    // NOTE: The next button's text will be "Next" for all questions
    //          except for the last question, in which case the next
    //          button's text will be "Submit". It is still the same
    //          button in the code, so the logic for differentiating
    //          the two is handled here.
    //---------------------------------------------------------------
    nextButtonTapped(): void {
        // save response
        this.saveResponse();
        if(this.survey_helper.isLastQuestion()) {
            this.survey_helper.submitSurvey();
        }
        else {
            // go to next question
            this.survey_helper.gotoNextQuestion();
        }
    }

    //---------------------------------------------------------------
    // Function: previousButtonTapped
    // Purpose:  To route the user to the previous question.
    // Inputs:   none
    // Outputs:  void
    //
    // NOTE: The previous button is disabled on the first survey
    //          question page.
    //---------------------------------------------------------------
    previousButtonTapped(): void {
        // save response
        this.saveResponse();
        // go to previous question
        this.survey_helper.gotoPreviousQuestion();
    }
}