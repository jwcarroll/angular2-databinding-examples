import {TimeSpan} from './timespan';

export class Timer {
  private _startTime: Date;
  private _endTime: Date;

  start() {
    this._startTime = new Date();
  }

  stop() {
    this._endTime = new Date();
  }

  reset() {
    this._startTime = new Date();
    this._endTime = null;
  }

  elapsed() {
    if (!this._startTime) {
      return new TimeSpan();
    }

    var endTime = this._endTime || new Date();

    return TimeSpan.fromDateTime(this._startTime, endTime);
  }
}

