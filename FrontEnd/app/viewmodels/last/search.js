define(['plugins/router', 'durandal/app', 'knockout', 'services/lastfmService', 'jquery', 'toastr', 'bootstrap'],
    function (router, app, ko, last, $, toastr) {
        var fm = {
            activate: activate,
            compositionComplete: compositionComplete,
            artist: ko.observable(''),
            artists: ko.observableArray([]),
            artistsShortListed: ko.observableArray([]),
            searchArtist: searchArtist,
            addShortList: addShortList,
            currentMode: ko.observable('search'),
            changeMode: changeMode,
            favour: favour,
            title: 'last.fm artist search',
            searching: ko.observable(false)
        };
        return fm;
        function activate() {
            fm.artists([]);
            fm.artistsShortListed([]);
        }
        function changeMode() {
            console.log('changing mode');
            var mode = fm.currentMode();
            if (mode == "search")
                fm.currentMode("shortlist");
            else
                fm.currentMode("search");
            toastr.warning("Now showing " + fm.currentMode());
        }
        function favour(data) {
            var fav = localStorage.getItem('favouriteArtists');
            let favourites = []
            if (fav) {
                favourites = JSON.parse(fav);
            }
            var item = { "id": data.id, "name": data.name };
            favourites.push(item);
            var dataToStore = JSON.stringify(favourites);
            localStorage.setItem('favouriteArtists', dataToStore);
            toastr.success(data.name + ' added to the list of favourites. You now have ' + favourites.length + ' favourite artists');
        }

        function compositionComplete() {
            $('[data-toggle="popover"]').popover();
        }
        function addShortList(data) {
            fm.artistsShortListed.push(data);
            toastr.info('Successfully added ' + data.name + ' to short list of artists');
            fm.artists.pop(data);
        }

        function searchArtist() {
            fm.artists([]);
            fm.searching(true);
            var artist = fm.artist();
            last.searchArtist(artist)
                .then(function (data) {
                    if (data && data.results) {
                        var tracks = data.results.artistmatches;
                        ko.utils.arrayForEach(tracks.artist, function (item) {
                            fm.artists.push(item);
                        });
                    }
                    fm.searching(false);

                });
        }
    });