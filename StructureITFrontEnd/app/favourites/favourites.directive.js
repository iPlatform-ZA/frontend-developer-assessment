define(["angularAMD"], function (angularAMD) {

    angularAMD
        .directive("favourites", favourites);

    function favourites() {

        var directive = {
            restrict: "E",
            controller: "favouritesController",
            controllerAs: "favouritesCtrl",
            bindToController: true,
            scope: {
                data:"="
            },
            templateUrl: "views/favouritesView.html",
            link: link
        };

        return directive;

        function link(scope, el, attr, ctrl) {

        };

    };

});