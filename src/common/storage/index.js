const STORAGE_KEY = 'settings_data';

class Storage {

  constructor () {
    this.key = STORAGE_KEY;
  }

  load () {
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
      () => null
    );
  }

  sync (data) {
    if (!data) return;
    const {settings, dock} = data;
    if (!settings && !dock) return;

    chrome.storage.sync.set({
      [this.key]: Object.assign({}, settings, dock)
    });
  }

}

const storage = new Storage;

export default storage;
