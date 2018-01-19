class LocalStorageMock {

  constructor () {
    this.store = {};
  }

  clear () {
    this.store = {};
  }

  getItem (key) {
    return this.store[key];
  }

  setItem (key, value) {
    this.store[key] = value ? value.toString() : null;
  }

  removeItem (key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
