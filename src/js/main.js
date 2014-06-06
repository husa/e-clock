var app = {};
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', main);

    var date = {
        prev : {
            hours : -1,
            minutes : -1
        },
        getDate : function() {
            return new Date();
        },
        getHours : function() {
            return this.getDate().getHours();
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
        }
    };

    var Clock = function() {
        this.$container = document.querySelector('.container');
        this.$clock     = this.$container.querySelector('.clock');
        this.$hours     = this.$clock.querySelector('.hours');
        this.$minutes   = this.$clock.querySelector('.minutes');
        this.$delimeter = this.$clock.querySelector('.delimeter');
        this.$ampm      = this.$clock.querySelector('.ampm');

        this.updateTime();

        this.interval = window.setInterval(this.updateTime.bind(this), 1000);
    };

    Clock.prototype.updateTime = function() {
        if (date.timeHasChanged()) {
            this.$hours.innerHTML   = date.getHours();
            this.$minutes.innerHTML = date.getMinutes();
            date.updateChangedTime();
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
                    app.settings.toggle();
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
            this.$settingIcon.classList.add('dock-icon-settings');

            var checked = this.$el.classList.contains('hidden') ? '' : 'checked';

            this.$settingIcon.innerHTML = '<input type="checkbox" ' + checked + '/>' + svgIcon + '<span>' + title + '</span>';

            this.handleSettings();
        }

        return this.$settingIcon;
    };

    DockIcon.prototype.handleSettings = function() {
        var root = this;

        if (!this.$settingIcon) {
            throw Error('setting weren\'t generated yet');
        }

        this.$settingIcon.querySelector('input').addEventListener('click', function() {
            if (this.checked) {
                root.parent.turnOn(root);
            } else {
                root.parent.turnOff(root);
            }
        });
    };

    DockIcon.prototype.hide = function() {
        this.$el.classList.add('hidden');
    };

    DockIcon.prototype.show = function() {
        this.$el.classList.remove('hidden');
    };

    DockIcon.prototype.update = function(data) {
        if (!data.visible) {
            this.hide();
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
            }).forEach(function(dockIconView) {
                this.$settingsContainer.appendChild(dockIconView.generateSetting());
            }, this);
        }

        return this.$settingsContainer;
    };

    Dock.prototype.turnOn = function(dockIconView) {
        this.getDockView(dockIconView).show();

        app.settings.update(dockIconView.url, {
            visible : true,
            order : null
        });
    };

    Dock.prototype.turnOff = function(dockIconView) {
        this.getDockView(dockIconView).hide();

        app.settings.update(dockIconView.url, {
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


    var Settings = function () {
        this.$el = document.querySelector('.settings');
        this.key = 'settings_data';

        this.fetch();

        app.dock.update(this.data);

        this.$dockSettings = this.$el.querySelector('.dock-settings');
        this.$dockSettings.appendChild(app.dock.getSettings());

        this.handleClose();
    };

    Settings.prototype.open = function() {
        this.$el.classList.remove('hidden');
    };

    Settings.prototype.close = function() {
        this.$el.classList.add('hidden');
    };

    Settings.prototype.toggle = function() {
        this.$el.classList.toggle('hidden');
    };

    Settings.prototype.sync = function() {
        localStorage.setItem(this.key, JSON.stringify(this.data));
    };

    Settings.prototype.fetch = function() {
        var data = localStorage.getItem(this.key);

        if (!data) {
            data = {};
            app.dock.iconViews.forEach(function(dockIconView) {
                data[dockIconView.url] = {
                    visible : true,
                    order : null
                };
            });
        } else {
            data = JSON.parse(data);
        }

        this.data = data;
    };

    Settings.prototype.update = function(key, value) {
        this.data[key] = value;

        this.sync();
    };

    Settings.prototype.handleClose = function() {
        var root = this;

        this.$el.querySelector('.settings-close-icon').
            addEventListener('click', function() {
                root.close();
            });
    };

    function main() {
        app.clock    = new Clock();
        app.dock     = new Dock();
        app.settings = new Settings();
    }
})();

// google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-51673902-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
