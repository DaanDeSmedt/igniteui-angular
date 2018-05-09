import { Component, OnInit, ViewChild } from "@angular/core";
import { IgxComboComponent } from "../../lib/main";
@Component({
    // tslint:disable-next-line:component-selector
    selector: "combo-sample",
    templateUrl: "./sample.component.html",
    styleUrls: ["sample.component.css"]
})
export class ComboSampleComponent implements OnInit {
    private width = "160px";
    @ViewChild(IgxComboComponent) public igxCombo: IgxComboComponent;

    items: any[] = [];

    ngOnInit() {

    }

    constructor() {
        const states = [
            "New England",
            "Connecticut",
            "Maine",
            "Massachusetts",
            "New Hampshire",
            "Rhode Island",
            "Vermont",
            "Mid-Atlantic",
            "New Jersey",
            "New York",
            "Pennsylvania",
            "East North Central",
            "Illinois",
            "Indiana",
            "Michigan",
            "Ohio",
            "Wisconsin",
            "West North Central",
            "Iowa",
            "Kansas",
            "Minnesota",
            "Missouri",
            "Nebraska",
            "North Dakota",
            "South Dakota",
            "South Atlantic",
            "Delaware",
            "Florida",
            "Georgia",
            "Maryland",
            "North Carolina",
            "South Carolina",
            "Virginia",
            "District of Columbia",
            "West Virginia",
            "East South Central",
            "Alabama",
            "Kentucky",
            "Mississippi",
            "Tennessee",
            "West South Central",
            "Arkansas",
            "Louisiana",
            "Oklahoma",
            "Texas",
            "Mountain",
            "Arizona",
            "Colorado",
            "Idaho",
            "Montana",
            "Nevada",
            "New Mexico",
            "Utah",
            "Wyoming",
            "Pacific",
            "Alaska",
            "California",
            "Hawaii",
            "Oregon",
            "Washington"];

        const areas = [
            "New England",
            "Mid-Atlantic",
            "East North Central",
            "West North Central",
            "South Atlantic",
            "East South Central",
            "West South Central",
            "Mountain",
            "Pacific"
        ];

        for (let i = 0; i < states.length; i += 1) {
            const item = { field: states[i] };
            if (areas.indexOf(states[i]) !== -1) {
                item["header"] = true;
            } else if (i % 7 === 4 || i > 49) {
                item["disabled"] = true;
            }
            this.items.push(item);
        }
    }

    onSelection(ev) {
    }
}