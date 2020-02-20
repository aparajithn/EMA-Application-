import { HomeComponent } from "~/app/pages/home/home.component";
import { Router } from "@angular/router";

describe("Test home page display when survey available", function() {
    let router = jasmine.createSpyObj("Router", ["navigateByUrl", "navigate"]);
    it("should return survey received", function(done) {
        let homeComponent = new HomeComponent(router, null, null);

        //let res: any = "test";
        let res: any =
            [
                {
                    "id": 192,
                    "type": "Scaled",
                    "text": "How much have you been bothered by having strong negative feelings such as fear, horror, anger, guilt, or shame?",
                    "lower_bound": 0,
                    "upper_bound": 4,
                    "lb_desc": "Not at all",
                    "ub_desc": "Extremely"
                }
            ];

        homeComponent.handleServerResponse(res, null, null)
            .then((result) => {
                expect(result).toEqual("Survey received");
                done();
            });
    });
});

describe("Test home page display when no survey available", function() {
    let router = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    it("should return no survey available", function(done) {
        let homeComponent = new HomeComponent(router, null, null);

        homeComponent.handleServerResponse(null, "NO_AVAILABLE_SURVEY", null)
            .then((result) => {
                expect(result).toEqual("No survey available");
                done();
            });
    });
});

describe("Test home page display when server down as expected", function() {
    let router = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    it("should return server down for maintenance", function(done) {
        let homeComponent = new HomeComponent(router, null, null);

        homeComponent.handleServerResponse(null, "ERROR", null)
            .then((result) => {
                expect(result).toEqual("Server down for maintenance");
                done();
            });
    });
});

describe("Test home page display when server unreachable", function() {
    let router = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    it("should return cannot communicate with server", function(done) {
        let homeComponent = new HomeComponent(router, null, null);

        homeComponent.handleServerResponse(null, null, 0)
            .then((result) => {
                expect(result).toEqual("Cannot communicate with server");
                done();
            });
    });
});

describe("Test home page display when unexpected error", function() {
    let router = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    it("should return error occurred", function(done) {
        let homeComponent = new HomeComponent(router, null, null);

        homeComponent.handleServerResponse(null, null, null)
            .then((result) => {
                expect(result).toEqual("Error occurred");
                done();
            });
    });
});
