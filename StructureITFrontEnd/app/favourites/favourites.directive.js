define(["angularAMD"], function (angularAMD) {

    angularAMD
        .directive("favourites", favourites);

    function favourites() {

        var directive = {
            restrict: "E",
            controller: "favouritesController",
            controllerAs: "favouritesCtrl",
            bindToController: true,
            templateUrl: "views/favouritesView.html",
            link: link
        };

        return directive;

        function link(scope, el, attr, ctrl) {

        };

    };

});