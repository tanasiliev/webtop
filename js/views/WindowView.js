define([
    'helpers/Class',
    'views/View',
    'models/WindowModel'
], function (Class, View, WindowModel) {

    var WindowView = Class.create({
        init: function (title, contentType) {
            this.el = null;
            this.title = title;
            this.contentType = contentType;
            this.render();
            this.attachEvents();
        },
        module: new WindowModel(),
        render: function () {
            var self = this;
            var module = self.module;

            // get and render template
            var template = document.getElementById("window-template").innerHTML;
            this.el = this.base.renderTempalte(template);

            var titleElement = self.el.getElementsByClassName('window-title')[0];
            module.makeMovable(this.el, titleElement);

            module.el = self.el;
            module.windows++;
            module.makeResizable();

            // show the content
            var contentElement = self.el.getElementsByClassName("window-content")[0];
            if (this.contentType == "img") {
                var img = document.createElement("img");
                img.src = 'assets/img/' + this.title;
                contentElement.appendChild(img);
                self.el.css({width: img.width + 80 + "px", height: img.height + 80 + "px"});
            }
            else {
                var iFrame = document.createElement("iframe");
                iFrame.src = 'assets/data/' + this.title;
                contentElement.appendChild(iFrame);
            }
        },
        attachEvents: function () {
            var self = this;
            var module = self.module;
            var events = [];
            var selectWindow = function () {
                module.el = self.el;
            };
            var eventObj = {
                el: this.el, event: "onmousedown", action: selectWindow
            };
            events.push(eventObj);

            // attach event to window buttons
            var buttons = ["close", "minimize", "maximize"];
            for (var b in buttons) {
                var action = buttons[b];
                var element = self.el.getElementsByClassName("win-" + action)[0];
                (function (action) {
                    var obj = {
                        el: element,
                        event: "onclick",
                        action: function () {
                            module[action]();
                        }
                    };
                    events.push(obj);
                })(action);
            }
            this.base.attachEvents(events);
        }

    });
    WindowView.inherit(View);

    return WindowView;
});