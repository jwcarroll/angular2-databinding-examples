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
var timer_1 = require('../common/timer');
var dimensions = {
    rows: 25,
    cols: 60
};
var timeouts = {
    min: 50,
    max: 500
};
var statuses = [
    'active',
    'success',
    'warning',
    'danger',
    'info'
];
var requestAnimationFrame = window.requestAnimationFrame || window['mozRequestAnimationFrame'] ||
    window['webkitRequestAnimationFrame'] || window.msRequestAnimationFrame;
var StatusBoard = (function () {
    function StatusBoard() {
        this.statusBoard = [];
        this.statusUpdates = 0;
        this.timings = {};
        this._maxStatusUpdates = dimensions.cols * dimensions.rows;
        this.initStatusBoard();
        this.updateBoardCallback = this.updateBoard.bind(this);
    }
    StatusBoard.prototype.initStatusBoard = function () {
        var timer = new timer_1.Timer();
        timer.start();
        for (var row = 0; row < dimensions.rows; row++) {
            for (var col = 0; col < dimensions.cols; col++) {
                if (!this.statusBoard[row]) {
                    this.statusBoard[row] = [];
                }
                this.statusBoard[row][col] = Status.defaultStatus;
                this.updateCellAsync(row, col);
            }
        }
        timer.stop();
        this.timings['init'] = timer.elapsed();
    };
    StatusBoard.prototype.updateCellAsync = function (row, col) {
        var _this = this;
        var timeout = getRandomInt(timeouts.min, timeouts.max);
        setTimeout(function () {
            _this.statusBoard[row][col] = Status.createStatus();
            _this.statusUpdates += 1;
        }, timeout);
    };
    StatusBoard.prototype.updateBoard = function () {
        var row = getRandomInt(0, dimensions.rows);
        var col = getRandomInt(0, dimensions.cols);
        this.statusBoard[row][col] = Status.createStatus();
        this.statusUpdates += 1;
        if (this.statusUpdates < this._maxStatusUpdates) {
            requestAnimationFrame(this.updateBoardCallback);
        }
    };
    StatusBoard = __decorate([
        angular2_1.Component({
            selector: 'status-board'
        }),
        angular2_1.View({
            templateUrl: 'app/status-board/status-board.html',
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [])
    ], StatusBoard);
    return StatusBoard;
})();
exports.StatusBoard = StatusBoard;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var Status = (function () {
    function Status() {
    }
    Status.createStatus = function () {
        var status = {
            val: getRandomInt(0, statuses.length)
        };
        status.class = statuses[status.val];
        return status;
    };
    Status.defaultStatus = { val: 0, class: '' };
    return Status;
})();
