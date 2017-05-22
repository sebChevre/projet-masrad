app.factory('UtilsService', function() {
  var service = {
     isUndefinedOrNull: function(obj) {
         return !angular.isDefined(obj) || obj===null;
     }

  };
  
  return service;
});