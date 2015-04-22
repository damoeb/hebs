'use strict';

hebsApp.controller('NoteController', function ($scope, $rootScope, Note) {

    $scope.currentPage = 0;
    $scope.$isLastPage = true;
    $scope.$isFirstPage = true;

    $scope.formatDate = function(date) {
        return moment(parseFloat(date)).format('dddd, DD.MM.YYYY')
    };

    var postProcResult = function(result) {
        $scope.$isLastPage = result.lastPage;
        $scope.$isFirstPage = result.firstPage;
        $scope.currentPage = result.number;

        // group by days
        var groups = _.groupBy(result.content, function(note) {
            //return moment(note.createdDate).format('DD.MM.YYYY');
            return parseInt(note.createdDate/10000000)*10000000;
        });

        // todo does not work for search

        $scope.sortedDays = _.sortBy(_.keys(groups), function (createdDate) {
            return -1 * createdDate
        });

        $scope.byDays = {};

        _.forEach($scope.sortedDays, function (createdDate) {
            $scope.byDays[createdDate] = groups[createdDate];
        });

        console.log($scope.byDays);
    };

    var __doLoad = function(data) {

        var params = {page: $scope.currentPage};

        if (!$rootScope.authenticated) {
            params['id'] = 'public';
        }

        Note.query(params, function (result) {
            postProcResult(result)
        });
    };

    $scope.$on('event:auth-loginConfirmed', __doLoad);

    var loadCurrentPage = function () {
        console.log("load current page");

        __doLoad()
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

    $scope.search = function() {
        console.log('search', $scope.query);
        Note.query({page: $scope.currentPage, query: $scope.query}, function(result) {
            postProcResult(result);
        })
    };

    $scope.create = function () {
        Note.save($scope.note,
            function () {
                $scope.notes = Note.query();
                $('#saveNoteModal').modal('hide');
                $scope.clear();
                loadCurrentPage();
            });
    };

    $scope.updateDialog = function (id) {
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
