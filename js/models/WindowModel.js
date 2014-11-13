define([
    'helpers/Movable'
], function (Movable) {

    var WindowModel = function () {

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

    WindowModel.prototype = {

        close: function () {
            document.body.removeChild(this._el);
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
            var distance = (this._windows + 1 ) * 12 + 150 + "px";
            this._el.css({ top: distance, left: distance});
        },
        makeMovable: Movable.make,
        makeResizable: function () {
            this._el.classList.add("resizable");
        }
    };

    return new WindowModel;
});



