import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
registerElement('CardView', () => CardView);

const appSettings = require("application-settings");

import { HttpPostService } from "~/app/services/http-post.service";
import { Page } from "ui/page";
import { Question } from "~/app/models/question";
import {SurveyHelper} from "~/app/models/survey-helper";

@Component({
    selector: "Home",
    moduleId: module.id,
    styleUrls: ["./home.component.css"],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    display_text: string = "Looking for an available survey...";
    survey_helper: SurveyHelper;
    isBusy: boolean = false;

    constructor(private router: Router,
                private postService: HttpPostService,
                private page: Page) {
        this.survey_helper = new SurveyHelper(this.router);

        // disable back swipe navigation for ios
        if(page != null) {
            this.page.enableSwipeBackNavigation = false;
        }
    }

    ngOnInit(): void {

        console.log("INIT HOME");

        this.page.actionBarHidden = true;

        this.checkForSurvey();
    }

    checkForSurvey(): void {

        this.isBusy = true;

        // Send request to the server to check for available survey
        this.postService
            .postData(
                {
                    userID: appSettings.getString("evaluationId"),
                    // Due to the way this endpoint is set up, deviceID is not taken into
                    //   account when retrieving a survey. However, if it is set to "0",
                    //   the request returns with an error. Therefor it has been hard-coded
                    //   here as "1".
                    deviceID: "1"
                },
                "https://psubehrendema.org/getSurvey.php"
            )
            .subscribe(
                res => {
                    this.handleServerResponse(res, null, null);
                },
                err => {
                    this.handleServerResponse(null, (<any>err).error.text, (<any>err).status);
                })
    }

    async handleServerResponse(res: any, error_text: string, error_status: number): Promise<string> {
        let result_str: string = "";

        this.isBusy = false;

        console.log(error_text);

        if (res) {
            result_str = "Survey received";
            this.display_text = "Survey received! Starting survey...";

            // save survey
            let res_questions = (<any>res);

            // iterate through questions and add them to the survey singleton
            for (let res_question of res_questions) {

                // create a new Question object and set its attributes based on the response
                let question = new Question(
                    res_question.id,
                    res_question.type,
                    res_question.text,
                    res_question.lower_bound,
                    res_question.upper_bound,
                    res_question.lb_desc,
                    res_question.ub_desc
                );

                // add the question to the survey singleton
                this.survey_helper.addQuestion(question);

                console.log(question);
            }

            // begin the survey with the first question
            setTimeout(() => {
                this.survey_helper.gotoNextQuestion();
                   },
               500);
        }
        // if error is caused by no available surveys
        else if (error_text === "NO_AVAILABLE_SURVEY") {
            result_str = "No survey available";
            this.display_text = "There is not an available survey at this time.";
        }
        // if error is caused by server
        else if (error_text === "ERROR") {
            result_str = "Server down for maintenance";
            this.display_text = "The server is currently down for maintenance.";
        }
        // unknown error
        else if (error_status == 0) {
            result_str = "Cannot communicate with server";
            this.display_text = "Cannot communicate with destination server at this time.";
        }
        // any other error encountered
        else {
            result_str = "Error occurred";
            this.display_text = "An error occurred while retrieving available surveys. Please try again later.";
        }

        return result_str;
    }
}
