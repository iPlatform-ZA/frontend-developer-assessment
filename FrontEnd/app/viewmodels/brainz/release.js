define(['plugins/router', 'durandal/app', 'knockout', 'services/brainzService', 'jquery', 'toastr', 'moment', 'bootstrap'],
    function (router, app, ko, brainz, $, toastr, moment) {
        var brains = {
            activate: activate,
            releases: ko.observableArray([]),
            title: 'Brainz Music artist releases',
            favour: favour,
            moment: moment

        };
        return brains;
        function activate(id) {
            brains.releases([]);
            findArtistReleases(id);
        }

        function findArtistReleases(id) {
            brainz.findReleases(id)
                .then(function (data) {
                    if (data && data.releases) {
                        var releases = data.releases;
                        ko.utils.arrayForEach(releases, function (item) {
                            let r = {
                                id: item.id,
                                title: item.title,
                                year: moment(item.date).year(),
                                tracks: item["track-count"],
                                label: null
                            }
                            if (item["label-info"] != null && item["label-info"].length > 0) {
                                let labelitem = item["label-info"][0]["label"]
                                r.label = labelitem["name"]
                            }
                            brains.releases.push(r);
                        });
                    }
                });
        }
        function favour(data) {
            var fav = localStorage.getItem('favouriteReleases');
            let favourites = []
            if (fav) {
                favourites = JSON.parse(fav);
            }
            var item = { "id": data.id, "title": data.title };
            favourites.push(item);
            var dataToStore = JSON.stringify(favourites);
            localStorage.setItem('favouriteReleases', dataToStore);
            toastr.success(data.title + ' added to the list of favourites. You now have ' + favourites.length + ' favourite releases');
        }
    });