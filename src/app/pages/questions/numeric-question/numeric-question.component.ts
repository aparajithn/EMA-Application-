import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "NumericQuestion",
    moduleId: module.id,
    styleUrls: ["./numeric-question.component.css"],
    templateUrl: "./numeric-question.component.html"
})
export class NumericQuestionComponent implements OnInit {

    constructor(private router: Router) {
    }
    ngOnInit(): void {
        // Init your component properties here
    }

     /*routeSignUp(): void {
         this.router.navigate(["/sign-up"]);
     }*/
}
