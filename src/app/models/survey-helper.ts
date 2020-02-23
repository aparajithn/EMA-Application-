import {SurveyManager} from "~/app/models/survey-manager";
import {Router} from "@angular/router";
import {Question} from "~/app/models/question";
import * as dialogs from "ui/dialogs";

export class SurveyHelper {

    private _survey_manager: SurveyManager;

    public constructor(private router: Router) {
        this._survey_manager = SurveyManager.getInstance();
    }

    get survey_manager(): SurveyManager {
        return this._survey_manager;
    }

    //---------------------------------------------------------------
    // Function: getUrlByType
    // Purpose:  To return the URL for the type of question that will
    //              be routed to.
    // Inputs:   none
    // Outputs:  string
    //---------------------------------------------------------------
    private getUrlByType(): string {

        let return_url: string = "";

        switch(this._survey_manager.questions[this._survey_manager.question_index].type) {
            case "Scaled":
                return_url = "/scaled-question";
                break;
            case "Numeric":
                return_url = "/numeric-question";
                break;
            case "Time":
                return_url = "/timed-question";
                break;
            case "Open-Ended":
                return_url = "/openended-question";
        }

        return return_url;
    }

    //---------------------------------------------------------------
    // Function: gotoNewQuestion
    // Purpose:  To route to the buffer page and then to the next
    //              question page.
    // Inputs:   none
    // Outputs:  void
    //
    // NOTE: This function also acts as a "refresh" if routing from
    //          a question to a different question of the same type.
    //          If the buffer page is not routed to in between, the
    //          values do not refresh because it thinks it is going
    //          to the same page it was just on.
    //---------------------------------------------------------------
    private gotoNewQuestion(): void {

        this.router.navigateByUrl('/buffer', {skipLocationChange: true}).then(()=>
            this.router.navigate([this.getUrlByType()]));

    }

    //---------------------------------------------------------------
    // Function: isLastQuestion
    // Purpose:  To determine if the survey is on the last question.
    // Inputs:   none
    // Outputs:  boolean
    //---------------------------------------------------------------
    public isLastQuestion(): boolean {

        let return_bool = false;

        if(this._survey_manager.question_index == (this._survey_manager.questions.length - 1)) {
            return_bool = true;
        }

        return return_bool;
    }

    //---------------------------------------------------------------
    // Function: addQuestion
    // Purpose:  To add a question to the survey when initializing.
    // Inputs:   Question
    // Outputs:  void
    //---------------------------------------------------------------
    public addQuestion(new_question: Question): void {
        this._survey_manager.questions.push(new_question);
    }

    //---------------------------------------------------------------
    // Function: getCurrentQuestion
    // Purpose:  To retrieve and return the current question that the
    //              survey is on.
    // Inputs:   none
    // Outputs:  Question
    //---------------------------------------------------------------
    public getCurrentQuestion(): Question {
        return this._survey_manager.questions[this._survey_manager.question_index];
    }

    //---------------------------------------------------------------
    // Function: gotoNextQuestion
    // Purpose:  To route to the next question in the survey.
    // Inputs:   none
    // Outputs:  void
    //---------------------------------------------------------------
    public gotoNextQuestion(): void {
        // increment question index then route to the question
        ++this._survey_manager.question_index;
        this.gotoNewQuestion();
    }

    //---------------------------------------------------------------
    // Function: gotoPreviousQuestion
    // Purpose:  To route to the previous question in the survey.
    // Inputs:   none
    // Outputs:  void
    //---------------------------------------------------------------
    public gotoPreviousQuestion(): void {

        // decrement the question_index and route to previous question
        --this._survey_manager.question_index;
        this.gotoNewQuestion();
    }

    //---------------------------------------------------------------
    // Function: submitSurvey
    // Purpose:  To end the survey and submit the completed survey
    //              question responses to the server.
    // Inputs:   none
    // Outputs:  number
    //---------------------------------------------------------------
    public submitSurvey(): number {

        // temporary dialog until submit put into place

        dialogs.alert({
            title: "Survey complete",
            message: "TODO: submit survey and go back to home page.",
            okButtonText: "OK"
        }).then(() => {})

        return 0;
    }
}