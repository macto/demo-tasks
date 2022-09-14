import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from "../../src/app/app.component";

describe("AppComponent", () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    });

    test("app is created", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    test("main component name is AppComponent", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.name).toEqual("AppComponent");
    });

    test("welcome message is displayed in home", () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector(".content p").textContent).toContain("Angular boilerplate is running!");
    });
});
