define(function () {

    var make = function (obj) {
        obj.subscribers = [];
        obj.constructor.prototype.subscribe = function (callback) {
            obj.subscribers.push(callback);
        },
            obj.constructor.prototype.unsubscribe = function (callback) {
                var i = 0,
                    len = this.subscribers.length;
                for (; i < len; i++) {
                    if (this.subscribers[i] === callback) {
                        this.subscribers.splice(i, 1);
                        return;
                    }
                }
            },
            obj.constructor.prototype.fire = function (data) {
                var i = 0,
                    len = this.subscribers.length;
                for (; i < len; i++) {
                    this.subscribers[i](data);
                }
            }
    };

    var Observer = {
        make: make

    };

    return Observer;
});