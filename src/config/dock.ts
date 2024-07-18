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
  text: string;
  className: string;
};

const dock: DockItem[] = [
  {
    url: 'settings',
    icon: 'settings',
    iconViewbox: '0 -960 960 960',
    text: 'Settings',
    className: 'settings',
  },
  {
    url: 'chrome://flags',
    icon: 'flag',
    iconViewbox: '0 -960 960 960',
    text: 'Flags',
    className: 'chrome-flags',
  },
  {
    url: 'chrome://inspect',
    icon: 'inspect',
    iconViewbox: '0 -960 960 960',
    text: 'Inspect',
    className: 'chrome-inspect',
  },
  {
    url: 'chrome://history',
    icon: 'history',
    iconViewbox: '0 -960 960 960',
    text: 'History',
    className: 'chrome-history',
  },
  {
    url: 'chrome://bookmarks',
    icon: 'bookmark',
    iconViewbox: '0 -960 960 960',
    text: 'Bookmarks',
    className: 'chrome-bookmarks',
  },
  {
    url: 'chrome://downloads',
    icon: 'download',
    iconViewbox: '0 -960 960 960',
    text: 'Downloads',
    className: 'chrome-downloads',
  },
  {
    url: 'chrome://extensions',
    icon: 'extensions',
    iconViewbox: '0 -960 960 960',
    text: 'Extensions',
    className: 'chrome-extensions',
  },
  {
    url: 'chrome://apps',
    icon: 'apps',
    iconViewbox: '0 -960 960 960',
    text: 'Applications',
    className: 'chrome-apps',
  },
  {
    url: 'https://chrome.google.com/webstore',
    icon: 'store',
    iconViewbox: '0 -960 960 960',
    text: 'ChromeWebStore',
    className: 'chrome-store',
  },
];

export default dock;
