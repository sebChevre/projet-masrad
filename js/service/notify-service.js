app.factory('NotifyService', function(store,notify) {
    var service = {

        showFail : function (msg) {
            notify({message:msg,duration:3000,classes:'alert-danger'});
        },
        showSucess : function (msg) {
            notify({message:msg,duration:3000,classes:'alert-success'});
        }
    };
    return service;
});