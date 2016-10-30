/// <reference path="../knockout-3.4.0.js" />
/// <reference path="../knockout.mapping-latest.js" />
/// <reference path="../jquery-1.10.2.js" />
"use strict";
var LastFMAdapter = function (initialData) {

    var searchArtists = function (artistName, sucessHandler, errorHandler) {
        console.log("calling last fm API");
        var query = initialData.lastFmBaseUrl + "?method=" + initialData.lastFMSearchMethod + "&artist=" +
            artistName + "&api_key=" + initialData.lastFMAPIKey + "&format=" +
            initialData.lastFMDataFormat + "&limit=10";

        $.ajax({
            url: query,
            type: "GET",
            success: sucessHandler,
            error: errorHandler
        });
    };

    return {
        searchArtists: searchArtists
    };
};

var StorageAdapter = function () {
    var shortListKey = "_artistShortList";
    var favouritesKey = "_artistFavourites";

    var isStoragedAvailable = typeof (Storage) !== undefined;

    var getShortListArtists = function () {
        if (isStoragedAvailable) {
            var storage = localStorage.getItem(shortListKey);
            if (storage !== null && storage !== undefined) {
                var items = JSON.parse(storage);
                return items;
            }
        }
        else {
            toastr.error("local storage not supported in this version of the browser.");
        }
        return [];
    };

    var isArtistInCollection = function (id, collection) {
        if (collection.length < 0) {
            return false;
        }

        for (var i = 0; i < collection.length; i++) {
            if (collection[i].id === id) {
                return true;
            }
        }
        return false;
    };

    var persistShortList = function (collection) {
        if (isStoragedAvailable) {
            localStorage.setItem(shortListKey, JSON.stringify(collection));
        }
    };

    var saveArtist = function (artist) {
        var shortLists = getShortListArtists();
        if (isArtistInCollection(artist.id, shortLists)) {
            return;
        }
        shortLists.push(artist);
        persistShortList(shortLists);
    };

    return {
        saveArtistToShortList: saveArtist
    }
};

function Artist(id, name, url, imageUrl) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.imageUrl = imageUrl;
};

var objectFactory = function () {

    var mapArtist = function (lastfmObject) {
        if (lastfmObject.mbid === '')
            return;

        var id = lastfmObject.mbid;
        var name = lastfmObject.name;
        var url = lastfmObject.url;
        var imageUrl = lastfmObject.image[0]['#text'];
        var artist = new Artist(id, name, url, imageUrl);
        return artist;
    };

    var mapArtists = function (collection) {
        var artists = Array();
        for (var i = 0; i < collection.length; i++) {
            var artist = mapArtist(collection[i]);
            if (artist !== undefined) {
                artists.push(artist);
            }
        }
        return artists;
    };

    var artistFromHTML = function (htmlElement) {
        var id = htmlElement.id;
        var name = $(htmlElement.children[1]).text();
        var imageUrl = '';
        var url = '';
        var artist = new Artist(id, name, url, imageUrl);
        return artist;
    };

    return {
        mapArtists: mapArtists,
        artistFromHTML: artistFromHTML
    };
};

var viewModel = function (initialData) {

    var lastfmAdapter = new LastFMAdapter(initialData);
    var objFactory = new objectFactory();
    var storage = new StorageAdapter();

    var searchQuery = ko.observable(undefined);
    var lastfmSearchResults = ko.observableArray(undefined);

    function removeArtistFrom(artistId) {
        lastfmSearchResults().find(function (value, index, trav) {
            if (value === undefined) {
                return;
            }
            if (value.id === artistId) {
                lastfmSearchResults.remove(value);
                return;
            }
        });
    };

    var onLastFmSearchResults = function (searchResults) {
        lastfmSearchResults(undefined);
        var artists = objFactory.mapArtists(searchResults.results.artistmatches.artist);
        if (artists.length < 1) {
            toastr.warning("search returned no matches");
            return;
        }
        lastfmSearchResults(undefined);
        lastfmSearchResults(artists);
        toastr.success("search complete");
    };

    var onLastFmSearchError = function (errorResponse) {
        lastfmSearchResults(undefined);
        isGridVisible(false);
        toastr.error(errorResponse.responseJSON.message);
    };

    var searchButton = ko.observable();

    searchButton.subscribe(function () {
        lastfmAdapter.searchArtists(searchQuery(), onLastFmSearchResults, onLastFmSearchError);
    });

    function addArtistsToShortList(artist) {
        storage.saveArtistToShortList(artist);
        toastr.success('artist added to short list');
        removeArtistFrom(artist.id);
    }

    function extractArtistFromDOM() {
        var items = $("#artistSearchGrid .selected");
        items.each(function (index, artist) {
            var artist = objFactory.artistFromHTML(artist);
            if (artist !== undefined && artist.id !== '' && artist.id !== undefined) {
                addArtistsToShortList(artist);
            }
        });
    };

    var grid = $('#artistSearchGrid').DataTable({
        "searching": false,
        "paging": false,
        "ordering": false,
        "info": false,
        dom: "Bfrtip",
        select: true,
        buttons: [{
            text: 'Add selected to short list',
            action: extractArtistFromDOM
        },
        {
            text: 'My Short list',
            action: function () {
                window.location = initialData.shortListUrl
            }
        }]
    });

    $("#artistSearchGrid tbody").on('click', 'tr', function () {
        $(this).toggleClass('selected');
    });

    return {
        searchQuery: searchQuery,
        searchButton: searchButton,
        searchResults: lastfmSearchResults
    };
};




