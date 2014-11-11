define([
    'helpers/Movable',
    'views/WindowView',
    'models/PopupModel',
    'views/PopupView'
], function (Movable, WindowView, PopupModel, PopupView) {

    var IconModel = function () {
        this.el = null;
    };

    IconModel.prototype = {

        showPopup: function (icon, event, iconView) {
            PopupModel.show(icon, event, iconView);
        },
        open: function () {
            new WindowView(this.name, this.type);
        },
        delete: function () {
            this.el.style.visibility = "hidden";
        },
        makeMovable: Movable.make
    };

    return new IconModel;
});



