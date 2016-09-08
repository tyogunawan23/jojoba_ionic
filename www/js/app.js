// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic','blank.controllers', 'starter.services' ,'ngCordovaOauth','ionic.contrib.ui.cards', 'ngCordova', 'ngStorage','ionic.contrib.ui.tinderCards', 'firebase']);
myApp.run(function($ionicPlatform, $localStorage, $state, $ionicHistory, $location, $rootScope, $cordovaPushV5) {


  $ionicPlatform.ready(function() {


      var options = {
       android: {
         senderID: "399255501419"
       },
       ios: {
         alert: "true",
         badge: "true",
         sound: "true"
       },
       windows: {}
     };

     // initialize
     $cordovaPushV5.initialize(options).then(function() {
       // start listening for new notifications
       $cordovaPushV5.onNotification();
       // start listening for errors
       $cordovaPushV5.onError();

       // register to get registrationId
       $cordovaPushV5.register().then(function(registrationId) {
         localStorage.setItem('tkn_firbase', registrationId);
         console.log(registrationId);
         // save `registrationId` somewhere;
       })
     });

     // triggered every time notification received
     $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
       // data.message,
       // data.title,
       // data.count,
       // data.sound,
       // data.image,
       // data.additionalData
      // alert(JSON.stringify(data))
     });

     // triggered every time error occurs
     $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
       // e.message

    //   alert(e)
     });

    //  var push = new Ionic.Push({
    //    "onNotification": function(notification) {
    //      alert('Received push notification!');
    //    },
    //    "pluginConfig": {
    //      "android": {
    //        "iconColor": "#0000FF"
    //      }
    //    }
    //  });

    //  push.on('notification', function(notification) {
    //     console.log("notification received")
    //   })

    // $rootScope.$on('cloud:push:notification', function(event, data) {
    //     console.log('received push');
    //   var msg = data.message;
    //   alert(msg.title + ': ' + msg.text);
    //
    //   });
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
      $ionicHistory.nextViewOptions({
         historyRoot: true
       });
        $state.go('app.people');
      } else {
          $state.go('login');
      }

    if (window.cordova) {
 //      $ionicPush.register({
 //           canShowAlert: true, //Can pushes show an alert on your screen?
 //           canSetBadge: true, //Can pushes update app icon badges?
 //           canPlaySound: true, //Can notifications play a sound?
 //           canRunActionsOnWake: true, //Can run actions outside the app,
 //           onNotification: function(notification) {
 //             // Handle new push notifications here
 //             console.log("notif");
 //             alert('notif')
 //             return true;
 //           }
 // }).then(function(t) {
 //        return $ionicPush.saveToken(t);
 //      }).then(function(t) {
 //        console.log('Token saved:', JSON.stringify(t));
 //        localStorage.setItem('tkn_firbase', t.token);
 //      },function(error){
 //         alert(JSON.stringify(error));
 //      });
 //
 //      $rootScope.$on('cloud:push:notification', function(event, data) {
 //          console.log('received push');
 //        var msg = data.message;
 //        alert(msg.title + ': ' + msg.text);
 //
 //        });

        // $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
        //     alert(JSON.stringify(data));
        //   });

    }

    // window.onNotification = function(e){
    //     alert(e.event);
    // }

  });

  // $rootScope.$on('cloud:push:notification', function(event, data) {
  //     console.log('received push');
  //   var msg = data.message;
  //   alert(msg.title + ': ' + msg.text);
  //
  //   });


});

myApp.config(function($stateProvider, $urlRouterProvider) {

  // $ionicCloudProvider.init({
  //    "core": {
  //        "app_id": "9b16707f",
  //        "api_key": '3d338944048a7ca4c843a21621c81342c6d587373e5be03a',
  //        "dev_push": true
  //    },
  //
  //    "push": {
  //         "sender_id": "399255501419",
  //         "onNotification": "notify",
  //         "pluginConfig": {
  //           "ios": {
  //             "badge": true,
  //             "sound": true
  //           },
  //           "android": {
  //             "iconColor": "#343434"
  //           }
  //         }
  //       }
  //     });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })


    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:"login"
    })


    .state('religion', {
      url: '/religion',
      templateUrl: 'views/religion/religion.html',
      controller:"navigateReligion"
    })


    .state('religionpartner', {
      url: '/religionpartner',
      templateUrl: 'views/religion/religionpartner.html',
      controller:"navigateReligionPartner"
    })


    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'views/home/home.html',
          controller:"home"
        }
      }
    })


    .state('app.profil', {
        url: '/profil',
        views: {
          'menuContent': {
            templateUrl: 'views/profil/profil.html',
            controller:"profil"
          }
        }
      })

      .state('app.people', {
          url: '/people',
          views: {
            'menuContent': {
              templateUrl: 'views/people/people.html',
              controller: "people"
            }
          }
        })



    .state('app.match', {
      url: '/match',
      views: {
        'menuContent': {
          templateUrl: 'views/match/match.html',
          controller:"match"
        }
      }
    })

    .state('app.chat', {
      url: '/chat',
      views: {
        'menuContent': {
          templateUrl: 'views/chat/chat.html',
          controller:"chat"
        }
      }
    })

    .state('app.chat-detail', {
      url: '/chat/:chatId',
      views: {
        'menuContent': {
          templateUrl: 'views/chat/chat-detail.html',
          controller: "ChatDetailCtrl"
        }
      }

    })

    .state('app.detailpeople', {
      url: '/detailpeople?id',
      views: {
        'menuContent': {
          templateUrl: 'views/detailpeople/detailpeople.html',
          controller: "PeopleDetailCtrl"
        }
      }

    })

    .state('app.setting', {
      url: '/setting',
      views: {
        'menuContent': {
          templateUrl: 'views/setting/setting.html',
          controller:"setting"
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
