define(['plugins/router', 'durandal/app', 'knockout', 'services/brainzService', 'jquery', 'toastr', 'bootstrap'],
    function (router, app, ko, brainz, $, toastr) {
        var brains = {
            activate: activate,
            artist: ko.observable(''),
            artists: ko.observableArray([]),
            searchArtist: findArtist,
            title: 'Brainz Music artist search',
            searching: ko.observable(false)

        };
        return brains;
        function activate() {
            brains.artists([]);
        }

        function findArtist() {
            brains.artists([]);
            brains.searching(true);
            var artist = brains.artist();
            brainz.searchArtist(artist)
                .then(function (data) {
                    if (data && data.artists) {
                        var artists = data.artists;
                        ko.utils.arrayForEach(artists, function (item) {
                            item.url = '#brainz/release/' + item.id;
                            brains.artists.push(item);
                        });
                    }
                    brains.searching(false);

                });
        }

    });