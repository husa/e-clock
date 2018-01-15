class Cache {
  getItem (key) {
    return new Promise((resolve, reject) => {
      const value = JSON.parse(localStorage.getItem(key));
      if (!value) return reject();
      const {ts, ttl} = value;
      if (Date.now() - ts > ttl) {
        this.removeItem(key);
        return reject();
      }
      return resolve(value);
    });
  }

  setItem (key, value, {ttl = 0} = {}) {
    return new Promise(resolve => {
      value.ts = Date.now();
      value.ttl = ttl;
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    });
  }

  removeItem (key) {
    return new Promise(resolve => {
      localStorage.removeItem(key);
      resolve();
    });
  }
}

const cache = new Cache;

export default cache;
