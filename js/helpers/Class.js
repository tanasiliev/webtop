define(function () {

    var Class = {
        create: function (properties) {
            var f = function () {
                if (this._baseConstructor) {
                    this._base = new this._baseConstructor(arguments);
                }
                this.init.apply(this, arguments);
            };
            for (var prop in properties) {
                f.prototype[prop] = properties[prop];
            }
            if (!f.prototype.init) {
                f.prototype.init = function () {
                }
            }
            return f;
        }
    };

    Function.prototype.inherit = function (parent) {
        var oldPrototype = this.prototype;
        this.prototype = new parent();
        this.prototype._baseConstructor = parent;
        for (var prop in oldPrototype) {
            this.prototype[prop] = oldPrototype[prop];
        }
    };

    return Class;
});