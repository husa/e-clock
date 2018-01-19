import sinon from 'sinon';

import storage from '../../../src/services/storage';

describe('Storage', () => {

  describe('load', () => {

    afterEach(() => {
      chrome.storage.sync.get.restore();
    });

    test('should return resolved promise with data from chrome.storage', () => {
      sinon.stub(chrome.storage.sync, 'get').callsFake((key, callback) => {
        setTimeout(callback, 10, {[key]: {
          some: 'data'
        }});
      });

      const resolveSpy = sinon.spy();
      const rejectSpy = sinon.spy();
      return storage.load().then(
        resolveSpy,
        rejectSpy
      ).then(() => {
        expect(resolveSpy.called).toBe(true);
        expect(rejectSpy.called).toBe(false);
        expect(resolveSpy.calledWith({
          some: 'data'
        })).toBe(true);
      });
    });

    test(
      'should return resolved promise with null if chrome.storage does not have data',
      () => {
        sinon.stub(chrome.storage.sync, 'get').callsFake((key, callback) => {
          setTimeout(callback, 10, null);
        });
        const resolveSpy = sinon.spy();
        const rejectSpy = sinon.spy();
        return storage.load().then(
          resolveSpy,
          rejectSpy
        ).then(() => {
          expect(resolveSpy.called).toBe(true);
          expect(rejectSpy.called).toBe(false);
          expect(resolveSpy.calledWith(null)).toBe(true);
        });
      }
    );
  });

  describe('sync', () => {

    beforeEach(() => {
      sinon.stub(chrome.storage.sync, 'set');
    });

    afterEach(() => {
      chrome.storage.sync.set.restore();
    });

    test(
      'should pluck "settings" and "dock" from passed object, merge them, and set them to chrome.storage',
      () => {
        storage.sync({
          settings: {some: 'data'},
          dock: {another: 'info'}
        });
        expect(chrome.storage.sync.set.calledWith({
          [storage.key]: {
            some: 'data',
            another: 'info'
          }
        })).toBe(true);
      }
    );

    test('should return if no data passed', () => {
      storage.sync();
      expect(chrome.storage.sync.set.called).toBe(false);
    });

    test('should return if data does not contain settings and dock', () => {
      storage.sync({some: 'data'});
      expect(chrome.storage.sync.set.called).toBe(false);
    });
  });
});
