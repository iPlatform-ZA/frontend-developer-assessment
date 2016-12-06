define(['plugins/router', 'durandal/app', 'knockout', 'services/dashboardService','jquery'],
    function (router, app, ko, dashboard, $) {
    var dashed = {
        activate:activate,
        topTracks:ko.observableArray([]),
        title:'Top 20 Tracks'
    };
    return dashed;
    function activate() {
        dashed.topTracks([]);
        dashboard.getTopTracks(20)
        .then(function(data){
            var tracks=data.tracks;
               ko.utils.arrayForEach(tracks.track, function (item) {
                dashed.topTracks.push(item);
            });
        });
    }
});