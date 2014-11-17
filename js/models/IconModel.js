define([
    'helpers/Movable',
    'views/WindowView',
    'models/PopupModel',
    'views/PopupView',  // !important
    'controller'
], function (Movable, WindowView, PopupModel, PopupView, controller) {

    var IconModel = function () {
        this._el = null;
        this.__defineGetter__("el", function () {
            return this._el;
        });
        this.__defineSetter__("el", function (val) {
            this._el && this.changeZIndex(val);
            this._el = val;
        });
    };

    IconModel.prototype = {

        showPopup: function (icon, event, iconView) {
            PopupModel.show(icon, event, iconView);
        },
        open: function () {
            if(controller.isOpen(this.name)){
                return false;
            }
            new WindowView(this.name, this.type);
        },
        delete: function () {
            this.el.style.visibility = "hidden";
        },
        changeZIndex: function (newEl) {
            this._el.style.zIndex = 0;
            newEl.style.zIndex = 1;
        },
        makeMovable: Movable.make
    };

    return IconModel;
});



