import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
registerElement('CardView', () => CardView);

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
