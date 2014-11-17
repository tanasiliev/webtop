define([
    'helpers/Movable',
    'views/TaskbarWindowView',
    'controller'
], function (Movable, TaskbarWindowView, controller) {

    var WindowModel = function (el, name) {
        this.el = el;
        this.name = name;
        this.taskbarElement = null;
        this.oldPosition = null;
        this.setPosition();
        this.createTaskbar();
        this.setOnTop();
    };

    WindowModel.prototype = {

        close: function () {
            document.body.removeChild(this.el);
            this.taskbarElement.parentElement.removeChild(this.taskbarElement);
            controller.closeWindow(this.name);
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
            var w = window.innerWidth - 2 + 'px';
            var h = window.innerHeight - 4 + 'px';
            var style = { top: "24px", left: "0px", width: w, height: h};
            this.el.css(style);
        },
        minimize: function () {
            if (!this.oldPosition) {
                return false;
            }
            this.el.css(this.oldPosition);
            this.oldPosition = null;
        },
        createTaskbar: function () {
            var tb = new TaskbarWindowView(this.name);
            tb.model = this;
            this.taskbarElement = tb.el;
        },
        utility: (function () {
            var counter = 0;
            var selected = {
                window: null,
                taskbar: null
            };
            return {
                counter: function () {
                    return ++counter;
                },
                selected: function () {
                    return selected;
                }
            }
        })(),
        setOnTop: function () {
            var selectedItem = this.utility.selected();
            if (selectedItem.window) {
                selectedItem.window.style.zIndex = 1;
                selectedItem.taskbar.classList.remove("selected");
            }
            this.el.style.zIndex = 2;
            this.taskbarElement.classList.add("selected");
            selectedItem.window = this.el;
            selectedItem.taskbar = this.taskbarElement;
        },
        toggle: function () {
            var el = this.el;
            if (this.taskbarElement.classList.contains("selected")) {
                if (el.style.display) {
                    el.style.display == "block" ?
                        el.style.display = "none" :
                        el.style.display = "block";
                }
                else {
                    el.style.display = "none"
                }
            }
            else {
                this.setOnTop();
                el.style.display = "none" && (el.style.display = "block");
            }
        },
        setPosition: function () {
            var distance = (this.utility.counter() ) * 12 + 150 + "px";
            this.el.css({ top: distance, left: distance});
        },
        makeMovable: Movable.make
    };

    return WindowModel;
});



