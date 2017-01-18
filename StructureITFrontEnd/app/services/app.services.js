define(["angularAMD"], function(angularAMD) {

    angularAMD
        .factory("appServices", appServices);

    appServices.$inject = ["$http"];

    function appServices(http) {
        return {
            search: search,
            getReleaseData: getReleaseData,
            getArtistViaMusicBrainz: getArtistViaMusicBrainz
        };

        function search(searchString) {
            return http.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+ searchString +"&api_key=5da7bddb48ab37ae43f9ee84f7a71dea&format=json").then(serviceCallSuccess).catch(serviceCallFailure);
        };

        function getReleaseData(searchstring) {
            return http.get("http://musicbrainz.org/ws/2/release/?query=arid:" + searchstring, {
                headers: {
                    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
                }
            }).then(serviceCallSuccess).catch(serviceCallFailure);
        }

        function getArtistViaMusicBrainz(searchstring) {
            return http.get("http://musicbrainz.org/ws/2/artist/?query=artist:" + searchstring, {
                headers: {
                    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
                }
            }).then(serviceCallSuccess).catch(serviceCallFailure);
        }

        function serviceCallSuccess(response) {
            return response;
        };

        function serviceCallFailure(error) {
            return error;
        }
    }

});