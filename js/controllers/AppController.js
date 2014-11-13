define([
    'helpers/Observer'
], function (Observer) {



    var onActionFire = function(obj) {
             for(var key in obj){
                 var itemName = key.split(":")[0];
                 var actionName = key.split(":")[1];
                 var data = obj[key];
                 console.log(itemName);
                 console.log(actionName);
                 console.log(data);
             }

    };
    var App = function () {

    };
    var app = new App();
    Observer.make(app);
    app.subscribe(onActionFire);

    return app;
});
