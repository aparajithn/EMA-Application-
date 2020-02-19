import { Question } from "~/app/models/question";

// singleton
export class SurveyManager {

    private static instance: SurveyManager = null;
    private _questions: Array<Question>;
    private _question_index: number = -1;

    private constructor() { // default constructor
        this._questions = new Array<Question>();
    }

    get questions(): Array<Question> {
        return this._questions;
    }

    get question_index(): number {
        return this._question_index;
    }

    set question_index(value: number) {
        this._question_index = value;
    }

    //---------------------------------------------------------------
    // Static function: getInstance
    // Purpose:  To return the instance of the survey manager
    //              singleton.
    // Inputs:   none
    // Outputs:  SurveyManager
    //---------------------------------------------------------------
    public static getInstance(): SurveyManager {
        if(SurveyManager.instance == null) {
            SurveyManager.instance = new SurveyManager();
        }
        return SurveyManager.instance;
    }

    //---------------------------------------------------------------
    // Static function: resetInstance
    // Purpose:  To clear the survey manager singleton instance when
    //              a survey has been completed.
    // Inputs:   none
    // Outputs:  void
    //---------------------------------------------------------------
    // reset instance of the SurveyManager singleton to null when the survey is done
    public static resetInstance(): void {
        SurveyManager.instance = null;
    }
}