class Cache {
  getItem (key) {
    return new Promise(resolve => {
      const value = localStorage.getItem(key);
      resolve(JSON.parse(value));
    });
  }

  setItem (key, value) {
    return new Promise(resolve => {
      value.ts = (new Date).toUTCString();
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    });
  }
}

const cache = new Cache;

export default cache;
