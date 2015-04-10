'use strict';

hebsApp.controller('NoteController', function ($scope, Note) {

    $scope.currentPage = 0;
    $scope.$isLastPage = true;
    $scope.$isFirstPage = true;

    var loadCurrentPage = function () {
        console.log("load current page");

        Note.query({page: $scope.currentPage}, function (result) {
            $scope.$isLastPage = result.lastPage;
            $scope.$isFirstPage = result.firstPage;
            $scope.currentPage = result.number;

            // group by days
            $scope.byDays = _.groupBy(result.content, function(note) {
                return moment(note.createdDate).format('dddd, DD.MM.YYYY');
            });
        });
    };

    // -- Scope Functions -- ---------------------------------------------------------------------------------------

    $scope.nextPage = function () {
        if(!$scope.$isLastPage) {
            $scope.currentPage ++;
            loadCurrentPage();
        }
    };
    $scope.previousPage = function () {
        if(!$scope.$isFirstPage) {
            $scope.currentPage --;
            loadCurrentPage();
        }
    };

    loadCurrentPage();

    $scope.create = function () {
        Note.save($scope.note,
            function () {
                $scope.notes = Note.query();
                $('#saveNoteModal').modal('hide');
                $scope.clear();
            });
    };

    $scope.update = function (id) {
        $scope.note = Note.get({id: id});
        $('#saveNoteModal').modal('show');
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
