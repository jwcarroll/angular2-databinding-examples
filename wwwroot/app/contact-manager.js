///<reference path="../custom-types/ng2.custom.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var status_board_1 = require('./status-board/status-board');
var status_board_floating_1 = require('./status-board/status-board-floating');
var twitter_1 = require('./twitter/twitter');
var ContactManager = (function () {
    function ContactManager(router, location) {
        this.router = router;
        this.location = location;
        this.title = "Angular2 Databinding Examples";
        var url = location.path();
        router.navigate(url);
    }
    ContactManager = __decorate([
        angular2_1.Component({
            selector: 'contact-manager'
        }),
        angular2_1.View({
            templateUrl: 'app/contact-manager.html',
            directives: [router_1.routerDirectives, twitter_1.TwitterLink]
        }),
        router_1.RouteConfig([
            { path: '/status-board', as: 'status-board', component: status_board_1.StatusBoard },
            { path: '/status-board-floating', as: 'status-board-floating', component: status_board_floating_1.StatusBoardFloating }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, router_1.BrowserLocation])
    ], ContactManager);
    return ContactManager;
})();
angular2_1.bootstrap(ContactManager, [
    router_1.routerInjectables
]);
