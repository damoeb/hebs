'use strict';

hebsApp.controller('NoteController', function ($scope, $location, $routeParams, $rootScope, Note, User) {

    $scope.query = $location.search().query;
    var page = $location.search().page;

    var userId = $routeParams.userId;

    var getQuery = function () {

        var params = {
            page: page
        };

        if (!$rootScope.authenticated) {
            params['id'] = 'public';
        }

        if (!_.isUndefined($scope.query)) {
            params['query'] = $scope.query;
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


    $scope.init = function() {

        if (_.isUndefined(userId)) {
            // todo error
            console.error('userId is undefined');
            return;
        }

        if (_.isUndefined(page)) {
            $scope.currentPage = 0;
        } else {
            $scope.currentPage = parseInt(page);
        }

        console.log('on page', $scope.currentPage);

        $scope.$isLastPage = true;
        $scope.$isFirstPage = true;

        // suche + pagination
        // ?q=[..]&page=1

        // standard + pagination
        // ?page=1

        console.log('of user "', userId, '"');

        User.get({id: userId}, function() {
            refresh();
        });

    };

    $scope.formatDate = function(date) {
        return moment(parseFloat(date)).format('dddd, DD.MM.YYYY')
    };

    var toQueryString = function (parameters) {
        var queryString = _.reduce(
            parameters,
            function (components, value, key) {
                components.push(key + '=' + encodeURIComponent(value));
                return components;
            },
            []
        ).join('&');
        if (queryString.length > 0) {
            queryString = '?' + queryString;
        }
        return queryString;
    };

    var getPageUrl = function (page) {
        var path = $location.path();
        var search = _.create($location.search());
        search['page'] = page;

        return path + toQueryString(search);
    };

    $scope.nextPageUrl = function () {
        return getPageUrl($scope.currentPage + 1);
    };

    $scope.previousPageUrl = function () {
        return getPageUrl($scope.currentPage - 1);
    };

    var codes = {
        ESC: 27
    };

    $scope.changedQuery = function($event) {

        if($event.keyCode == codes.ESC) {
            $scope.query = ''
        }
        //console.log($event.keyCode);
    };

    $scope.submitQuery = function() {
        console.log('search for', $scope.query);

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
