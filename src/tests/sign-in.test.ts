import { SignInComponent} from "~/app/pages/sign-in/sign-in.component";

describe("Test sign-in success", function() {
    it("should return sign-in succeeded", function(done) {
        let signInComponent = new SignInComponent(null);

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
    it("should return sign-in failed invalid evaluation id", function (done) {
        let signInComponent = new SignInComponent(null);

        // invalid evaluation ID
        signInComponent.evaluationId = "0000";
        signInComponent.password = "abc123";

        signInComponent.signInButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-in failed: invalid evaluation ID");
                done();
            });
    });
});

describe("Test sign-in failure from incorrect password", function() {
    it("should return sign-in failed incorrect password", function (done) {
        let signInComponent = new SignInComponent(null);

        // incorrect password
        signInComponent.evaluationId = "8000";
        signInComponent.password = "123abc";

        signInComponent.signInButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-in failed: incorrect password");
                done();
            });
    });
});

describe("Test sign-in failure from invalid password", function() {
    it("should return sign-in failed invalid password", function (done) {
        let signInComponent = new SignInComponent(null);

        // invalid password
        signInComponent.evaluationId = "8000";
        signInComponent.password = "123"; /* <6 characters */

        signInComponent.signInButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-in failed: invalid password");
                done();
            });
    });
});

describe("Test sign-in failure from no evaluation id", function() {
    it("should return sign-in failed no evaluation id", function (done) {
        let signInComponent = new SignInComponent(null);

        // invalid password
        signInComponent.evaluationId = "";
        signInComponent.password = "abc123";

        signInComponent.signInButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-in failed: No evaluation id");
                done();
            });
    });
});

describe("Test sign-in failure from no password", function() {
    it("should return sign-in failed no password", function (done) {
        let signInComponent = new SignInComponent(null);

        // invalid password
        signInComponent.evaluationId = "8000";
        signInComponent.password = "";

        signInComponent.signInButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-in failed: No password");
                done();
            });
    });
});