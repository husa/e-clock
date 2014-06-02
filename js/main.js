(function() {
    document.addEventListener('DOMContentLoaded', main);

    var Clock = function() {
        this.$container = document.querySelector('.container');
        this.$clock     = this.$container.querySelector('.clock');
        this.$hours     = this.$clock.querySelector('.hours');this.$clock
        this.$minutes   = this.$clock.querySelector('.minutes');
        this.$delimeter = this.$clock.querySelector('.delimeter');
        this.$ampm      = this.$clock.querySelector('.ampm');

        this.prev = {
            hours : -1,
            minutes : -1
        }
    }

    Clock.prototype.updateTime = function() {
        console.log('trying to update');
        if (this.timeHasChanged()) {
            console.log('actually updating')
            this.$hours.innerHTML   = date.getHours();
            this.$minutes.innerHTML = date.getMinutes();
            this.updateChangedTime();
        }
    }

    Clock.prototype.timeHasChanged = function() {
        return date.getMinutes() != this.prev.minutes &&
                date.getHours() != this.prev.hours;
    }

    Clock.prototype.updateChangedTime = function() {
        this.prev.minutes = date.getMinutes();
        this.prev.hours   = date.getHours();
    }

    var date = {
        getDate : function() {
            return new Date();
        },
        getHours : function() {
            return this.getDate().getHours()
        },
        getMinutes : function() {
            var minutes = this.getDate().getMinutes();
            return  (minutes < 10 ? '0' : '') + minutes;
        }
    }

    function main() {
        var clock = new Clock();

        clock.updateTime();

        var interval = setInterval(function() {
            clock.updateTime();
        }, 1000);
    }
})();
