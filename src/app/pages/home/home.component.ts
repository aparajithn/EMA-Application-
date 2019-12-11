import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    styleUrls: ["./home.component.css"],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {
    }
    ngOnInit(): void {
        // Init your component properties here
    }

     routeSignUp(): void {
         this.router.navigate(["/sign-up"]);
     }
}
