define([
    'helpers/Class',
    'views/View',
    'models/WindowModel'
], function (Class, View, WindowModel) {

    var WindowView = Class.create({
        init: function (title, type) {
            this.el = null;
            this.title = title;
            this.type = type;
            this.render();
        },
        model: WindowModel,
        render: function () {
            var self = this;
            var model = self.model;

            // get and render template
            var template = document.getElementById("window-template").innerHTML;
            this.el = this._base.renderTempalte(template);

            var titleElement = self.el.getElementsByClassName('window-title')[0];
            model.makeMovable(this.el, titleElement);

            model.el = self.el;
            model.windows++;
            model.makeResizable();

            // show the content
            var contentElement = self.el.getElementsByClassName("window-content")[0];
            if (this.type == "img") {
                var img = document.createElement("img");
                img.src = 'assets/img/' + this.title;
                contentElement.appendChild(img);
                self.el.css({ height: img.height + 80 + "px"});
            }
            else if(this.type == "doc"){
                var textarea = document.createElement("textarea");
                textarea.value = "Some Text Content";
                contentElement.appendChild(textarea );
            }
            else {
                 var iFrame = document.createElement("iframe");
                 iFrame.src = 'assets/data/' + this.title;
                 contentElement.appendChild(iFrame);
            }

            self.el.onmouseover = function () {
                self.attachEvents();
                self.el.onmouseover = null;
            }
        },
        attachEvents: function () {
            var self = this;
            var model = self.model;
            this.el.onmousedown = function () {
                model.el = self.el;
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