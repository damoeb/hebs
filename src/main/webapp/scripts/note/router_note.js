'use strict';

hebsApp
    .config(function ($routeProvider, $httpProvider, $translateProvider, USER_ROLES) {
            $routeProvider
                .when('/note/new', {
                    templateUrl: 'views/notes-edit.html',
                    controller: 'NoteEditController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/note/:noteId', {
                    templateUrl: 'views/notes-edit.html',
                    controller: 'NoteEditController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
        });
