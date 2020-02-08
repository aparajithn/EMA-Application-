import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Slider } from "tns-core-modules/ui/slider";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
registerElement('CardView', () => CardView);
const question = {
    id: 182,
    type:"Scaled",
    text1:"How much have you been bothered by repeated, disturbing, and unwanted memories of the stressful experience?",
    lower_bound:0,
    upper_bound:4,
    lb_desc: "Not at all",
    up_desc: "Extremely"
}


@Component({
    selector: "ScaledQuestion",
    moduleId: module.id,
    styleUrls: ["./scaled-question.component.css"],
    templateUrl: "./scaled-question.component.html"
})
export class ScaledQuestionComponent implements OnInit  {
    maxValue = question.upper_bound;
    minValue = question.lower_bound;
    text:string = question.text1;
    lb_desc:string = question.lb_desc;
    up_desc:string = question.up_desc;



    constructor(private router: Router) {

    }
    ngOnInit(): void {


    }




    onSliderValueChange(args) {
        let slider = <Slider>args.object;
        console.log(`Slider new value ${args.value}`);
    }





}

