!function(){"use strict";function a(){var a=new c;a.updateTime();window.setInterval(function(){a.updateTime()},1e3)}document.addEventListener("DOMContentLoaded",a);var b={getDate:function(){return new Date},getHours:function(){return this.getDate().getHours()},getMinutes:function(){var a=this.getDate().getMinutes();return(10>a?"0":"")+a}},c=function(){this.$container=document.querySelector(".container"),this.$clock=this.$container.querySelector(".clock"),this.$hours=this.$clock.querySelector(".hours"),this.$minutes=this.$clock.querySelector(".minutes"),this.$delimeter=this.$clock.querySelector(".delimeter"),this.$ampm=this.$clock.querySelector(".ampm"),this.prev={hours:-1,minutes:-1}};c.prototype.updateTime=function(){this.timeHasChanged()&&(this.$hours.innerHTML=b.getHours(),this.$minutes.innerHTML=b.getMinutes(),this.updateChangedTime())},c.prototype.timeHasChanged=function(){return+b.getMinutes()!==this.prev.minutes||+b.getHours()!==this.prev.hours},c.prototype.updateChangedTime=function(){this.prev.minutes=b.getMinutes(),this.prev.hours=b.getHours()}}();