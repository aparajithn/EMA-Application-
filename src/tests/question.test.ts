import { Router } from "@angular/router";
import {ScaledQuestionComponent} from "~/app/pages/questions/scaled-question/scaled-question.component";

describe("Test if responses are saved when next button is clicked ", function() {
    let router = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
    it("Should return ", () => {
        let scaledComponent = new ScaledQuestionComponent(router, null, null);

        //let res: any = "test";
        let res: any =
            [
                {
                    "id": 192,
                    "type": "Scaled",
                    "text": "How much have you been bothered by having strong negative feelings such as fear, horror, anger, guilt, or shame?",
                    "lower_bound": 0,
                    "upper_bound": 4,
                    "lb_desc": "Not at all",
                    "ub_desc": "Extremely"
                }
            ];
        scaledComponent.question = res;

        const string = scaledComponent.saveResponse();
        expect(string).toBe("Response Recorded");
    });
});



