define(['durandal/system', 'services/routeconfig','jquery'],
    function (system, routeconfig,$) {
        var dashed = {
            getTopTracks:getTopTracks
        };
        return dashed;
        function getTopTracks(count){
            return $.get(routeconfig.lastfmTopTracks)
            .promise();
        }
    });
