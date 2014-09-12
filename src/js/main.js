var app = {};
(function() {
    'use strict';

    var date = {
        prev : {
            hours : -1,
            minutes : -1
        },
        getDate : function() {
            return new Date();
        },
        getHours : function(use24) {
            var hours = this.getDate().getHours();

            if (use24) {
                return hours;
            } else {
                return (hours / 13)|0 ? hours - 12 : hours;
            }

        },
        getMinutes : function() {
            var minutes = this.getDate().getMinutes();
            return  (minutes < 10 ? '0' : '') + minutes;
        },
        timeHasChanged : function() {
            return +this.getMinutes() !== +this.prev.minutes ||
                    +this.getHours() !== +this.prev.hours;
        },
        updateChangedTime : function() {
            this.prev.minutes = date.getMinutes();
            this.prev.hours   = date.getHours();
        },
        getAmPm : function() {
            return this.getHours(true) < 12 ? 'am' : 'pm';
        }
    };

    var Clock = function() {
        this.$container = document.querySelector('.container');
        this.$clock     = this.$container.querySelector('.clock');
        this.$hours     = this.$clock.querySelector('.hours');
        this.$minutes   = this.$clock.querySelector('.minutes');
        this.$delimeter = this.$clock.querySelector('.delimeter');
        this.$ampm      = this.$clock.querySelector('.ampm');
        this.use24      = true;

        this.updateTime();

        this.interval = window.setInterval(this.updateTime.bind(this), 1000);
    };

    Clock.prototype.show = function() {
        this.$clock.classList.remove('initiallyHidden');
    };

    Clock.prototype.updateTime = function(force) {
        if (date.timeHasChanged() || force) {
            this.$hours.innerHTML   = date.getHours(this.use24);
            this.$minutes.innerHTML = date.getMinutes();
            this.$ampm.innerHTML    = !this.use24 ? date.getAmPm() : '';
            date.updateChangedTime();
        }
    };

    Clock.prototype.updateFormat = function(use24) {
        this.use24 = typeof use24 !== 'undefined' ? use24 : true;

        this.updateTime(true);
    };

    Clock.prototype.updateDelimeter = function(enabled) {
        enabled = typeof enabled !== 'undefined' ? enabled : true;
        if (enabled) {
            this.$delimeter.classList.add('blinking');
        } else {
            this.$delimeter.classList.remove('blinking');
        }
    };


    var DockIcon = function($el, parent) {
        if (!$el) {
            throw Error('specify $el');
        }

        this.$el    = $el;
        this.parent = parent;
        this.url    = this.$el.dataset.url;

        if (/^settings$/.test(this.url)) {
            this.isSettingsIcon = true;
        }

        this.handleClick();
    };

    DockIcon.prototype.handleClick = function() {
        var root = this;

        this.$el.addEventListener('click', function() {
            var url = this.dataset.url;

            if (url) {
                if (root.isSettingsIcon) {
                    app.settingsView.toggle();
                } else {
                    chrome.tabs.update({
                        url : url
                    });
                }
            }
        });
    };

    DockIcon.prototype.generateSetting = function() {
        var svgIcon = this.$el.innerHTML,
            title   = this.$el.dataset.alt;

        if (this.$settingIcon === void 0) {
            this.$settingIcon = document.createElement('div');
            this.$settingIcon.classList.add('settings-dock-icon');

            var checked = this.$el.classList.contains('hidden') ? '' : 'checked';

            this.$settingIcon.innerHTML = '<input type="checkbox" ' + checked + '/>' + svgIcon + '<span>' + title + '</span>';
            this.$settingIcon.classList.add(checked ? 'enabled' : 'disabled');

            this.handleSettings();
        }

        return this.$settingIcon;
    };

    DockIcon.prototype.handleSettings = function() {
        var root = this;

        if (!this.$settingIcon) {
            throw Error('setting weren\'t generated yet');
        }

        this.$settingIcon.addEventListener('click', function() {
            var checked = !root.$settingIcon.querySelector('input').checked;

            if (checked) {
                root.parent.turnOn(root);
            } else {
                root.parent.turnOff(root);
            }
        });
    };

    DockIcon.prototype.hide = function() {
        this.$el.classList.add('hidden');
        if (this.$settingIcon) {
            this.$settingIcon.classList.remove('enabled');
            this.$settingIcon.classList.add('disabled');
            this.$settingIcon.querySelector('input').checked = false;
        }
    };

    DockIcon.prototype.show = function() {
        this.$el.classList.remove('hidden');
        if (this.$settingIcon) {
            this.$settingIcon.classList.remove('disabled');
            this.$settingIcon.classList.add('enabled');
            this.$settingIcon.querySelector('input').checked = true;
        }
    };

    DockIcon.prototype.update = function(data) {
        if (data && !data.visible) {
            this.hide();
        } else {
            this.show();
        }
    };

    var Dock = function() {
        this.$dock = document.querySelector('.dock');
        this.$icons = this.$dock.querySelectorAll('.dockicon');
        this.iconViews = [];

        Array.prototype.forEach.call(this.$icons, function($icon) {
            this.iconViews.push(new DockIcon($icon, this));
        }, this);
    };

    Dock.prototype.getSettings = function() {

        if (this.$settingsContainer === undefined) {
            this.$settingsContainer = document.createElement('div');

            this.iconViews.filter(function(dockIconView) {
                return !dockIconView.isSettingsIcon;
            }).reverse().forEach(function(dockIconView) {
                this.$settingsContainer.appendChild(dockIconView.generateSetting());
            }, this);
        }

        return this.$settingsContainer;
    };

    Dock.prototype.turnOn = function(dockIconView) {
        this.getDockView(dockIconView).show();

        app.settingsStorage.update(dockIconView.url, {
            visible : true,
            order : null
        });
    };

    Dock.prototype.turnOff = function(dockIconView) {
        this.getDockView(dockIconView).hide();

        app.settingsStorage.update(dockIconView.url, {
            visible : false,
            order : null
        });
    };

    Dock.prototype.getDockView = function(dockIconView) {
        var filtered = this.iconViews.filter(function(icon) {
            return icon === dockIconView;
        });
        return (filtered && filtered[0]) ? filtered[0] : null;
    };

    Dock.prototype.update = function(data) {
        this.iconViews.forEach(function(dockIconView) {
            var settings = data[dockIconView.url];

            dockIconView.update(settings);
        });
    };

    Dock.prototype.toggleAutoHide = function(turnOn) {
        if (turnOn) {
            this.$dock.classList.add('auto-hide');
        } else {
            this.$dock.classList.remove('auto-hide');
        }
    };

    Dock.prototype.show = function() {
        this.$dock.classList.remove('initiallyHidden');
    };


    var SettingsView = function () {
        var root = this;

        this.$el                 = document.querySelector('.settings-popup');
        this.$dockSettings       = root.$el.querySelector('.settings-dock');
        this.$appearanceSettings = root.$el.querySelector('.settings-appearance');
        this.$tabs               = this.$el.querySelector('.settings-tabs');
        this.$timeFormat         = this.$el.querySelector('.settings-time-format');
        this.$delimeterBlinking  = this.$el.querySelector('.settings-delimeter-blinking');
        this.$autoHideDock       = this.$el.querySelector('.settings-autohide-dock');
        this.key                 = 'settings_data';

        this.
            handleTabs().
            handleClose().
            handleTimeFormat().
            handleDelimeterBlinking().
            handleAutoHideDock();

        this.$dockSettings.appendChild(app.dock.getSettings());
    };

    SettingsView.prototype.update = function(data) {
        this.
            updateTimeFormat(data.use24format).
            updateDelimeterBlinking(data.delimeterBlinking).
            updateAutoHideDock(data.autoHideDock);
    };

    SettingsView.prototype.open = function() {
        this.$el.classList.remove('hidden');
    };

    SettingsView.prototype.close = function() {
        this.$el.classList.add('hidden');
    };

    SettingsView.prototype.toggle = function() {
        this.$el.classList.toggle('hidden');
    };

    SettingsView.prototype.handleTabs = function() {
        var root      = this,
            $tabItems = this.$el.querySelectorAll('.settings-tab');

        forEach($tabItems, function($tabItem) {
            $tabItem.addEventListener('click', function() {
                var selector = this.dataset.target;

                root.$dockSettings.classList.add('hidden');
                root.$appearanceSettings.classList.add('hidden');
                root.$el.querySelector(selector).classList.remove('hidden');
                root.$el.querySelector('.active').classList.remove('active');
                this.classList.add('active');
            });
        });

        return this;
    };

    SettingsView.prototype.handleClose = function() {
        var root = this;

        this.$el.querySelector('.settings-close-icon').
            addEventListener('click', function() {
                root.close();
            });

        return this;
    };

    SettingsView.prototype.updateTimeFormat = function(use24format) {
        use24format = typeof use24format !== 'undefined' ? use24format : true;
        this.$timeFormat.classList.remove('enabled');
        this.$timeFormat.classList.remove('disabled');
        this.$timeFormat.classList.add(use24format ? 'enabled' : 'disabled');
        this.$timeFormat.querySelector('input').checked = use24format;
        return this;
    };

    SettingsView.prototype.updateDelimeterBlinking = function(delimeterBlinking) {
        delimeterBlinking = typeof delimeterBlinking !== 'undefined' ? delimeterBlinking : true;
        this.$delimeterBlinking.classList.remove('enabled');
        this.$delimeterBlinking.classList.remove('disabled');
        this.$delimeterBlinking.classList.add(delimeterBlinking ? 'enabled' : 'disabled');
        this.$delimeterBlinking.querySelector('input').checked = delimeterBlinking;
        return this;
    };

    SettingsView.prototype.updateAutoHideDock = function(autoHideDock) {
        autoHideDock = typeof autoHideDock !== 'undefined' ? autoHideDock : false;
        this.$autoHideDock.classList.remove('enabled');
        this.$autoHideDock.classList.remove('disabled');
        this.$autoHideDock.classList.add(autoHideDock ? 'enabled' : 'disabled');
        this.$autoHideDock.querySelector('input').checked = autoHideDock;
        app.dock.toggleAutoHide(autoHideDock);
        return this;
    };

    SettingsView.prototype.handleTimeFormat = function() {
        var root = this;
        this.$timeFormat.addEventListener('click', function() {
            var checked = !root.$timeFormat.querySelector('input').checked;
            app.settingsStorage.update('use24format', checked);
        });
        return this;
    };

    SettingsView.prototype.handleDelimeterBlinking = function() {
        var root = this;
        this.$delimeterBlinking.addEventListener('click', function() {
            var checked = !root.$delimeterBlinking.querySelector('input').checked;
            app.settingsStorage.update('delimeterBlinking', checked);
        });
        return this;
    };

    SettingsView.prototype.handleAutoHideDock = function() {
        var root = this;
        this.$autoHideDock.addEventListener('click', function() {
            var checked = !root.$autoHideDock.querySelector('input').checked;
            app.settingsStorage.update('autoHideDock', checked);
        });
        return this;
    };

    var SettingsStorage = function() {
        var root = this;

        this.key = 'settings_data';
        this.data = {};

        this.loaded = new Promise(function (resolve, reject) {
            chrome.storage.sync.get(root.key, function(data) {
                if (!data || isEmpty(data) || !data[root.key]) {
                    reject();
                } else {
                    data = data[root.key];
                }

                root.data = data;

                resolve();
            });
        });
    };

    SettingsStorage.prototype.sync = function() {
        var storeData = {};

        storeData[this.key] = this.data;

        chrome.storage.sync.set(storeData);
    };

    SettingsStorage.prototype.update = function(key, value) {
        this.data[key] = value;

        this.sync();

        app.updateViews();
    };

    var I18n = function() {
        forEach(document.querySelectorAll('[data-i18n]'), function(elem) {
            var i18nStringKey = elem.dataset.i18n,
                i18nString = chrome.i18n.getMessage(i18nStringKey);

            if (elem.classList.contains('dockicon')) {
                elem.dataset.alt = i18nString;
            } else {
                elem.innerText = i18nString;
            }
        });
    };

    var App = function() {
        this.main();
    };

    App.prototype.main = function() {
        this.settingsStorage = new SettingsStorage();

        document.addEventListener('DOMContentLoaded', this.ready.bind(this));
    };


    App.prototype.ready = function() {
        this.settingsStorage.loaded.then(function() {
            app.init();
        }, function() {
            // no setting were loaded
            // do intro here
            app.init();
            app.generateDefaultSettings();
        });
    };

    App.prototype.generateDefaultSettings = function() {

    };

    App.prototype.init = function() {
        this.i18n         = new I18n();
        this.clock        = new Clock();
        this.dock         = new Dock();
        this.settingsView = new SettingsView();

        this.updateViews();
        this.showViews();
    };

    App.prototype.updateViews = function() {
        var data = this.settingsStorage.data;

        this.clock.updateFormat(data.use24format);
        this.clock.updateDelimeter(data.delimeterBlinking);

        this.dock.update(data);

        this.settingsView.update(data);
        console.log(data);
        return this;
    };

    App.prototype.showViews = function() {
        this.clock.show();
        this.dock.show();
    };

    app = new App();

    function forEach(array, iter, context) {
        Array.prototype.forEach.call(array, iter, context || null);
    }

    function isEmpty(obj) {
        var key;

        for (key in obj) {
            return false;
        }
        return true;
    }
})();

// // google analytics
// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-51673902-1']);
// _gaq.push(['_trackPageview']);

// (function() {
//     var ga = document.createElement('script');
//     ga.type = 'text/javascript';
//     ga.async = true;
//     ga.src = 'https://ssl.google-analytics.com/ga.js';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(ga, s);
// })();
