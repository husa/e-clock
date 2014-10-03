(function() {
  var $, App, AppearanceView, Clock, Dock, DockIcon, I18n, SettingsStorage, SettingsView, app, date, isEmpty,
    __slice = [].slice;

  App = (function() {
    function App() {
      this.main();
    }

    App.prototype.main = function() {
      this.settingsStorage = new SettingsStorage();
      return document.addEventListener('DOMContentLoaded', this.ready.bind(this));
    };

    App.prototype.ready = function() {
      return this.settingsStorage.loaded.then(function() {
        return app.init();
      }, function() {
        app.init();
        return app.generateDefaultSettings();
      });
    };

    App.prototype.generateDefaultSettings = function() {};

    App.prototype.init = function() {
      this.i18n = new I18n();
      this.clock = new Clock();
      this.dock = new Dock();
      this.settingsView = new SettingsView();
      this.appearanceView = new AppearanceView();
      this.updateViews();
      return this.showViews();
    };

    App.prototype.updateViews = function() {
      var data;
      data = this.settingsStorage.data;
      this.clock.updateFormat(data.use24format);
      this.clock.updateDelimeter(data.delimeterBlinking);
      this.dock.update(data);
      this.appearanceView.update(data);
      return this.settingsView.update(data);
    };

    App.prototype.showViews = function() {
      this.clock.show();
      return this.dock.show();
    };

    return App;

  })();

  AppearanceView = (function() {
    function AppearanceView() {
      this.$body = document.body;
      this.color = '';
      this.bgColor = '';
      this.bgGradient = '';
    }

    AppearanceView.prototype.update = function(data) {
      this.updateColor(data.color);
      this.updateBackgroundColor(data.backgroundColor, data.backgroundPriority);
      return this.updateBackgroundGradient(data.backgroundGradient, data.backgroundGradientAngle, data.backgroundPriority);
    };

    AppearanceView.prototype.updateColor = function(color) {
      if (!color || color === this.color) {
        return;
      }
      return this.color = this.$body.style.color = this.$body.style.fill = color;
    };

    AppearanceView.prototype.updateBackgroundColor = function(color, priority) {
      if (!color || priority !== 'color') {
        return;
      }
      return this.bgColor = this.$body.style.background = color;
    };

    AppearanceView.prototype.updateBackgroundGradient = function(colors, angle, priority) {
      if (angle == null) {
        angle = '90deg';
      }
      if (!colors || priority !== 'gradient') {
        return;
      }
      this.bgGradient = colors;
      colors = colors.split(',');
      return this.$body.style.background = "linear-gradient(" + angle + ", " + colors[0] + " 10%, " + colors[1] + " 90%)";
    };

    return AppearanceView;

  })();

  Clock = (function() {
    function Clock() {
      this.$container = $('.container');
      this.$clock = this.$container.find('.clock');
      this.$hours = this.$clock.find('.hours');
      this.$minutes = this.$clock.find('.minutes');
      this.$delimeter = this.$clock.find('.delimeter');
      this.$ampm = this.$clock.find('.ampm');
      this.use24 = true;
      this.updateTime();
      this.interval = window.setInterval(this.updateTime.bind(this), 1000);
    }

    Clock.prototype.show = function() {
      return this.$clock.removeClass('initiallyHidden');
    };

    Clock.prototype.updateTime = function(force) {
      if (!(date.timeHasChanged() || force)) {
        return;
      }
      this.$hours.html(date.getHours(this.use24));
      this.$minutes.html(date.getMinutes());
      this.$ampm.html(!this.use24 ? date.getAmPm() : '');
      return date.updateChangedTime();
    };

    Clock.prototype.updateFormat = function(use24) {
      if (use24 == null) {
        use24 = true;
      }
      this.use24 = use24;
      return this.updateTime(true);
    };

    Clock.prototype.updateDelimeter = function(enabled) {
      if (enabled == null) {
        enabled = true;
      }
      return this.$delimeter.toggleClass('blinking', enabled);
    };

    return Clock;

  })();

  Dock = (function() {
    function Dock() {
      var $icon;
      this.$dock = $('.dock');
      this.$icons = this.$dock.find('.dockicon');
      this.iconViews = (function() {
        var _i, _len, _ref, _results;
        _ref = this.$icons.get();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $icon = _ref[_i];
          _results.push(new DockIcon($icon, this));
        }
        return _results;
      }).call(this);
    }

    Dock.prototype.getSettings = function() {
      var iconView, _i, _len, _ref;
      if (!this.$settingsContainer) {
        this.$settingsContainer = $(document.createElement('div'));
        _ref = this.iconViews.reverse();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          iconView = _ref[_i];
          if (!iconView.isSettingsIcon) {
            this.$settingsContainer.append(iconView.generateSetting());
          }
        }
      }
      return this.$settingsContainer;
    };

    Dock.prototype.update = function(data) {
      var iconView, _i, _len, _ref, _results;
      _ref = this.iconViews;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        iconView = _ref[_i];
        _results.push(iconView.update(data[iconView.url]));
      }
      return _results;
    };

    Dock.prototype.toggleAutoHide = function(turnOn) {
      return this.$dock.toggleClass("auto-hide", turnOn);
    };

    Dock.prototype.show = function() {
      return this.$dock.removeClass('initiallyHidden');
    };

    return Dock;

  })();

  DockIcon = (function() {
    function DockIcon($el, parent) {
      if (!$el) {
        throw Error('specify $el');
      }
      this.$el = $($el);
      this.parent = parent;
      this.url = this.$el.data('url');
      this.isSettingsIcon = /^settings$/.test(this.url);
      this.handleClick();
    }

    DockIcon.prototype.handleClick = function() {
      var self;
      self = this;
      return this.$el.on('click', function(e) {
        var url;
        url = this.dataset.url;
        if (!url) {
          return;
        }
        if (self.isSettingsIcon) {
          return app.settingsView.toggle();
        } else {
          if (e.metaKey || e.ctrlKey || e.button === 1) {
            return chrome.tabs.create({
              url: url,
              active: true
            });
          } else {
            return chrome.tabs.update({
              url: url
            });
          }
        }
      });
    };

    DockIcon.prototype.generateSetting = function() {
      var checked, svgIcon, title;
      svgIcon = this.$el.html();
      title = this.$el.data('alt');
      if (!this.$settingIcon) {
        this.$settingIcon = $(document.createElement('div'));
        this.$settingIcon.addClass('settings-dock-icon', 'settings-item');
        checked = this.$el.hasClass('hidden') ? '' : 'checked';
        this.$settingIcon.html("<input type=\"checkbox\" " + checked + "/>" + svgIcon + "<span>" + title + "</span>");
        this.$settingIcon.addClass(checked ? 'enabled' : 'disabled');
        this.handleSettings();
      }
      return this.$settingIcon;
    };

    DockIcon.prototype.handleSettings = function() {
      if (!this.$settingIcon) {
        throw Error('setting weren\'t generated yet');
      }
      return this.$settingIcon.on('mousedown', (function(_this) {
        return function() {
          var checked;
          checked = !_this.$settingIcon.find('input').get(0).checked;
          return app.settingsStorage.update(_this.url, {
            visible: checked,
            order: null
          });
        };
      })(this));
    };

    DockIcon.prototype.show = function() {
      this.$el.removeClass('hidden');
      if (this.$settingIcon) {
        return this.$settingIcon.removeClass('disabled').addClass('enabled').find('input').get(0).checked = true;
      }
    };

    DockIcon.prototype.hide = function() {
      this.$el.addClass('hidden');
      if (this.$settingIcon) {
        return this.$settingIcon.removeClass('enabled').addClass('disabled').find('input').get(0).checked = false;
      }
    };

    DockIcon.prototype.update = function(data) {
      if (data && !data.visible) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    return DockIcon;

  })();

  I18n = (function() {
    function I18n() {
      var el, i18nString, i18nStringKey, _i, _len, _ref;
      _ref = document.querySelectorAll('[data-i18n]');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        i18nStringKey = el.dataset.i18n;
        i18nString = chrome.i18n.getMessage(i18nStringKey);
        if (el.classList.contains('dockicon')) {
          el.dataset.alt = i18nString;
        } else {
          el.innerText = i18nString || i18nStringKey;
        }
      }
    }

    return I18n;

  })();

  SettingsStorage = (function() {
    function SettingsStorage() {
      var self;
      self = this;
      this.key = "settings_data";
      this.data = {};
      this.loaded = new Promise(function(resolve, reject) {
        return chrome.storage.sync.get(self.key, function(data) {
          if (!data || isEmpty(data) || !data[self.key]) {
            return reject();
          } else {
            self.data = data[self.key];
            return resolve();
          }
        });
      });
    }

    SettingsStorage.prototype.sync = function() {
      var storeData;
      storeData = {};
      storeData[this.key] = this.data;
      return chrome.storage.sync.set(storeData);
    };

    SettingsStorage.prototype.update = function(key, value, silent) {
      this.data[key] = value;
      this.sync();
      if (!silent) {
        return app.updateViews();
      }
    };

    return SettingsStorage;

  })();

  SettingsView = (function() {
    function SettingsView() {
      this.$el = $('.settings-popup');
      this.$tabs = this.$el.find('.settings-tabs');
      this.$tabLinks = this.$tabs.find('.settings-tab');
      this.$tabsContents = this.$el.find('.settings-tab-content');
      this.$dockSettings = this.$el.find('.settings-dock');
      this.$colors = this.$el.find('.settings-color-item');
      this.$bgColors = this.$el.find('.settings-background-color-item');
      this.$bgGradients = this.$el.find('.settings-background-gradient-item');
      this.$bgGradientAngles = this.$el.find('.settings-background-gradient-angle-item');
      this.$timeFormat = this.$el.find('.settings-time-format');
      this.$delimeterBlinking = this.$el.find('.settings-delimeter-blinking');
      this.$autoHideDock = this.$el.find('.settings-autohide-dock');
      this.key = 'settings_data';
      this.handle();
      this.initAbout();
      this.$dockSettings.append(app.dock.getSettings());
    }

    SettingsView.prototype.handle = function() {
      this.handleTabs();
      this.handleClose();
      this.handleTimeFormat();
      this.handleDelimeterBlinking();
      this.handleAutoHideDock();
      this.handleColor();
      this.handleBackgroundColor();
      this.handleBackgroundGradient();
      return this.handleBackgroundGradientAngle();
    };

    SettingsView.prototype.update = function(data) {
      this.updateTimeFormat(data.use24format);
      this.updateDelimeterBlinking(data.delimeterBlinking);
      this.updateAutoHideDock(data.autoHideDock);
      this.updateColor(data.color);
      this.updateBackgroundColor(data.backgroundColor);
      this.updateBackgroundGradient(data.backgroundGradient);
      return this.updateBackgroundGradientAngle(data.backgroundGradientAngle);
    };

    SettingsView.prototype.open = function() {
      return this.$el.removeClass('hidden');
    };

    SettingsView.prototype.close = function() {
      return this.$el.addClass('hidden');
    };

    SettingsView.prototype.toggle = function() {
      return this.$el.toggleClass('hidden');
    };

    SettingsView.prototype.handleTabs = function() {
      return this.$tabLinks.on('click', (function(_this) {
        return function(e) {
          var selector, target;
          target = $(e.target);
          selector = target.data('target');
          _this.$tabsContents.addClass('hidden').removeClass('active');
          _this.$el.find(selector).removeClass('hidden');
          _this.$tabLinks.removeClass('active');
          return target.addClass('active');
        };
      })(this));
    };

    SettingsView.prototype.handleClose = function() {
      return this.$el.find('.settings-close-icon').on('click', (function(_this) {
        return function() {
          return _this.close();
        };
      })(this));
    };

    SettingsView.prototype.updateTimeFormat = function(use24format) {
      if (use24format == null) {
        use24format = true;
      }
      return this.$timeFormat.removeClass('enabled', 'disabled').addClass(use24format ? 'enabled' : 'disabled').find('input').get(0).checked = use24format;
    };

    SettingsView.prototype.updateDelimeterBlinking = function(delimeterBlinking) {
      if (delimeterBlinking == null) {
        delimeterBlinking = true;
      }
      return this.$delimeterBlinking.removeClass('enabled', 'disabled').addClass(delimeterBlinking ? 'enabled' : 'disabled').find('input').get(0).checked = delimeterBlinking;
    };

    SettingsView.prototype.updateAutoHideDock = function(autoHideDock) {
      if (autoHideDock == null) {
        autoHideDock = false;
      }
      this.$autoHideDock.removeClass('enabled', 'disabled').addClass(autoHideDock ? 'enabled' : 'disabled').find('input').get(0).checked = autoHideDock;
      return app.dock.toggleAutoHide(autoHideDock);
    };

    SettingsView.prototype.updateColor = function(color) {
      return this.updateAppearanceColor(this.$colors, color, '#555555');
    };

    SettingsView.prototype.updateBackgroundColor = function(color) {
      return this.updateAppearanceColor(this.$bgColors, color, '#fefefe');
    };

    SettingsView.prototype.updateAppearanceColor = function(nodes, color, defaultColor) {
      var el, _i, _len, _ref;
      if (color == null) {
        color = defaultColor;
      }
      _ref = nodes.get();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.classList.remove('active');
        if (el.dataset.color === color) {
          el.classList.add('active');
        }
      }
      return this;
    };

    SettingsView.prototype.updateBackgroundGradient = function(gradient) {
      var el, _i, _len, _ref;
      _ref = this.$bgGradients.get();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.classList.remove('active');
        if (el.dataset.gradient === gradient) {
          el.classList.add('active');
        }
      }
      return this;
    };

    SettingsView.prototype.updateBackgroundGradientAngle = function(angle) {
      var el, _i, _len, _ref;
      if (angle == null) {
        angle = '90deg';
      }
      _ref = this.$bgGradientAngles.get();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.classList.remove('active');
        if (el.dataset.angle === angle) {
          el.classList.add('active');
        }
      }
      return this;
    };

    SettingsView.prototype.handleTimeFormat = function() {
      return this.$timeFormat.on('mousedown', (function(_this) {
        return function() {
          var checked;
          checked = !_this.$timeFormat.find('input').get(0).checked;
          return app.settingsStorage.update('use24format', checked);
        };
      })(this));
    };

    SettingsView.prototype.handleDelimeterBlinking = function() {
      return this.$delimeterBlinking.on('mousedown', (function(_this) {
        return function() {
          var checked;
          checked = !_this.$delimeterBlinking.find('input').get(0).checked;
          return app.settingsStorage.update('delimeterBlinking', checked);
        };
      })(this));
    };

    SettingsView.prototype.handleAutoHideDock = function() {
      return this.$autoHideDock.on('mousedown', (function(_this) {
        return function() {
          var checked;
          checked = !_this.$autoHideDock.find('input').get(0).checked;
          return app.settingsStorage.update('autoHideDock', checked);
        };
      })(this));
    };

    SettingsView.prototype.handleColor = function() {
      return this.$colors.on('click', function() {
        var color;
        color = this.dataset.color;
        return app.settingsStorage.update('color', color);
      });
    };

    SettingsView.prototype.handleBackgroundColor = function() {
      return this.$bgColors.on('click', function() {
        var color;
        color = this.dataset.color;
        app.settingsStorage.update('backgroundPriority', 'color', true);
        return app.settingsStorage.update('backgroundColor', color);
      });
    };

    SettingsView.prototype.handleBackgroundGradient = function() {
      return this.$bgGradients.on('click', function() {
        var gradient;
        gradient = this.dataset.gradient;
        app.settingsStorage.update('backgroundPriority', 'gradient', true);
        return app.settingsStorage.update('backgroundGradient', gradient);
      });
    };

    SettingsView.prototype.handleBackgroundGradientAngle = function() {
      return this.$bgGradientAngles.on('click', function() {
        var angle;
        angle = this.dataset.angle;
        return app.settingsStorage.update('backgroundGradientAngle', angle);
      });
    };

    SettingsView.prototype.initAbout = function() {
      var manifest;
      manifest = chrome.runtime.getManifest();
      this.$el.find('.settings-about-name').html(manifest.name);
      this.$el.find('.settings-about-version').html("v" + manifest.version);
      return this.$el.find('.settings-about-rate').get(0).href = "https://chrome.google.com/webstore/detail/" + chrome.runtime.id;
    };

    return SettingsView;

  })();

  date = {
    prev: {
      hours: -1,
      minutes: -1
    },
    getDate: function() {
      return new Date();
    },
    getHours: function(use24) {
      var hours;
      hours = this.getDate().getHours();
      if (use24 || !(Math.floor(hours / 13))) {
        return hours;
      } else {
        return hours - 12;
      }
    },
    getMinutes: function() {
      var minutes;
      minutes = this.getDate().getMinutes();
      return "" + (minutes < 10 ? 0 : '') + minutes;
    },
    timeHasChanged: function() {
      return +this.getMinutes() !== +this.prev.minutes || +this.getHours() !== +this.prev.hours;
    },
    updateChangedTime: function() {
      this.prev.minutes = this.getMinutes();
      return this.prev.hours = this.getHours();
    },
    getAmPm: function() {
      if (this.getHours(true) < 12) {
        return 'am';
      } else {
        return 'pm';
      }
    }
  };

  $ = (function() {
    function $(selector) {
      var els;
      if (!(this instanceof $)) {
        return new $(selector);
      }
      if (selector instanceof $) {
        return selector;
      }
      if (typeof selector === 'string') {
        els = document.querySelectorAll(selector);
        this.els = Array.prototype.slice.call(els);
      }
      if (selector instanceof HTMLElement) {
        this.els = [selector];
      }
      if (selector instanceof Array) {
        this.els = selector;
      }
      return this;
    }

    $.prototype.get = function(index) {
      if (index == null) {
        return this.els;
      }
      return this.els[index];
    };

    $.prototype.addClass = function() {
      var classNames, el, _i, _len, _ref;
      classNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref = this.els;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.classList.add.apply(el.classList, classNames);
      }
      return this;
    };

    $.prototype.removeClass = function() {
      var classNames, el, _i, _len, _ref;
      classNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref = this.els;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.classList.remove.apply(el.classList, classNames);
      }
      return this;
    };

    $.prototype.toggleClass = function(className, priority) {
      var el, _i, _len, _ref, _results;
      _ref = this.els;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push(el.classList.toggle(className, priority));
      }
      return _results;
    };

    $.prototype.hasClass = function(className) {
      return this.els.every(function(el) {
        return el.classList.contains(className);
      });
    };

    $.prototype.on = function(event, callback, phase) {
      var el, _i, _len, _ref;
      if (phase == null) {
        phase = false;
      }
      _ref = this.els;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.addEventListener(event, callback, phase);
      }
      return this;
    };

    $.prototype.off = function(event, callback, phase) {
      var el, _i, _len, _ref;
      if (phase == null) {
        phase = false;
      }
      _ref = this.els;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.addEventListener(event, callback, phase);
      }
      return this;
    };

    $.prototype.find = function(selector) {
      var el, found, _i, _len, _ref;
      found = [];
      _ref = this.els;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        found.push.apply(found, el.querySelectorAll(selector));
      }
      return $(found);
    };

    $.prototype.html = function(str) {
      var el, _i, _len, _ref;
      if (str == null) {
        return this.els[0].innerHTML;
      }
      _ref = this.els;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.innerHTML = str;
      }
      return this;
    };

    $.prototype.data = function(key) {
      if (key == null) {
        return this.els[0].dataset;
      }
      return this.els[0].dataset[key];
    };

    $.prototype.append = function(elem) {
      var el, _i, _len, _ref, _results;
      if (elem instanceof $) {
        elem = elem.get(0);
      }
      _ref = this.els;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push(el.appendChild(elem));
      }
      return _results;
    };

    return $;

  })();

  app = new App();

  isEmpty = function(o) {
    return !Object.keys(o).length;
  };

}).call(this);

//# sourceMappingURL=main.js.map
