import { Question } from "~/app/models/question";

// singleton
export class Survey {

    private static instance: Survey = null;
    private questions: Array<Question>;

    private constructor() { // default constructor
        this.questions = new Array<Question>();
    }

    // get the instance of the Survey singleton
    public static getInstance(): Survey {
        if(Survey.instance == null) {
            Survey.instance = new Survey();
        }
        return Survey.instance;
    }

    // reset instance of the Survey singleton to null when the survey is done
    public static resetInstance(): void {
        Survey.instance = null;
    }

    // add a question object to the questions list for the survey
    public addQuestion(question: Question): void {
        this.questions.push(question);
    }

    // Return a question object for the survey based on its index in the questions list
    public getQuestionByIdx(index: number): Question {
        return this.questions[index];
    }
}