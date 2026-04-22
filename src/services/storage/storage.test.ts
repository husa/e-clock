import { AppState } from '../../store/createStore';
import storage from '.';

describe('Storage', () => {
  describe('load', () => {
    const originalGet = chrome.storage.sync.get;

    afterEach(() => {
      chrome.storage.sync.get = originalGet;
    });

    it('should return resolved promise with data from chrome.storage', () => {
      chrome.storage.sync.get = jest.fn().mockImplementation((key) =>
        Promise.resolve({
          [key]: {
            some: 'data',
          },
        }),
      );

      const resolveSpy = jest.fn();
      const rejectSpy = jest.fn();

      return storage
        .load()
        .then(resolveSpy, rejectSpy)
        .then(() => {
          expect(rejectSpy).not.toHaveBeenCalled();
          expect(resolveSpy).toHaveBeenCalledWith({
            some: 'data',
          });
        });
    });

    it('should return resolved promise with null if chrome.storage does not have data', () => {
      chrome.storage.sync.get = jest.fn().mockImplementation(() => Promise.resolve(null));
      const resolveSpy = jest.fn();
      const rejectSpy = jest.fn();
      return storage
        .load()
        .then(resolveSpy, rejectSpy)
        .then(() => {
          expect(rejectSpy).not.toHaveBeenCalled();
          expect(resolveSpy).toHaveBeenCalledWith(null);
        });
    });
  });

  describe('sync', () => {
    const originalSet = chrome.storage.sync.set;

    beforeEach(() => {
      chrome.storage.sync.set = jest.fn();
    });

    afterEach(() => {
      chrome.storage.sync.set = originalSet;
    });

    it('should pluck "settings" and "dock" from passed object, merge them, and set them to chrome.storage', () => {
      storage.sync({
        settings: { some: 'data' },
        dock: { another: 'info' },
      } as unknown as AppState);
      expect(chrome.storage.sync.set).toHaveBeenCalledWith({
        [storage.key]: {
          some: 'data',
          another: 'info',
        },
      });
    });

    it('should return if no data passed', () => {
      storage.sync();
      expect(chrome.storage.sync.set).not.toHaveBeenCalled();
    });

    it('should return if data does not contain settings and dock', () => {
      storage.sync({ some: 'data' } as unknown as AppState);
      expect(chrome.storage.sync.set).not.toHaveBeenCalledWith();
    });
  });
});
