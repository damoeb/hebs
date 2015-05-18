'use strict';

hebsApp.controller('NoteEditController', function ($scope, $location, $routeParams, $rootScope, Note, Session) {

    var noteId = $routeParams.noteId;

    $scope.note = {};

    if (!_.isUndefined(noteId)) {
        console.log('edit note', noteId);
        $scope.note = Note.get({id: noteId});
    } else {
        console.log('create new note');
    }

    $scope.home = function () {
        $location.path('/u/' + Session.login).replace();
    };

    $scope.create = function () {
        Note.save($scope.note,
            function () {
                // nothing
            });
    };

    $scope.delete = function (id) {
        Note.delete({id: id},
            function () {
                $scope.notes = Note.query();
            });
    };

    $scope.clear = function () {
        $scope.note = {scope: null, content: null, owner: null, id: null};
    };
});
