import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

const appSettings = require("application-settings");

import { HttpPostService } from "~/app/services/http-post.service";
import {Page} from "ui/page";

@Component({
    selector: "Home",
    moduleId: module.id,
    styleUrls: ["./home.component.css"],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    display_text: string = "Looking for an available survey...";

    constructor(private router: Router,
                private postService: HttpPostService,
                private page: Page) {
    }

    ngOnInit(): void {

        this.page.actionBarHidden = true;

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
                // save survey and give to user
            },
            err => {
                let error_text = (<any>err).error.text;
                let error_status = (<any>err).status;

                // if error is caused by no available surveys
                if (error_text === "NO_AVAILABLE_SURVEY") {
                    this.display_text = "There is not an available survey at this time.";
                }
                // if error is caused by server
                else if (error_text === "ERROR") {
                    this.display_text = "The server is currently down for maintenance.";
                }
                // unknown error
                else if (error_status == 0) {
                    this.display_text = "Cannot communicate with destination server at this time.";
                }
                // any other error encountered
                else {
                    this.display_text = "An error occurred while retrieving available surveys. Please try again later.";
                }
            })
    }

    routeSignUp(): void {
        this.router.navigate(["/sign-up"]);
    }
}
