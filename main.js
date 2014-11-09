(function () {

    HTMLElement.prototype.css = function (obj) {
        for (var prop in obj) {
            if (this.style.hasOwnProperty(prop))
                this.style[prop] = obj[prop];
        }
    };

    document.body.style.height = window.innerHeight - 20 + 'px';

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

    var WindowModule = function () {

        this._el = null;
        this._windows = 0;
        this.oldPosition = null;
        this.__defineGetter__("el", function () {
            return this._el;
        });
        this.__defineSetter__("el", function (val) {
            this._el && this.changeZIndex(val);
            this._el = val;
        });

        this.__defineGetter__("windows", function () {
            return this._windows;
        });

        this.__defineSetter__("windows", function (val) {
            this.setPosition();
            this._windows = val;
        });
    };

    WindowModule.prototype = {

        close: function () {
            document.body.removeChild(this._el.parentElement);
        },
        maximize: function () {
            if (this.oldPosition) {
                return false;
            }
            var cssObj = {
                top: this.el.style.top,
                left: this.el.style.left,
                width: this.el.style.width,
                height: this.el.style.height
            };
            this.oldPosition = cssObj;
            var w = window.innerWidth - 4 + 'px';
            var h = window.innerHeight - 4 + 'px';
            var style = { top: 0, left: 0, width: w, height: h};
            this._el.css(style);
        },
        minimize: function () {
            if (!this.oldPosition) {
                return false;
            }
            this._el.css(this.oldPosition);
            this.oldPosition = null;
        },
        changeZIndex: function (newEl) {
            this._el.style.zIndex = 0;
            newEl.style.zIndex = 1;
        },
        setPosition: function () {
            var distance = (this._windows + 1 ) * 10 + 200 + "px";
            this._el.css({ top: distance, left: distance});
        },
        makeMovable: movable.make,
        makeResizable: function () {
            this._el.classList.add("resizable");
        }
    };


    var WindowView = Class.create({
        init: function (title, contentType) {
            this.el = null;
            this.title = title;
            this.contentType = contentType;
            this.render();
            this.attachEvents();
        },
        module: new WindowModule(),
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
                img.src = 'img/' + this.title;
                contentElement.appendChild(img);
                self.el.css({width: img.width + 80 + "px", height: img.height + 80 + "px"});
            }
            else {
                var iFrame = document.createElement("iframe");
                iFrame.src = 'data/' + this.title;
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
            iconImage.src = "img/" + this.type + ".png";
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
                alert('ss');
            });
        }

    });

    IconView.inherit(View);

    var icon = new IconView("text.txt", "doc");
    var icon1 = new IconView("img.png", "img");
    var icon2 = new IconView("MyPDF.pdf", "pdf");


})();




