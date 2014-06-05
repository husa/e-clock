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

        var dockicons = document.querySelectorAll('.dockicon');

        Array.prototype.forEach.call(dockicons, function(icon) {
            icon.addEventListener('click', function() {
                var url = this.dataset.url;

                if (url) {
                    chrome.tabs.update({
                        url : url
                    });
                }
            });
        });

    }
})();
//google analytics
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
