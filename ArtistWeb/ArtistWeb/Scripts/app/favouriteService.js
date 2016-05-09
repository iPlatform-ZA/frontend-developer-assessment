
angular
    .module("ArtistWeb")
    .service("favouriteService",
        function () {

            return ({
                getFavouriteArtists: getFavouriteArtists,
                saveFavouriteArtists: saveFavouriteArtists,
                addFavouriteArtist: addFavouriteArtist,
                containsArtist: containsArtist,

                getFavouriteReleases: getFavouriteReleases,
                saveFavouriteReleases: saveFavouriteReleases,
                addFavouriteRelease: addFavouriteRelease,
                containsRelease: containsRelease
            });

            function getFavouriteArtists() {
                var favouriteAritsts = JSON.parse(localStorage.getItem("favouriteAritsts"));

                if (favouriteAritsts === null) {
                    favouriteAritsts = [];

                    saveFavouriteArtists(favouriteAritsts);
                }

                return favouriteAritsts;
            }

            function saveFavouriteArtists(favouriteAritsts) {
                localStorage.setItem("favouriteAritsts", JSON.stringify(favouriteAritsts));
            }

            function addFavouriteArtist(artist) {
                var favouriteAritsts = getFavouriteArtists();

                if (!containsArtist(artist.mbid)) {
                    favouriteAritsts.push(artist);
                }

                saveFavouriteArtists(favouriteAritsts);
            }

            function containsArtist(mbid) {
                var favouriteAritsts = getFavouriteArtists();
                var found = false;

                for (var i = 0; i < favouriteAritsts.length; i++) {
                    if (favouriteAritsts[i].mbid == mbid) {
                        found = true;
                        break;
                    }
                }

                return found;
            }

            function getFavouriteReleases() {
                var favouriteReleases = JSON.parse(localStorage.getItem("favouriteReleases"));

                if (favouriteReleases === null) {
                    favouriteReleases = [];

                    saveFavouriteArtists(favouriteReleases);
                }

                return favouriteReleases;
            }

            function saveFavouriteReleases(favouriteReleases) {
                localStorage.setItem("favouriteReleases", JSON.stringify(favouriteReleases));
            }

            function addFavouriteRelease(release) {
                var favouriteReleases = getFavouriteReleases();

                if (!containsRelease(release.id)) {
                    favouriteReleases.push(release);
                }

                saveFavouriteReleases(favouriteReleases);
            }

            function containsRelease(releaseId) {
                var favouriteReleases = getFavouriteReleases();
                var found = false;

                for (var i = 0; i < favouriteReleases.length; i++) {
                    if (favouriteReleases[i].id == releaseId) {
                        found = true;
                        break;
                    }
                }

                return found;
            }
        });
