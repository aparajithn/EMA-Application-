import { Question } from "~/app/models/question";
import {Router} from "@angular/router";
import * as dialogs from "ui/dialogs";

// singleton
export class SurveyQuestionManager {

    private static instance: SurveyQuestionManager = null;
    private questions: Array<Question>;
    private _question_index: number = -1;

    private constructor(private router: Router) { // default constructor
        this.questions = new Array<Question>();
    }

    get question_index(): number {
        return this._question_index;
    }

    // get the instance of the SurveyQuestionManager singleton
    public static getInstance(router: Router): SurveyQuestionManager {
        if(SurveyQuestionManager.instance == null) {
            SurveyQuestionManager.instance = new SurveyQuestionManager(router);
        }
        return SurveyQuestionManager.instance;
    }

    // reset instance of the SurveyQuestionManager singleton to null when the survey is done
    public static resetInstance(): void {
        SurveyQuestionManager.instance = null;
    }

    // add a question object to the questions list for the survey
    public addQuestion(question: Question): void {
        this.questions.push(question);
    }

    // Return a question object for the survey based on its index in the questions list
    public getCurrentQuestion(): Question {
        return this.questions[this._question_index];
    }

    // route to next question
    public nextQuestion(): void {
        // increment question index then route to the question
        ++this._question_index;
        this.router.navigateByUrl('/buffer', {skipLocationChange: true}).then(()=>
            this.router.navigate([this.getUrlByType()]));
    }

    // route to previous question
    public previousQuestion(): void {
        // decrement the question_index and route to previous question
        --this._question_index;
        this.router.navigateByUrl('/buffer', {skipLocationChange: true}).then(()=>
            this.router.navigate([this.getUrlByType()]));
    }

    public submitSurvey(): void {
        dialogs.alert({
            title: "Survey complete",
            message: "TODO: submit survey and go back to home page.",
            okButtonText: "OK"
        }).then(() => {})
    }

    public isLastQuestion(): boolean {
        let return_bool = false;
        if(this._question_index == (this.questions.length - 1)) {
            return_bool = true;
        }
        return return_bool;
    }

    private getUrlByType(): string {
        let question_type: string = this.questions[this._question_index].type;
        let return_url: string = "";

        switch(question_type) {
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
}