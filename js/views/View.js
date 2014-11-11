define([
     'helpers/Class'
], function(Class){

    HTMLElement.prototype.css = function (obj) {
        for (var prop in obj) {
            if (this.style.hasOwnProperty(prop))
                this.style[prop] = obj[prop];
        }
    };

    var View = Class.create({
        init: function () {

        },
        attachEvents: function (events) {
            for (var i in events) {
                var eventObj = events[i];
                eventObj.el[eventObj.event] = eventObj.action;
            }
        },
        renderTempalte: function (stringHtml) {
            var container = document.createElement('div');
            document.body.appendChild(container);
            container.innerHTML = stringHtml;
            var el = container.children[0];
            // todo - remove unneeded div container
            return el;
        }
    });

    return View;
});
