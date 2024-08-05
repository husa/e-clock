class Cache {
  getItem(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const cached = localStorage.getItem(key);
      if (!cached) return reject();
      const value = JSON.parse(cached);
      if (!value) return reject();
      const { ts, ttl } = value;
      if (Date.now() - ts > ttl) {
        this.removeItem(key);
        return reject();
      }
      return resolve(value);
    });
  }

  setItem(key: string, value: any, { ttl }: { ttl: number } = { ttl: 0 }): Promise<void> {
    return new Promise(resolve => {
      localStorage.setItem(
        key,
        JSON.stringify({
          ...value,
          ts: Date.now(),
          ttl,
        }),
      );
      resolve();
    });
  }

  removeItem(key: string): Promise<void> {
    return new Promise(resolve => {
      localStorage.removeItem(key);
      resolve();
    });
  }
}

export default Cache;
