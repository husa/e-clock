(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', main);

    var date = {
        getDate : function() {
            return new Date();
        },
        getHours : function() {
            return this.getDate().getHours();
        },
        getMinutes : function() {
            var minutes = this.getDate().getMinutes();
            return  (minutes < 10 ? '0' : '') + minutes;
        }
    };

    var Clock = function() {
        this.$container = document.querySelector('.container');
        this.$clock     = this.$container.querySelector('.clock');
        this.$hours     = this.$clock.querySelector('.hours');
        this.$minutes   = this.$clock.querySelector('.minutes');
        this.$delimeter = this.$clock.querySelector('.delimeter');
        this.$ampm      = this.$clock.querySelector('.ampm');

        this.prev = {
            hours : -1,
            minutes : -1
        };
    };

    Clock.prototype.updateTime = function() {
        if (this.timeHasChanged()) {
            this.$hours.innerHTML   = date.getHours();
            this.$minutes.innerHTML = date.getMinutes();
            this.updateChangedTime();
        }
    };

    Clock.prototype.timeHasChanged = function() {
        return +date.getMinutes() !== this.prev.minutes ||
                +date.getHours() !== this.prev.hours;
    };

    Clock.prototype.updateChangedTime = function() {
        this.prev.minutes = date.getMinutes();
        this.prev.hours   = date.getHours();
    };



    function main() {
        var clock = new Clock();

        clock.updateTime();

        var interval = window.setInterval(function() {
            clock.updateTime();
        }, 1000);


        document.querySelector('.chrome-newtab').addEventListener('click', function() {
            var myId = chrome.app.getDetails().id;
            chrome.management.setEnabled(myId, false);
            chrome.management.onDisabled(function() {
                // chrome.management.setEnabled(myId, true);
                console.log('onDisabled');
            });
            chrome.management.onEnabled(function() {
                console.log('ok');
            });
            chrome.tabs.update({
                url : 'chrome://newtab'
            });

        });

        document.querySelector('.chrome-apps').addEventListener('click', function() {
            chrome.tabs.update({
                url : 'chrome://apps'
            });
        });
    }
})();
