import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "SignUp",
    moduleId: module.id,
    styleUrls: ["./sign-up.component.css"],
    templateUrl: "./sign-up.component.html"
})
export class SignUpComponent implements OnInit {

    constructor(private router: Router) {
    }
    ngOnInit(): void {
        // Init your component properties here
    }
    routeSignIn(): void {
        this.router.navigate(["/sign-in"]);
    }
}
