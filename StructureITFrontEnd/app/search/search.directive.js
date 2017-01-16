define(["angularAMD"], function (angularAMD) {

    angularAMD
        .directive("search", search);

    function search() {

        var directive = {
            restrict: "E",
            controller: "searchController",
            controllerAs: "searchCtrl",
            bindToController: true,
            templateUrl: "views/searchView.html",
            link: link
        };

        return directive;

        function link(scope, el, attr, ctrl) {

        };

    };

});