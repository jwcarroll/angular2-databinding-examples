/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';
import * as _ from 'lodash';
import {Timer} from '../common/timer';
import {TimeSpan} from '../common/timespan';

interface IStatus {
	val: number,
	class: string
}

interface ITimings{
	[index: string]:TimeSpan
}

var dimensions = {
	rows: 25,
	cols: 60
};

var timeouts = {
	min:50,
	max:500
}

var statuses = [
	'active',
	'success',
	'warning',
	'danger',
	'info'
];

var requestAnimationFrame = window.requestAnimationFrame || window['mozRequestAnimationFrame'] ||
    window['webkitRequestAnimationFrame'] || window.msRequestAnimationFrame;

@Component({
	selector: 'status-board'
})
@View({
	templateUrl: 'app/status-board/status-board.html',
	directives: [NgFor, NgIf]
})
export class StatusBoard {
	statusBoard: IStatus[][] = [];
	updateBoardCallback: () => void;
	statusUpdates: number = 0;
	timings:ITimings = {};

	private _maxStatusUpdates: number = dimensions.cols * dimensions.rows;

	constructor() {
		this.initStatusBoard();
		this.updateBoardCallback = this.updateBoard.bind(this);

		//requestAnimationFrame(this.updateBoardCallback);
	}

	initStatusBoard() {
		var timer = new Timer();
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
	}

	updateCellAsync(row: number, col: number) {
		var timeout = getRandomInt(timeouts.min, timeouts.max);

		setTimeout(() => {
			this.statusBoard[row][col] = Status.createStatus();
			this.statusUpdates += 1;
		}, timeout);
	}

	updateBoard() {
		var row = getRandomInt(0, dimensions.rows);
		var col = getRandomInt(0, dimensions.cols);

		this.statusBoard[row][col] = Status.createStatus();

		this.statusUpdates += 1;

		if (this.statusUpdates < this._maxStatusUpdates) {
			requestAnimationFrame(this.updateBoardCallback);
		}
	}
}

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

class Status {
	static defaultStatus = <IStatus>{ val: 0, class: '' };

	static createStatus(): IStatus {
		var status: any = {
			val: getRandomInt(0, statuses.length)
		};

		status.class = statuses[status.val];

		return status;
	}
}