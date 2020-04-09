import { SignInComponent} from "~/app/pages/sign-in/sign-in.component";
import { Router } from "@angular/router";
import { SignUpComponent} from "~/app/pages/sign-up/sign-up.component";

describe("Test navigating to sign-up success", function() {

    let router = jasmine.createSpyObj("Router", ["navigate"]);

    it("should navigate to sign-up page ", ()=> {

        let signInComponent = new SignInComponent(router, null, null);

        const string = signInComponent.routeSignUp();
        expect(string).toBe("Successfully Navigated")
    });
});

describe("Test navigating to sign-in when sign-up success", function() {

    let router = jasmine.createSpyObj("Router", ["navigate"]);

    it("should navigate to sign-up page ", ()=> {

        let signUpComponent = new SignUpComponent(router, null,null);

        const string = signUpComponent.routeSignIn();
        expect(string).toBe("Successfully Navigated")
    });
});




