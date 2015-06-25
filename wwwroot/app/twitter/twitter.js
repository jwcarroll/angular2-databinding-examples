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
var TwitterLink = (function () {
    function TwitterLink() {
    }
    Object.defineProperty(TwitterLink.prototype, "url", {
        get: function () {
            return "https://twitter.com/" + this.name;
        },
        enumerable: true,
        configurable: true
    });
    TwitterLink = __decorate([
        angular2_1.Component({
            selector: 'twitter-link',
            properties: ["name"]
        }),
        angular2_1.View({
            template: '<a [href]="url">{{name}}</a>'
        }), 
        __metadata('design:paramtypes', [])
    ], TwitterLink);
    return TwitterLink;
})();
exports.TwitterLink = TwitterLink;
