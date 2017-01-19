define(["angularAMD"], function(angularAMD) {

    angularAMD
        .controller("mainContainerController", mainContainerController);

    mainContainerController.$inject = ["$scope"];

    function mainContainerController(scope) {
        var vm = this;
        vm.shortList = [];
        vm.favourites = [];

        $("#menuFavourites").bind("click", function() {
            $("last-fm").hide();
            $("music-brainz").hide();
            $("favourites").show();
            $("results").hide();
        });

        $("#menuLastFM").bind("click", function() {
            $("last-fm").show();
            $("music-brainz").hide();
            $("favourites").hide();
            $("results").hide();
        });

        $("#menuMusicBrainz").bind("click", function() {
            $("last-fm").hide();
            $("music-brainz").show();
            $("favourites").hide();
            $("results").hide();
        });
    };

});