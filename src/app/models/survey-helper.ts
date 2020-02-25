import {SurveyManager} from "~/app/models/survey-manager";
import {Router} from "@angular/router";
import {Question} from "~/app/models/question";
import * as dialogs from "ui/dialogs";
import {HttpPostService} from "~/app/services/http-post.service";
import { TSMap } from "typescript-map"

const appSettings = require("application-settings");

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
    //
    // Example JSON body for a survey:
    //  {
    //    "userID": 8000,
    //    "deviceID": "1",
    //    "survey":
    //      {
    //        "0":
    //          {
    //            "questionID": "233",
    //            "response": "User response as string"
    //          },
    //        "1":
    //          {
    //            "questionID": "236",
    //            "response": "Another user response as string"
    //          }
    //      }
    //  }
    //---------------------------------------------------------------
    public async submitSurvey(postService: HttpPostService): Promise<void> {
        let class_scope: any = this;

        // create a survey JSON object
        let survey = new TSMap<string,Object>();

        // construct each question and response into a JSON object and add to the survey
        for(let counter:number = 0; counter < this.survey_manager.questions.length; ++counter) {
            let question = new TSMap<string,string>();
            question.set("questionID", this.survey_manager.questions[counter].id.toString());
            question.set("response", this.survey_manager.questions[counter].response);
            survey.set(counter.toString(), question.toJSON());
        }

        let data =
            {
                userID: +appSettings.getString("evaluationId"),
                deviceID: "1",
                survey: survey.toJSON()
            };

        console.log(data);

        // send the request to the survey with the survey responses
        postService
            .postData(data, "https://psubehrendema.org/setSurvey.php")
            .subscribe(
                res => {
                    console.log("Response");
                    console.log(res);
                },
                // The server responds with an error even when successfully submitted.
                // Both success and failure are handled in the case of error response.
                err => {
                    let dialog_message: string = "Unable to submit responses at this time. Please try again later.";
                    console.log("Error");
                    console.log("'"+(<any>err).error.text + "'");

                    if ((<any>err).error.text == "Responses stored successfully.\n") {
                        dialog_message = "Your responses have been submitted!";
                    }

                    // display dialog
                    dialogs.alert({
                        message: dialog_message,
                        okButtonText: "OK"
                    }).then(() => {
                        // return to home page
                        class_scope.router.navigate(["/home"]);
                    });
                }
            )
    }
}