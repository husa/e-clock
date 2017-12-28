class Analytics {
  getGA () {
    /* eslint no-empty-function: 0 */
    if (window.ga) return window.ga;
    return () => {};
  }

  trackPage (page = 'index') {
    const ga = this.getGA();
    ga('set', {
      page: `/${page}`,
      title: page
    });
    ga('send', 'pageview');
  }

  trackEvent ({category, action}) {
    const ga = this.getGA();
    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action
    });
  }

  saveSettings (settings) {
    const settingsJSON = JSON.stringify(settings);
    const prev = localStorage.getItem('settings_analytics');
    if (prev === settingsJSON) return;
    fetch('https://e-clock.firebaseio.com/settings.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: settingsJSON
    })
      .then(res => res.json())
      .then(data => {
        if (!data || data.error) return;
        localStorage.setItem('settings_analytics', settingsJSON);
      });
  }
}

const analytics = new Analytics;

export default analytics;
