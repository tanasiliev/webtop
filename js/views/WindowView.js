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
        model: new WindowModel(),
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
            if (this.contentType == "img") {
                var img = document.createElement("img");
                img.src = 'assets/img/' + this.title;
                contentElement.appendChild(img);
                self.el.css({ height: img.height + 80 + "px"});
            }
            else if(this.contentType == "doc"){
                var textarea = document.createElement("textarea");
                textarea.value = "Some Text Content";
                contentElement.appendChild(textarea );
            }
            else {
                 var iFrame = document.createElement("iframe");
                 iFrame.src = 'assets/data/' + this.title;
                 contentElement.appendChild(iFrame);
            }
        },
        attachEvents: function () {
            var self = this;
            var model = self.model;
            var events = [];
            var selectWindow = function () {
                model.el = self.el;
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
                            model[action]();
                        }
                    };
                    events.push(obj);
                })(action);
            }
            this._base.attachEvents(events);
        }

    });
    WindowView.inherit(View);

    return WindowView;
});