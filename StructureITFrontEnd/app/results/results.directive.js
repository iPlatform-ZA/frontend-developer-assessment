define(["angularAMD"], function (angularAMD) {

    angularAMD
        .directive("results", results);

    function results() {

        var directive = {
            restrict: "E",
            controller: "resultsController",
            controllerAs: "resultsCtrl",
            scope: {
                data:"="
            },
            bindToController: true,
            templateUrl: "views/resultsView.html",
            link: link
        };

        return directive;

        function link(scope, el, attr, ctrl) {

        };

    };

});