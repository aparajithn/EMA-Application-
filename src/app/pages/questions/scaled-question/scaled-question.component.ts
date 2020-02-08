import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Slider } from "tns-core-modules/ui/slider";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import {Survey} from "~/app/models/survey";
import {Question} from "~/app/models/question";
registerElement('CardView', () => CardView);

@Component({
    selector: "ScaledQuestion",
    moduleId: module.id,
    styleUrls: ["./scaled-question.component.css"],
    templateUrl: "./scaled-question.component.html"
})
export class ScaledQuestionComponent implements OnInit  {

    question: Question;
    maxValue: number;
    minValue: number;
    text: string;
    lb_desc: string;
    up_desc: string;

    constructor(private router: Router) {
    }

    ngOnInit(): void {

        // index temporarily hard-coded until factory set up
        this.question = Survey.getInstance().getQuestionByIdx(0);

        this.maxValue = this.question.upper_bound;
        this.minValue = this.question.lower_bound;
        this.text = this.question.text;
        this.lb_desc = this.question.lb_desc;
        this.up_desc = this.question.ub_desc;
    }

    onSliderValueChange(args) {
        let slider = <Slider>args.object;
        console.log(`Slider new value ${args.value}`);
    }





}

