export class TimeSpan {
  private _totalMilliseconds: number = 0;

  constructor(milliseconds: number = 0) {
    this._totalMilliseconds = milliseconds;
  }

  totalSeconds() {
    return this._totalMilliseconds / 1000;
  }

  totalMilliseconds() {
    return this._totalMilliseconds;
  }

  static fromDateTime(dateBegin: Date, dateEnd: Date) {
    if (!(dateBegin instanceof Date) && !(dateEnd instanceof Date)) {
      throw new Error("A begin and end date must be supplied and both must be of type Date");
    }

    return new TimeSpan(dateEnd.getTime() - dateBegin.getTime());
  }
}