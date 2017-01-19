define(["angularAMD"], function (angularAMD) {

    angularAMD
        .directive("shortList", shortList);

    function shortList() {

        var directive = {
            restrict: "E",
            controller: "shortListController",
            controllerAs: "shortListCtrl",
            scope: {
              data:"="  
            },
            bindToController: true,
            templateUrl: "views/shortListView.html",
            link: link
        };

        return directive;

        function link(scope, el, attr, ctrl) {

        };

    };

});