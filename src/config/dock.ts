import { I18nMessageKey } from '../services/lang/providers/interface';

export type DockURL =
  | 'chrome://flags'
  | 'chrome://inspect'
  | 'chrome://history'
  | 'chrome://bookmarks'
  | 'chrome://downloads'
  | 'chrome://extensions'
  | 'chrome://apps'
  | 'https://chrome.google.com/webstore';

export type DockItem = {
  url: DockURL | 'settings';
  icon: string;
  iconViewbox: string;
  text: I18nMessageKey;
  className: string;
};

const dock: DockItem[] = [
  {
    url: 'settings',
    icon: 'settings',
    iconViewbox: '0 -960 960 960',
    text: 'i18nSettings',
    className: 'settings',
  },
  {
    url: 'chrome://flags',
    icon: 'flag',
    iconViewbox: '0 -960 960 960',
    text: 'i18nFlags',
    className: 'chrome-flags',
  },
  {
    url: 'chrome://inspect',
    icon: 'inspect',
    iconViewbox: '0 -960 960 960',
    text: 'i18nInspect',
    className: 'chrome-inspect',
  },
  {
    url: 'chrome://history',
    icon: 'history',
    iconViewbox: '0 -960 960 960',
    text: 'i18nHistory',
    className: 'chrome-history',
  },
  {
    url: 'chrome://bookmarks',
    icon: 'bookmark',
    iconViewbox: '0 -960 960 960',
    text: 'i18nBookmarks',
    className: 'chrome-bookmarks',
  },
  {
    url: 'chrome://downloads',
    icon: 'download',
    iconViewbox: '0 -960 960 960',
    text: 'i18nDownloads',
    className: 'chrome-downloads',
  },
  {
    url: 'chrome://extensions',
    icon: 'extensions',
    iconViewbox: '0 -960 960 960',
    text: 'i18nExtensions',
    className: 'chrome-extensions',
  },
  {
    url: 'chrome://apps',
    icon: 'apps',
    iconViewbox: '0 -960 960 960',
    text: 'i18nApplications',
    className: 'chrome-apps',
  },
  {
    url: 'https://chrome.google.com/webstore',
    icon: 'store',
    iconViewbox: '0 -960 960 960',
    text: 'i18nChromeWebStore',
    className: 'chrome-store',
  },
];

export default dock;
