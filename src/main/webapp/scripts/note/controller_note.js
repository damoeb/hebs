'use strict';

hebsApp.controller('NoteController', function ($scope, $location, $routeParams, $rootScope, Note) {

    var query = $location.search().query;
    var page = $location.search().page;

    if (_.isUndefined(page)) {
        $scope.currentPage = 1;
    } else {
        $scope.currentPage = page;
    }

    $scope.$isLastPage = true;
    $scope.$isFirstPage = true;

    // suche + pagination
    // ?q=[..]&page=1

    // standard + pagination
    // ?page=1

    if (!_.isUndefined(query)) {
        $scope.query = query;
    }

    var getQuery = function () {

        var params = {
            page: page
        };

        if (!$rootScope.authenticated) {
            params['id'] = 'public';
        }

        if (!_.isUndefined(query)) {
            params['query'] = query;
        }

        return params;
    };

    var handleResponse = function (response) {

        console.log('response', response.content.length, 'hits on page', response.number);

        $scope.$isLastPage = response.lastPage;
        $scope.$isFirstPage = response.firstPage;
        $scope.currentPage = response.number;

        // group by days
        var groups = _.groupBy(response.content, function (note) {
            //return moment(note.createdDate).format('DD.MM.YYYY');
            return parseInt(note.createdDate / 10000000) * 10000000;
        });

        $scope.sortedDays = _.sortBy(_.keys(groups), function (createdDate) {
            return -1 * createdDate
        });

        $scope.byDays = {};

        _.forEach($scope.sortedDays, function (createdDate) {
            $scope.byDays[createdDate] = groups[createdDate];
        });
    };

    var refresh = function () {
        if (!_.isUndefined($rootScope.authenticated)) {
            Note.query(getQuery(), function (response) {
                handleResponse(response)
            });
        } else {
            // todo is called twice
            $scope.$on('event:auth-loginConfirmed', refresh);
        }
    };

    refresh();

    $scope.formatDate = function(date) {
        return moment(parseFloat(date)).format('dddd, DD.MM.YYYY')
    };

    $scope.nextPage = function () {
        if(!$scope.$isLastPage) {
            // todo disable page refresh
            $location.search('page', $scope.currentPage + 1);
        }
    };
    $scope.previousPage = function () {
        if(!$scope.$isFirstPage) {
            // todo disable page refresh
            $location.search('page', $scope.currentPage - 1);
        }
    };

    $scope.search = function() {
        console.log('search', $scope.query);

        $location.search('query', $scope.query);
    };

    $scope.create = function () {
        Note.save($scope.note,
            function () {
                $scope.notes = Note.query();
                $('#saveNoteModal').modal('hide');
                $scope.clear();
                refresh();
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
