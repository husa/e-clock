class ChromeSyncStorage {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  load() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(this.key, data => {
        if (!data || !Object.keys(data).length || !data[this.key]) {
          reject();
        } else {
          data = data[this.key];
          resolve(data);
        }
      });
    }).then(
      data => data,
      () => null,
    );
  }

  sync(data) {
    if (!data) return;
    const { settings, dock } = data;
    if (!settings && !dock) return;

    chrome.storage.sync.set({
      [this.key]: { ...settings, ...dock },
    });
  }
}

export default ChromeSyncStorage;
