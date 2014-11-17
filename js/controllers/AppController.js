define(function () {

    var App = {
        openedWindows : {},
        isOpen: function (name) {
            if (this.openedWindows[name]) {
                return true;
            }
            this.openedWindows[name] = 1;
            return false;
        },
        closeWindow: function (name) {
            delete this.openedWindows[name];
        }
    };

    return App;
});
