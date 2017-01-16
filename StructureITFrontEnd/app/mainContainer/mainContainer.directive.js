define(["angularAMD"], function(angularAMD) {

    angularAMD
        .directive("mainContainer", mainContainer);

    function mainContainer() {

        var directive = {
            restrict: "E",
            controller: "mainContainerController",
            controllerAs: "mainContainerCtrl",
            bindToController: true,
            templateUrl: "views/mainContainerView.html",
            link: link
        };

        return directive;

        function link(scope, el, attr, ctrl) {

        };

    };

});