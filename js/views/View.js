define([
    'helpers/Class'
], function (Class) {

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
        renderTempalte: function (stringHtml, appendToEl) {
            var container = document.createElement('div');
            document.body.appendChild(container);
            container.innerHTML = stringHtml;
            var el = container.children[0].cloneNode(true);
            (appendToEl || document.body ).appendChild(el);
            document.body.removeChild(container);
            return el;
        }
    });

    return View;
});
