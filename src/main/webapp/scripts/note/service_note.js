'use strict';

hebsApp.factory('Note', function ($resource) {
        return $resource('app/rest/notes/:id', {}, {
            'query': { method: 'GET'},
            'get': { method: 'GET'}
        });
    });
