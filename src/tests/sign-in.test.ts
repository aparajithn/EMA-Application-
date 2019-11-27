import { SignInComponent} from "~/app/pages/sign-in/sign-in.component";

describe("Test sign-in success", function() {
    it("should return sign-in succeeded", function(done) {
        let signInComponent = new SignInComponent(null);
        let result: any;

        // valid credentials
        signInComponent.evaluationId = "8000";
        signInComponent.password = "abc123";

        signInComponent.signInButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-in succeeded");
                done();
            });
    });
});

describe("Test sign-in failure from invalid evaluation id", function() {
    it("should return sign-in failed", function (done) {
        let signInComponent = new SignInComponent(null);

        // invalid credentials
        signInComponent.evaluationId = "incorrect";
        signInComponent.password = "valid_but_incorrect";

        signInComponent.signInButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-in failed");
                done();
            });
    });
});