// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic','blank.controllers', 'starter.services' ,'ngCordovaOauth','ionic.contrib.ui.cards']);

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
  });
});

myApp.config(function($stateProvider, $urlRouterProvider) {

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
  $urlRouterProvider.otherwise('/login');

});
