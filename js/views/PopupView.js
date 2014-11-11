define([
    'helpers/Class',
    'views/View',
    'models/PopupModel'
], function (Class, View, WindowModel) {

    var PopupView = Class.create({
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
            self.el.onclick = function () {
                self.el.css({ display: ""});
            };

            var actions = ['open', 'delete', 'create'];
            for (var i in actions) {
                var action = actions[i];
                var el = document.getElementById("icon-" + action);
                (function (action) {
                    el.onclick = function () {
                        self.module[action]();
                    };
                })(action);
            }
        }
    });

    PopupView.inherit(View);

    return new PopupView;

});