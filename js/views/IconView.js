define([
    'helpers/Class',
    'views/View',
    'views/WindowView',
    'views/RightClickWindowView',
], function (Class, View, WindowView, RCWindowView) {

    var IconView = Class.create({
        init: function (name, type) {
            this.el = null;
            this.name = name;
            this.type = type;
            this.render();
            this.attachEvents();
        },
        render: function () {
            // get and render icon template
            var template = document.getElementById("icon-template").innerHTML;
            this.el = this._base.renderTempalte(template);

            // set icon's name
            var pName = this.el.getElementsByClassName("icon-name")[0];
            pName.innerHTML = this.name;

            // set icon's image
            var iconImage = this.el.getElementsByClassName("icon-img")[0];
            iconImage.src = "assets/img/" + this.type + ".png";

        },
        attachEvents: function () {
            var self = this;
            var events = [];
            var onIconClick = function () {
                new WindowView(self.name, self.type);
            };
            var eventObj = {
                el: this.el, event: "onclick", action: onIconClick
            };
            events.push(eventObj);
            this._base.attachEvents(events);

            // handle custom right click event
            this.el.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();

                RCWindowView.show(ev, self);

            });
        }

    });

    IconView.inherit(View);

    return IconView;

});