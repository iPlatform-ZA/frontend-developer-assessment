define(["angularAMD"], function (angularAMD) {

    angularAMD
        .directive("musicBrainz", musicBrainz);

    function musicBrainz() {

        var directive = {
            restrict: "E",
            controller: "musicBrainzController",
            controllerAs: "musicBrainzCtrl",
            bindToController: true,
            templateUrl: "views/musicbrainzView.html",
            link: link
        };

        return directive;

        function link(scope, el, attr, ctrl) {

        };

    };

});