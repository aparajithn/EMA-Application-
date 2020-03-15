import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Slider } from "tns-core-modules/ui/slider";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import {device} from "platform";
import {QuestionComponentAC} from "~/app/pages/questions/question-component-ac";
import {HttpPostService} from "~/app/services/http-post.service";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
registerElement('CardView', () => CardView);

@Component({
    selector: "ScaledQuestion",
    moduleId: module.id,
    styleUrls: ["./scaled-question.component.css"],
    templateUrl: "./scaled-question.component.html"
})
export class ScaledQuestionComponent extends QuestionComponentAC implements OnInit  {

    slider_value: number = 0;

    constructor(private _router: Router,
                private _postService: HttpPostService) {
        super(_router, _postService);
    }

    ngOnInit(): void {
        super.init();
        if(this.question.response) {
            this.slider_value = +this.question.response;
        }
    }

    saveResponse(): void {
        this.question.response = this.slider_value.toString();
        console.log("Response recorded: " + this.question.response);
    }

    onSliderValueChange(args) {
        let slider = <Slider>args.object;

        // if device is iOS, need to manually set anchor points
        if(device.os === "iOS") {
            if(slider.value < (Math.floor(slider.value)+.5)) {
                slider.value = Math.floor(slider.value);
            }
            else {
                slider.value = Math.ceil(slider.value);
            }
        }

        this.slider_value = slider.value;
    }
}

