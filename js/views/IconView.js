define([
    'helpers/Class',
    'views/View',
    'views/WindowView'
], function(Class, View, WindowView){

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
            this.el = this.base.renderTempalte(template);

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
            this.base.attachEvents(events);

            // handle custom right click event
            this.el.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();
                alert('right click event fired');
            });
        }

    });

    IconView.inherit(View);

    return IconView;

});