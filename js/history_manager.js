export default class HistoryManager {
  constructor() {
    this._history = [];
  }

  addItem(item) {
    this._history.push(item);
  }

  export() {
    return this._history;
  }
}
