define([
    'helpers/Class',
    'views/View'
], function (Class, View) {

    var TaskbarWindowView = Class.create({
        init: function (name ) {
            this.el = null;
            this.name = name;
            this.render();
        },
        model: null,
        render: function () {
            // get and render icon template
            var template = document.getElementById("taskbar-window-template").innerHTML;
            var taskbar =  document.getElementsByClassName("taskbar")[0];
            this.el = this._base.renderTempalte(template, taskbar);

            // set taskbar window's title
            var pName = this.el.getElementsByClassName("taskbar-title")[0];
            pName.innerHTML = this.name;

            var self = this;
            self.el.onmouseover = function () {
                self.attachEvents();
                self.el.onmouseover = null;
            }

        },
        attachEvents: function () {
            var self = this;
            self.el.onclick = function () {
                self.model.toggle();
            };
        }
    });

    TaskbarWindowView.inherit(View);

    return TaskbarWindowView;

});