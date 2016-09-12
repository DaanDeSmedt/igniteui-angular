"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../typings/globals/node/index.d.ts" />
var core_1 = require('@angular/core');
var Infragistics = require('../../../src/main');
var AppComponent = (function () {
    function AppComponent() {
    }
    //@ViewChild('tabBar') tabBar: TabBar;
    AppComponent.prototype.selectTab = function (args) {
        console.log("index: " + args.index);
        console.log(args.tab);
        //args.tab._tabBar.remove(args.tab.index);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'demo-app',
            moduleId: module.id,
            templateUrl: "main.html",
            directives: [
                //Infragistics.Button,
                //Infragistics.Icon,
                Infragistics.TabBar,
                Infragistics.Tab
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=main.js.map