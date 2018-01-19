import {expect} from 'chai';
import sinon from 'sinon';

import storage from '../../../src/services/storage';

describe('Storage', () => {

  describe('load', () => {

    afterEach(() => {
      chrome.storage.sync.get.restore();
    });

    it('should return resolved promise with data from chrome.storage', () => {
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
        expect(resolveSpy.called).to.be.true;
        expect(rejectSpy.called).to.be.false;
        expect(resolveSpy.calledWith({
          some: 'data'
        })).to.be.true;
      });
    });

    it('should return resolved promise with null if chrome.storage does not have data', () => {
      sinon.stub(chrome.storage.sync, 'get').callsFake((key, callback) => {
        setTimeout(callback, 10, null);
      });
      const resolveSpy = sinon.spy();
      const rejectSpy = sinon.spy();
      return storage.load().then(
        resolveSpy,
        rejectSpy
      ).then(() => {
        expect(resolveSpy.called).to.be.true;
        expect(rejectSpy.called).to.be.false;
        expect(resolveSpy.calledWith(null)).to.be.true;
      });
    });
  });

  describe('sync', () => {

    beforeEach(() => {
      sinon.stub(chrome.storage.sync, 'set');
    });

    afterEach(() => {
      chrome.storage.sync.set.restore();
    });

    it('should pluck "settings" and "dock" from passed object, merge them, and set them to chrome.storage', () => {
      storage.sync({
        settings: {some: 'data'},
        dock: {another: 'info'}
      });
      expect(chrome.storage.sync.set.calledWith({
        [storage.key]: {
          some: 'data',
          another: 'info'
        }
      })).to.be.true;
    });

    it('should return if no data passed', () => {
      storage.sync();
      expect(chrome.storage.sync.set.called).to.be.false;
    });

    it('should return if data does not contain settings and dock', () => {
      storage.sync({some: 'data'});
      expect(chrome.storage.sync.set.called).to.be.false;
    });
  });
});
