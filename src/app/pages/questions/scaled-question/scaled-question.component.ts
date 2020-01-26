import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Slider } from "tns-core-modules/ui/slider";
import { fromObject } from "tns-core-modules/data/observable";
import { BindingOptions } from "tns-core-modules/ui/core/bindable";
import {TextField} from "ui/text-field";
import {Label} from "ui/label";
const person = {
    id: 182,
    type:"Scaled",
    text:"How much have you been bothered by repeated, disturbing, and unwanted memories of the stressful experience?",
    lower_bound:10,
    upper_bound:4,
    lb_desc: "Not at all",
    up_desc: "Extremely"
}
const source = fromObject({
    TextSource: "This text was created by two way data binding"
});
const targetTextField = new Label();
const TextFieldBindingOptions: BindingOptions = {
    sourceProperty: "TextSource",
    targetProperty: "Text",
    twoWay: true
};
targetTextField.bind(TextFieldBindingOptions, source);



@Component({
    selector: "ScaledQuestion",
    moduleId: module.id,
    styleUrls: ["./scaled-question.component.css"],
    templateUrl: "./scaled-question.component.html"
})
export class ScaledQuestionComponent implements OnInit  {
    maxValue = person.lower_bound;





    constructor(private router: Router) {

    }
    ngOnInit(): void {


    }




    onSliderValueChange(args) {
        let slider = <Slider>args.object;
        console.log(`Slider new value ${args.value}`);
    }





}

