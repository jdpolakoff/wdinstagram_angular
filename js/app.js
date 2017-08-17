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
.controller('InstaNewController', [
  '$state',
  'Insta',
  InstaNewControllerFunction
])
.controller('InstaShowController', [
  '$stateParams',
  'Insta',
  InstaShowControllerFunction
])
.controller('InstaEditController', [
  '$state',
  'Insta',
  InstaEditControllerFunction
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
  .state('instaNew', {
        parent: 'instaIndex',
        url: '/new',
        templateUrl: 'js/instagrams/new.html',
        controller: 'InstaNewController',
        controllerAs: 'vm'
      })
  .state('instaShow', {
    url: '/instagrams/:id',
    templateUrl: 'js/instagrams/show.html',
    controller: 'InstaShowController',
    controllerAs: 'vm'
  })
  .state('instaEdit', {
      parent: 'instaShow',
      url: '/edit',
      templateUrl: 'js/instagrams/edit.html',
      controller: 'InstaEditController',
      controllerAs: 'vm'
    })
}

function InstaIndexControllerFunction (Insta) {
  this.instagrams = Insta.query()
}

function InstaShowControllerFunction ($stateParams, Insta) {
  this.instagram = Insta.get({id: $stateParams.id})
}

function InstaNewControllerFunction ($state, Insta) {
  this.newInsta = new Insta()
  this.create = function () {
    this.newInsta.$save(() => {
      $state.go('instaIndex', {}, { reload: true })
    })
  }
}

function InstaEditControllerFunction ($state, Insta) {
  this.insta = Insta.get({id: $state.params.id})
  this.update = function () {
    this.insta.$update({id: $state.params.id})
  }
}
