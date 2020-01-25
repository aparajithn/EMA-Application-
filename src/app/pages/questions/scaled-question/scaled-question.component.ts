import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Options } from 'ng5-slider';

@Component({
    selector: "ScaledQuestion",
    moduleId: module.id,
    styleUrls: ["./scaled-question.component.css"],
    templateUrl: "./scaled-question.component.html"
})
export class ScaledQuestionComponent implements OnInit {


    constructor(private router: Router) {
    }
    ngOnInit(): void {
    }
    value: number = 100;
    options: Options = {
        floor: 0,
        ceil: 200
    };

}

