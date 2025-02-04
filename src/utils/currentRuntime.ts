export const getCurrentRuntime = (): 'chrome' | 'firefox' => {
  // probably there's a better way to detect the runtime
  if (typeof browser !== 'undefined' && browser?.storage?.sync?.get) return 'firefox';
  return 'chrome';
};

export const currentRuntime = getCurrentRuntime();
