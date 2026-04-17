export const getCurrentRuntime = (): 'chrome' | 'firefox' => {
  // it's best to check using browser.runtime.getBrowserInfo(), smth like:
  // await browser.runtime.getBrowserInfo().then(info => info.name.toLowerCase() === 'firefox')
  // but, it's async
  // no time to update everything to async, yet
  return navigator.userAgent.toLowerCase().includes('firefox') ? 'firefox' : 'chrome';
};

export const currentRuntime = getCurrentRuntime();
