import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
    logoImage = "../../assets/images/large_logo.svg";
    constructor(public layoutService: LayoutService) { }
}
