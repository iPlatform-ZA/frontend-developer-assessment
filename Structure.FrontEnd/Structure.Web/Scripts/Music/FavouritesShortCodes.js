/// <reference path="../knockout-3.4.0.js" />
/// <reference path="../knockout.mapping-latest.js" />
/// <reference path="../jquery-1.10.2.js" />
"use strict";
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

    var getFavouriteListArtists = function () {
        if (isStoragedAvailable) {
            var storage = localStorage.getItem(favouritesKey);
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

    var persistFavouriteList = function (collection) {
        if (isStoragedAvailable) {
            localStorage.setItem(favouritesKey, JSON.stringify(collection));
        }
    };

    var removeArtistFromShortList = function (artistId) {
        var shortListArtists = getShortListArtists();
        if (isArtistInCollection(artistId, shortListArtists)) {
            for (var i = 0; i < shortListArtists.length; i++) {
                if (shortListArtists[i].id === artistId) {
                    shortListArtists.splice(i, 1);
                }
            }
            persistShortList(shortListArtists);
        }
    };

    var saveArtist = function (artist) {
        var favouriteArtists = getFavouriteListArtists();
        var shortListArtists = getShortListArtists();
        removeArtistFromShortList(artist.id);
        if (isArtistInCollection(artist.id, favouriteArtists)) {
            return;
        }
        favouriteArtists.push(artist);
        persistFavouriteList(favouriteArtists);
    };

    return {
        saveArtistToFavouriteList: saveArtist,
        getArtistShortList: getShortListArtists
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
        var name = $(htmlElement.children[0]).text();
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

    var objFactory = new objectFactory();
    var storage = new StorageAdapter();

    var artistsShortList = ko.observableArray(storage.getArtistShortList());

    function addArtistsToFavourites(artist) {
        storage.saveArtistToFavouriteList(artist);
        artistsShortList(storage.getArtistShortList());
        toastr.success('artist added to your favourites');

    }

    function extractArtistFromDOM() {
        var items = $("#ArtistsShortListGrid .selected");
        items.each(function (index, artist) {
            var artist = objFactory.artistFromHTML(artist);
            if (artist !== undefined && artist.id !== '' && artist.id !== undefined) {
                toastr.success('adding ' + artist.name + ' to favourites');
                addArtistsToFavourites(artist);
            }
        });
    };

    function showShortListArtists() {
        alert('switching to short lists');
    };

    var grid = $('#ArtistsShortListGrid').DataTable({
        "searching": false,
        "paging": false,
        "ordering": false,
        "info": false,
        dom: "Bfrtip",
        select: true,
        buttons: [{
            text: 'Add selected to favourites',
            action: extractArtistFromDOM
        },
        {
            text: 'Back to artist search',
            action: function () {
                window.location = initialData.artistSearch
            }
        }]
    });

    $("#ArtistsShortListGrid tbody").on('click', 'tr', function () {
        $(this).toggleClass('selected');
    });

    return {
        artistList: artistsShortList
    };
};




