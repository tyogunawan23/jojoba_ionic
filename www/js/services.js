angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('DataUser', function () {
var user = {};
return {
    getUser: function () {
        return user;
    },
    setUser: function (userparameter) {
        user = userparameter;
    }
};
})

.factory('ChatService', function ($http) {
var chats = {};
return {
    getUserMatch: function (fbid) {
      return $http.get(base_api_url + 'api/v1/findmatch/match?fbid=' + fbid, _configHeader).then(function(response){
      chats = response;
      return chats;
    }, function(error){
        return error ;
				//something went wrong!
				//Optionally, we can just: return error;
			});
		},

    unMatch: function (fbid, partnerId) {
      return $http.get(base_api_url + 'api/v1/findmatch/unmatch?fbid=' + fbid + '&partnerId=' +partnerId, _configHeader).then(function(response){
    //   chats.splice(chats.indexOf(chat), 1);
    //  chats = response;
      return response;
    }, function(error){
        return error ;
				//something went wrong!
				//Optionally, we can just: return error;
			});
		},
    setUser: function (userparameter) {
        user = userparameter;
    }
};
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
