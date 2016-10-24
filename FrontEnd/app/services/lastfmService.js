define(['durandal/system', 'services/routeconfig','jquery'],
    function (system, routeconfig,$) {
        var lasty = {
            searchArtist:getMatchingArtists
        };
        return lasty;
        function getMatchingArtists(artist){
            return $.get(routeconfig.lastfmArtistSearchUrl+'&artist='+artist)
            .promise();
        }
    });