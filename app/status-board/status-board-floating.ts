/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

var dimensions = {
	rows: 30,
	cols: 10
};

interface IMinMax {
	min: number;
	max: number;
}

interface IBounds {
	x: IMinMax;
	y: IMinMax;
}

interface IPositionConfig {
	velocity: IBounds;
	bounds: IBounds;
}

var requestAnimationFrame = window.requestAnimationFrame || window['mozRequestAnimationFrame'] ||
    window['webkitRequestAnimationFrame'] || window.msRequestAnimationFrame;

@Component({
	selector: 'status-board'
})
@View({
	templateUrl: 'app/status-board/status-board-floating.html',
	directives: [NgFor, NgIf]
})
export class StatusBoardFloating {
	statusBoard: Position[][] = [];

	private _lastStep: number = 0;

	private _config: IPositionConfig = {
		velocity: {
			x: { min: 0, max: 100 },
			y: { min: 0, max: 100 }
		},
		bounds: {
			x: { min: 100, max: 900 },
			y: { min: 100, max: 700 }
		}
	};

	constructor() {
		this.initStatusBoard();

		requestAnimationFrame(this.updateBoard.bind(this));
	}

	initStatusBoard() {
		for (var row = 0; row < dimensions.rows; row++) {
			for (var col = 0; col < dimensions.cols; col++) {
				if (!this.statusBoard[row]) {
					this.statusBoard[row] = [];
				}

				this.statusBoard[row][col] = Position.create(this._config);
			}
		}
	}

	updateBoard(elapsedMilliseconds) {
		var elapsedSeconds = new TimeSpan(elapsedMilliseconds - this._lastStep).totalSeconds;
		this._lastStep = elapsedMilliseconds;

		for (var row = 0; row < dimensions.rows; row++) {
			for (var col = 0; col < dimensions.cols; col++) {
				this.statusBoard[row][col].move(elapsedSeconds, this._config.bounds);
			}
		}

		requestAnimationFrame(this.updateBoard.bind(this));
	}
}

class Position {
	top:string;
	left:string;
	
	constructor(
		public x: number,
		public y: number,
		private velocityX: number,
		private velocityY: number) { }

	move(timeDelta: number, bounds?:IBounds) {
		this.x += (this.velocityX * timeDelta);
		this.y += (this.velocityY * timeDelta);
		
		this.top = `${this.y}px`;
		this.left = `${this.x}px`;
		
		if(!bounds) return;
		
		if(this.x > bounds.x.max || this.x < bounds.x.min){
			this.x = this.x > bounds.x.max ? bounds.x.max : bounds.x.min; 
			this.velocityX *= -1;
		}
		if(this.y > bounds.y.max || this.y < bounds.y.min){
			this.y = this.y > bounds.y.max ? bounds.y.max : bounds.y.min;
			this.velocityY *= -1;
		}
	}
	
	static create(config:IPositionConfig){
		return new Position(
			getRandomInt(config.bounds.x.min, config.bounds.x.max),
			getRandomInt(config.bounds.y.min, config.bounds.y.max),
			getRandomInt(config.velocity.x.min, config.velocity.x.max),
			getRandomInt(config.velocity.y.min, config.velocity.y.max)
		);
	}
}

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

class TimeSpan {
	constructor(private _totalMilliseconds: number = 0) { }

	get totalSeconds() {
		return this._totalMilliseconds / 1000;
	}

	get totalMilliseconds() {
		return this._totalMilliseconds;
	}
}