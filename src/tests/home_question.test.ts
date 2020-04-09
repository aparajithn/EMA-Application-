import {HomeComponent} from "~/app/pages/home/home.component";
import {QuestionComponentAC} from "~/app/pages/questions/question-component-ac";
import {ScaledQuestionComponent} from "~/app/pages/questions/scaled-question/scaled-question.component";
import {SurveyHelper} from "~/app/models/survey-helper";

describe("Test ability to navigate to question page when receive question", function() {
    let router = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
    it("survey received", function(done) {
        let homeComponent = new HomeComponent(router, null, null);

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

        homeComponent.handleServerResponse(res, null, null)
            .then((result) => {
                expect(result).toEqual("Survey received");
                done();
            });
    });
});

describe("Test next button navigate to next question when pressed", function() {

    let router = jasmine.createSpyObj("Router", ["navigate"]);

    it("should navigate to next question", ()=> {

        let scaledQuestionComponent = new ScaledQuestionComponent(router,null, null)
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
        scaledQuestionComponent.question = res;
        const string = scaledQuestionComponent.nextButtonTapped()
        expect(string).toBe("next question")
    });
});

describe("Test previous button navigate to previous question when pressed", function() {

    let router = jasmine.createSpyObj("Router", ["navigate", "navigateByUrl", "then"]);

    it("should navigate to previous question", ()=> {

        let scaledQuestionComponent = new ScaledQuestionComponent(router,null, null)
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
        scaledQuestionComponent.question = res;
        scaledQuestionComponent.survey_helper = new SurveyHelper(router);
        const string = scaledQuestionComponent.previousButtonTapped();
        expect(string).toBe("previous question")
    });
});
