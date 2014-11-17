define([
    'views/WindowView',
    'controller'
], function (WindowView, controller) {

    var PopupModel = {
        el: null,
        icon: null,
        iconView: null,
        iconCounter: 0,
        show: function (icon, event, iconView) {
            if (!this.el) {

            }
            this.el.css({
                    display: "block",
                    top: event.clientY + "px",
                    left: event.clientX + "px"}
            );
            this.icon = icon;
            this.iconView = iconView;
        },
        open: function () {
            if (controller.isOpen(this.icon.name)) {
                return false;
            }
            new WindowView(this.icon.name, this.icon.type);
        },
        delete: function () {
            this.icon.el.style.visibility = "hidden";
        },
        create: function () {
            new this.iconView("Untitled document" + (++this.iconCounter), "doc");
        }
    };

    return PopupModel;
});



