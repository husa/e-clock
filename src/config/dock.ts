import { I18nMessageKey } from '../services/lang/providers/interface';
import { currentRuntime } from '../utils/currentRuntime';

type ChromeURL =
  | 'chrome://flags'
  | 'chrome://inspect'
  | 'chrome://history'
  | 'chrome://bookmarks'
  | 'chrome://downloads'
  | 'chrome://extensions'
  | 'chrome://apps'
  | 'https://chrome.google.com/webstore';

type FirefoxURL =
  | 'about:preferences'
  | 'about:addons'
  | 'about:debugging'
  | 'about:downloads'
  | 'about:config'
  | 'https://addons.mozilla.org';

type URLCategory =
  | 'store'
  | 'apps'
  | 'extensions'
  | 'downloads'
  | 'bookmarks'
  | 'history'
  | 'inspect'
  | 'flags';

const URLS: { [key in URLCategory]: { chrome: ChromeURL; firefox?: FirefoxURL } } = {
  store: {
    chrome: 'https://chrome.google.com/webstore',
    firefox: 'https://addons.mozilla.org',
  },
  apps: {
    chrome: 'chrome://apps',
  },
  extensions: {
    chrome: 'chrome://extensions',
    //firefox: 'about:addons',
  },
  downloads: {
    chrome: 'chrome://downloads',
    //firefox: 'about:downloads',
  },
  bookmarks: {
    chrome: 'chrome://bookmarks',
  },
  history: {
    chrome: 'chrome://history',
  },
  inspect: {
    chrome: 'chrome://inspect',
    //firefox: 'about:debugging',
  },
  flags: {
    chrome: 'chrome://flags',
    //firefox: 'about:config',
  },
};

const getURL = (category: URLCategory): DockURL => {
  return URLS[category][currentRuntime];
};

const isEnabled = (category: URLCategory): boolean => {
  return !!URLS[category][currentRuntime];
};

export type DockURL = ChromeURL | FirefoxURL;

export type DockItem = {
  url: DockURL | 'settings';
  icon: string;
  iconViewbox: string;
  text: I18nMessageKey;
  className: string;
  enabled?: boolean;
};

const dock: DockItem[] = [
  {
    url: 'settings',
    icon: 'settings',
    iconViewbox: '0 -960 960 960',
    text: 'i18nSettings',
    className: 'settings',
    enabled: true,
  },
  {
    url: getURL('flags'),
    icon: 'flag',
    iconViewbox: '0 -960 960 960',
    text: 'i18nFlags',
    className: 'chrome-flags',
    enabled: isEnabled('flags'),
  },
  {
    url: getURL('inspect'),
    icon: 'inspect',
    iconViewbox: '0 -960 960 960',
    text: 'i18nInspect',
    className: 'chrome-inspect',
    enabled: isEnabled('inspect'),
  },
  {
    url: getURL('history'),
    icon: 'history',
    iconViewbox: '0 -960 960 960',
    text: 'i18nHistory',
    className: 'chrome-history',
    enabled: isEnabled('history'),
  },
  {
    url: getURL('bookmarks'),
    icon: 'bookmark',
    iconViewbox: '0 -960 960 960',
    text: 'i18nBookmarks',
    className: 'chrome-bookmarks',
    enabled: isEnabled('bookmarks'),
  },
  {
    url: getURL('downloads'),
    icon: 'download',
    iconViewbox: '0 -960 960 960',
    text: 'i18nDownloads',
    className: 'chrome-downloads',
    enabled: isEnabled('downloads'),
  },
  {
    url: getURL('extensions'),
    icon: 'extensions',
    iconViewbox: '0 -960 960 960',
    text: 'i18nExtensions',
    className: 'chrome-extensions',
    enabled: isEnabled('extensions'),
  },
  {
    url: getURL('apps'),
    icon: 'apps',
    iconViewbox: '0 -960 960 960',
    text: 'i18nApplications',
    className: 'chrome-apps',
    enabled: isEnabled('apps'),
  },
  {
    url: getURL('store'),
    icon: 'store',
    iconViewbox: '0 -960 960 960',
    text: currentRuntime === 'firefox' ? 'i18nMozillaAddons' : 'i18nChromeWebStore',
    className: 'chrome-store',
    enabled: isEnabled('store'),
  },
];

export default dock;
