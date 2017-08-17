"use strict";

angular
.module("wdinstagram", [
    'ui.router',
    'ngResource'
  ])
.config([
  '$stateProvider',
  RouterFunction
])
.factory('Insta', [
  '$resource',
  instaService
])
.controller('InstaIndexController', [
  'Insta',
  InstaIndexControllerFunction
])


function instaService ($resource) {
  return $resource('http://localhost:3000/entries/:id', {}, {
    update: {
      method: 'PUT'
    }
})
}

function RouterFunction ($stateProvider) {
  $stateProvider
  .state('instaIndex', {
    url: '/instagrams',
    templateUrl: 'js/instagrams/index.html',
    controller: 'InstaIndexController',
    controllerAs: 'vm'
  })
}

function InstaIndexControllerFunction (Insta) {
  this.instagrams = Insta.query()
}
