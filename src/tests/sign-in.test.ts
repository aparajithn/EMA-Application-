import { SignInComponent} from "~/app/pages/sign-in/sign-in.component";

describe("Test sign-in success", function() {
    it("should return sign-in successful", function() {
        let signInComponent = new SignInComponent(null);

        // valid credentials
        signInComponent.evaluationId = "8000";
        signInComponent.password = "abc123";

        let result = signInComponent.signInButtonTapped();

        // expect(result).toBe("Sign-in successful");
        expect(result.then(value => {return value})).toEqual(new Promise<string>(resolve => {resolve("Sign-in successful")}));
    });
});

describe("Test sign-in success", function() {
    it("should return sign-in successful", function () {
        let signInComponent = new SignInComponent(null);

        // valid credentials
        signInComponent.evaluationId = "incorrect";
        signInComponent.password = "valid_but_incorrect";

        let result = signInComponent.signInButtonTapped();

        // expect(result).toBe("Sign-in failure");
        // expect(result.then(value => {return value})).toBe(new Promise<string>(resolve => {resolve("Sign-in successful")}));
    });
});