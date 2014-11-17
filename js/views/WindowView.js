define([
    'helpers/Class',
    'views/View',
    'models/WindowModel'
], function (Class, View, WindowModel) {

    var WindowView = Class.create({
        init: function (name, type) {
            this.el = null;
            this.model = null;
            this.name = name;
            this.type = type;
            this.render();
        },
        render: function () {

            // get and render template
            var template = document.getElementById("window-template").innerHTML;
            this.el = this._base.renderTempalte(template);
            this.model = new WindowModel(this.el, this.name);

            var titleElement = this.el.getElementsByClassName('window-title')[0];
            this.model.makeMovable(this.el, titleElement);


            // show the content
            var contentElement = this.el.getElementsByClassName("window-content")[0];
            if (this.type == "img") {
                var img = document.createElement("img");
                img.src = 'assets/img/' + this.name;
                contentElement.appendChild(img);
                this.el.css({ height: img.height + 80 + "px"});
            }
            else if (this.type == "doc") {
                var textarea = document.createElement("textarea");
                textarea.value = "Some Text Content";
                contentElement.appendChild(textarea);
            }
            else {
                var iFrame = document.createElement("iframe");
                iFrame.src = 'assets/data/' + this.name;
                contentElement.appendChild(iFrame);
            }

            var self = this;
            self.el.onmouseover = function () {
                self.attachEvents();
                self.el.onmouseover = null;
            }
        },
        attachEvents: function () {
            var self = this;
            var model = self.model;
            this.el.onmousedown = function () {
                model.setOnTop();
            };

            // attach event to window buttons
            var buttons = ["close", "minimize", "maximize"];
            for (var b in buttons) {
                var action = buttons[b];
                var element = self.el.getElementsByClassName("win-" + action)[0];
                (function (action) {
                    element.onclick = function () {
                        model[action]();
                    };
                })(action);
            }
        }
    });
    WindowView.inherit(View);

    return WindowView;
});