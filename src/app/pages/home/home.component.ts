import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

const appSettings = require("application-settings");

import { HttpPostService } from "~/app/services/http-post.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    styleUrls: ["./home.component.css"],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(private router: Router,
                private postService: HttpPostService) {
    }

    ngOnInit(): void {
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
            .subscribe(res => {
                console.log(res);
            })
    }

    routeSignUp(): void {
        this.router.navigate(["/sign-up"]);
    }
}
