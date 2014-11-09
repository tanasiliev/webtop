define(function () {

    var Class = {
        create: function (properties) {
            var f = function () {
                if (this._superConstructor) {
                    this.base = new this._superConstructor(arguments);
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
        this.prototype._superConstructor = parent;
        for (var prop in oldPrototype) {
            this.prototype[prop] = oldPrototype[prop];
        }
    };

    return Class;
});