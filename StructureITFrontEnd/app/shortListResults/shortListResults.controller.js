define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("shortListResultsController", shortListResultsController);

    shortListResultsController.$inject = ["$scope"];

    function shortListResultsController(scope) {
        var vm = this;

        vm.addToFavourites = function (artist) {
            var indexToRemove = -1;
            $.each(scope.$root.mainContainerCtrl.favourites, function (ref, value) {
                if ((value.listeners + value.artistId) === (artist.listeners + artist.mbid)) {
                    indexToRemove = ref;
                }
            });

            if (indexToRemove !== -1) {
                scope.$root.mainContainerCtrl.favourites.splice(indexToRemove, 1);
                
                
                $("#favIcon" + artist.listeners + artist.mbid).removeClass("glyphicon-star");
                $("#favIcon" + artist.listeners + artist.mbid).addClass("glyphicon-star-empty");
            } else {
                scope.$root.mainContainerCtrl.favourites.push({
                    artistId: artist.mbid,
                    name: artist.name,
                    listeners: artist.listeners,
                    show:false,
                    releases:[]
                });
                $("#favIcon" + artist.listeners + artist.mbid).removeClass("glyphicon-star-empty");
                $("#favIcon" + artist.listeners + artist.mbid).addClass("glyphicon-star");
            }

            

        };
    };

});