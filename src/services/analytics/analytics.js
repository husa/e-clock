class Analytics {
  getGA() {
    /* eslint no-empty-function: 0 */
    if (window.ga) return window.ga;
    return () => {};
  }

  trackPage(page = 'index') {
    if (ENV === 'development') return;
    const ga = this.getGA();
    ga('set', {
      page: `/${page}`,
      title: page,
    });
    ga('send', 'pageview');
  }

  trackEvent(category, action, label) {
    if (ENV === 'development') {
      console.log(`[analytics] track event: ${category} ${action} ${label || ''}`);
      return;
    }
    const ga = this.getGA();
    let opts = {
      eventCategory: category,
      eventAction: action,
    };
    if (label) opts = { ...opts, eventLabel: label };
    ga('send', 'event', opts);
  }

  saveSettings(settings) {
    const settingsJSON = JSON.stringify(settings);
    const prev = localStorage.getItem('settings_analytics');
    if (prev === settingsJSON) return;
    fetch('https://e-clock.firebaseio.com/settings.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: settingsJSON,
    })
      .then(res => res.json())
      .then(data => {
        if (!data || data.error) return;
        localStorage.setItem('settings_analytics', settingsJSON);
      });
  }
}

export default Analytics;
