import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "SignIn",
    moduleId: module.id,
    styleUrls: ["./sign-in.component.css"],
    templateUrl: "./sign-in.component.html"
})
export class SignInComponent implements OnInit {

    constructor(private router: Router) {
    }
    ngOnInit(): void {
        // Init your component properties here
    }

     routeSignUp(): void {
         this.router.navigate(["/sign-up"]);
     }
}
