define([
    'views/IconView',
    'views/WindowView'
], function (IconView, WindowView) {

    var RightClickWindowModel = {
        el: null,
        icon: null,
        show: function (event, icon) {
            this.el.css({
                    display: "block",
                    top: event.clientY + "px",
                    left: event.clientX + "px"}
            );
            this.icon = icon;
        },
        open: function(){
            new WindowView(this.icon.name, this.icon.type);
        },
        delete: function () {
            this.icon.el.style.visibility = "hidden";
        },
        create: function () {
            new IconView("text.txt", "doc");
        }
    };

    return RightClickWindowModel;
});



