define([
    'helpers/Class',
    'views/View',
    'models/RightClickWindowModel',
], function (Class, View, WindowModel) {

    var RightClickWindowView = Class.create({
        init: function () {
            this.el = null;
            this.render();
            this.attachEvents();
        },
        module: WindowModel,
        render: function () {
            // get and render template
            var template = document.getElementById("rc-window-template").innerHTML;
            this.el = this._base.renderTempalte(template);
            this.module.el = this.el;
        },
        attachEvents: function () {
            var self = this;
            document.onmouseup = function () {
                self.el.css({ display: ""});
                document.onclick = null;
            };
            var open = document.getElementById("icon-open");
            open.onclick = function () {
                self.module.open();
            };

            var iconDelete = document.getElementById("icon-delete");
            iconDelete.onclick = function () {
                self.module.delete();
            };

            var create = document.getElementById("icon-create");
            create.onclick = function () {
                self.module.create();
            };

        },
        show: function (event, icon) {
            this.module.show(event, icon);
        }
    });

    RightClickWindowView.inherit(View);

    return new RightClickWindowView;

});