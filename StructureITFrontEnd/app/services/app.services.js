define(["angularAMD"], function(angularAMD) {

    angularAMD
        .factory("appServices", appServices);

    appServices.$inject = ["$http"];

    function appServices(http) {
        return {
            search:search
        };

        function search(searchString) {
            return http.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+ searchString +"&api_key=5da7bddb48ab37ae43f9ee84f7a71dea&format=json").then(serviceCallSuccess).catch(serviceCallFailure);
        };

        function serviceCallSuccess(response) {
            return response;
        };

        function serviceCallFailure(error) {
            return error;
        }
    }

});