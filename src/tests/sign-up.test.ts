import { SignUpComponent} from "~/app/pages/sign-up/sign-up.component";

describe("Test sign-up success from valid evaluation id and password", function() {
    let router = jasmine.createSpyObj("Router", ["navigate"]);
    it("should return sign-up succeeded", function(done) {
        let signUpComponent = new SignUpComponent(router, null, null);

        let is_success: boolean = true;

        signUpComponent.handleFirebaseResponse(is_success, null, this)
            .then((result) => {
                expect(result).toEqual("Sign-up succeeded");
                done();
            });
    });
});

describe("Test sign-up failure from evaluation id already in use", function() {
    let router = jasmine.createSpyObj("Router", ["navigate"]);
    it("should return sign-up failed from evaluation id already in use", function(done) {
        let signUpComponent = new SignUpComponent(router, null, null);

        let is_success: boolean = false;
        let id_in_use: boolean = true;

        signUpComponent.handleFirebaseResponse(is_success, id_in_use, this)
            .then((result) => {
                expect(result).toEqual("Sign-up failed: Evaluation id already in use");
                done();
            });
    });
});

describe("Test sign-up failure from non-existent evaluation id", function() {
    let router = jasmine.createSpyObj("Router", ["navigate"]);
    it("should return sign-up failed from non-existent evaluation id", function(done) {
        let signUpComponent = new SignUpComponent(router, null, null);

        let evalId_exists: boolean = false;

        signUpComponent.handleSignup(evalId_exists, null)
            .then((result) => {
                expect(result).toEqual("Sign-up failed: Non-existent evaluation id");
                done();
            });
    });
})

describe("Test sign-up failure from passwords not matching", function() {
    it("should return sign-up failed from passwords not matching", function(done) {
        let signUpComponent = new SignUpComponent(null, null, null);

        // invalid credentials
        signUpComponent.evaluationId = "8000";
        signUpComponent.password1 = "abc123";
        signUpComponent.password2 = "123abc";

        signUpComponent.signUpButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-up failed: Passwords do not match");
                done();
            });
    });
});

describe("Test sign-up failure from no evaluation id", function() {
    it("should return sign-up failed from no evaluation id", function(done) {
        let signUpComponent = new SignUpComponent(null, null, null);

        // invalid credentials
        signUpComponent.evaluationId = "";
        signUpComponent.password1 = "abc123";
        signUpComponent.password2 = "abc123";

        signUpComponent.signUpButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-up failed: No evaluation id");
                done();
            });
    });
});

describe("Test sign-up failure from no password", function() {
    it("should return sign-up failed from no password", function(done) {
        let signUpComponent = new SignUpComponent(null, null, null);

        // invalid credentials
        signUpComponent.evaluationId = "8000";
        signUpComponent.password1 = "";
        signUpComponent.password2 = "";

        signUpComponent.signUpButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-up failed: No password");
                done();
            });
    });
});

describe("Test sign-up failure from invalid password", function() {
    it("should return sign-up failed from invalid password", function(done) {
        let signUpComponent = new SignUpComponent(null, null, null);

        // invalid credentials
        signUpComponent.evaluationId = "8000";
        signUpComponent.password1 = "123";
        signUpComponent.password2 = "123";

        signUpComponent.signUpButtonTapped()
            .then((result) => {
                expect(result).toEqual("Sign-up failed: invalid password");
                done();
            });
    });
});