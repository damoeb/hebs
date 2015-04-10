'use strict';

hebsApp
    .config(function ($routeProvider, $httpProvider, $translateProvider, USER_ROLES) {
            $routeProvider
                .when('/note', {
                    templateUrl: 'views/notes.html',
                    controller: 'NoteController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
        });
