define(['durandal/system', 'services/routeconfig','jquery'],
    function (system, routeconfig,$) {
        var brainz = {
            searchArtist:getMatchingArtists,
            findReleases:getArtistReleases
        };
        return brainz;
        function getMatchingArtists(artist){
            return $.get(routeconfig.brainzArtistSearchUrl+artist +'&fmt=json')
            .promise();
        }
       function getArtistReleases(id){
            return $.get(routeconfig.brainzArtistReleaseUrl+id +'&fmt=json')
            .promise();
        }
        
    });