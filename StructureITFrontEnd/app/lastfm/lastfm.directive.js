define(["angularAMD"], function (angularAMD) {

    angularAMD
        .directive("lastFm", lastFm);

    function lastFm() {

        var directive = {
            restrict: "E",
            controller: "lastFMController",
            controllerAs: "lastFMCtrl",
            bindToController: true,
            templateUrl: "views/lastfmview.html",
            link: link
        };

        return directive;

        function link(scope, el, attr, ctrl) {

        };

    };

});