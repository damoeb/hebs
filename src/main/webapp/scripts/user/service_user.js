'use strict';

hebsApp.factory('User', function ($resource) {
        return $resource('app/rest/users/:id', {}, {
            'get': { method: 'GET'}
        });
    });
