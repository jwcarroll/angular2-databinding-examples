/// <reference path="../../typings/tsd.d.ts" />
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
var dimensions = {
    rows: 30,
    cols: 10
};
var requestAnimationFrame = window.requestAnimationFrame || window['mozRequestAnimationFrame'] ||
    window['webkitRequestAnimationFrame'] || window.msRequestAnimationFrame;
var StatusBoardFloating = (function () {
    function StatusBoardFloating() {
        this.statusBoard = [];
        this._lastStep = 0;
        this._config = {
            velocity: {
                x: { min: 0, max: 100 },
                y: { min: 0, max: 100 }
            },
            bounds: {
                x: { min: 100, max: 900 },
                y: { min: 100, max: 700 }
            }
        };
        this.initStatusBoard();
        requestAnimationFrame(this.updateBoard.bind(this));
    }
    StatusBoardFloating.prototype.initStatusBoard = function () {
        for (var row = 0; row < dimensions.rows; row++) {
            for (var col = 0; col < dimensions.cols; col++) {
                if (!this.statusBoard[row]) {
                    this.statusBoard[row] = [];
                }
                this.statusBoard[row][col] = Position.create(this._config);
            }
        }
    };
    StatusBoardFloating.prototype.updateBoard = function (elapsedMilliseconds) {
        var elapsedSeconds = new TimeSpan(elapsedMilliseconds - this._lastStep).totalSeconds;
        this._lastStep = elapsedMilliseconds;
        for (var row = 0; row < dimensions.rows; row++) {
            for (var col = 0; col < dimensions.cols; col++) {
                this.statusBoard[row][col].move(elapsedSeconds, this._config.bounds);
            }
        }
        requestAnimationFrame(this.updateBoard.bind(this));
    };
    StatusBoardFloating = __decorate([
        angular2_1.Component({
            selector: 'status-board'
        }),
        angular2_1.View({
            templateUrl: 'app/status-board/status-board-floating.html',
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [])
    ], StatusBoardFloating);
    return StatusBoardFloating;
})();
exports.StatusBoardFloating = StatusBoardFloating;
var Position = (function () {
    function Position(x, y, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }
    Position.prototype.move = function (timeDelta, bounds) {
        this.x += (this.velocityX * timeDelta);
        this.y += (this.velocityY * timeDelta);
        this.top = this.y + "px";
        this.left = this.x + "px";
        if (!bounds)
            return;
        if (this.x > bounds.x.max || this.x < bounds.x.min) {
            this.x = this.x > bounds.x.max ? bounds.x.max : bounds.x.min;
            this.velocityX *= -1;
        }
        if (this.y > bounds.y.max || this.y < bounds.y.min) {
            this.y = this.y > bounds.y.max ? bounds.y.max : bounds.y.min;
            this.velocityY *= -1;
        }
    };
    Position.create = function (config) {
        return new Position(getRandomInt(config.bounds.x.min, config.bounds.x.max), getRandomInt(config.bounds.y.min, config.bounds.y.max), getRandomInt(config.velocity.x.min, config.velocity.x.max), getRandomInt(config.velocity.y.min, config.velocity.y.max));
    };
    return Position;
})();
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var TimeSpan = (function () {
    function TimeSpan(_totalMilliseconds) {
        if (_totalMilliseconds === void 0) { _totalMilliseconds = 0; }
        this._totalMilliseconds = _totalMilliseconds;
    }
    Object.defineProperty(TimeSpan.prototype, "totalSeconds", {
        get: function () {
            return this._totalMilliseconds / 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "totalMilliseconds", {
        get: function () {
            return this._totalMilliseconds;
        },
        enumerable: true,
        configurable: true
    });
    return TimeSpan;
})();
