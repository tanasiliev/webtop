define([
    'helpers/Class',
    'views/View',
    'models/IconModel'
], function (Class, View, IconModel) {

    var IconView = Class.create({
        init: function (name, type) {
            this.el = null;
            this.name = name;
            this.type = type;
            this.render();
            this.attachEvents();
        },
        model: IconModel,
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
            this.model.makeMovable(this.el, iconImage);

        },
        attachEvents: function () {
            var self = this;
            this.el.ondblclick = function () {
                self.model.open.call(self);
            };
            this.el.onmousedown = function () {
                self.model.el = self.el;
            };

            // handle custom right click event
            this.el.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();
                self.model.showPopup(self, ev, IconView);
                return false;
            },false);
        }

    });

    IconView.inherit(View);

    return IconView;

});