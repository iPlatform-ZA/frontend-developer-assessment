define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("favouritesController", favouritesController);

    favouritesController.$inject = ["$scope"];

    function favouritesController(scope) {
        var vm = this;

        vm.showReleases = function(favourite) {
            if (favourite.show) {
                favourite.show = false;
                $("#favDel" + favourite.listeners + favourite.artistId).text("Show Releases");
            } else {

                favourite.show = true;
                $("#favDel" + favourite.listeners + favourite.artistId).text("Hide Releases");
            }
        };

        vm.removeFavourite = function (favourite) {

            var indexToRemove = -1;

            $.each(scope.$root.mainContainerCtrl.favourites, function (ref, value) {
                if ((favourite.artistId + favourite.listeners) == (value.artistId + value.listeners)) {
                    indexToRemove = ref;
                }
            });

            if (indexToRemove != -1) {
                scope.$root.mainContainerCtrl.favourites.splice(indexToRemove, 1);
            }

            
        };

    };

});