/// <reference path="../knockout-3.4.0.js" />
/// <reference path="../knockout.mapping-latest.js" />
/// <reference path="../jquery-1.10.2.js" />
"use strict";

var MusicBrainzAdapter = function (initialData) {

    function applyFormatAndPaging() {
        return "&fmt=" + initialData.dataType;
    };

    function buildQuery(resource, parameter) {
        return "query=" + resource + ":" + parameter;
    };

    var searchArtists = function (artistName, sucessHandler, errorHandler) {
        console.log("invoking MusicBrainz search artist API");
        var query = initialData.musicBrainzBaseUrl + initialData.musicBrainzArtistResource + "/?" + buildQuery(initialData.musicBrainzArtistResource, artistName) + applyFormatAndPaging();

        $.ajax({
            url: query,
            type: "GET",
            success: sucessHandler,
            error: errorHandler
        });
    };

    var getReleases = function (artistId, sucessHandler, errorHandler) {
        console.log("invoking MusicBrainz release lookup API");
        var query = initialData.musicBrainzBaseUrl + initialData.musicBrainzReleaseResource + "/?" + buildQuery("arid", artistId) + "&inc" + initialData.musicBrainzLabelsResource + applyFormatAndPaging();

        $.ajax({
            url: query,
            type: "GET",
            success: sucessHandler,
            error: errorHandler
        });
    };

    return {
        searchArtists: searchArtists,
        getReleases: getReleases
    };
};

var StorageAdapter = function () {
    var favouritesArtistsKey = "_artistFavourites";
    var favouriteReleasesKey = "_favouriteReleases";

    var objFactory = new objectFactory();
    var isStoragedAvailable = typeof (Storage) !== undefined;

    function getFavouriteReleases() {
        if (isStoragedAvailable) {
            var storage = localStorage.getItem(favouriteReleasesKey);
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

    var getFavouriteReleasesByArtists = function (artistId) {
        if (isStoragedAvailable) {
            var results = Array();
            var storage = localStorage.getItem(favouriteReleasesKey);
            if (storage !== null && storage !== undefined) {
                var items = JSON.parse(storage);

                var releases = objFactory.mapReleases(items);
                for (var i = 0; i < releases.length; i++) {
                    if (releases[i].artistId === artistId) {
                        results.push(releases[i]);
                    }
                }
            }
        }
        else {
            toastr.error("local storage not supported in this version of the browser.");
        }
        return results;
    };

    var getFavouriteArtists = function () {
        if (isStoragedAvailable) {
            var storage = localStorage.getItem(favouritesArtistsKey);
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

    function isReleaseInCollection(id, collection) {
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

    function persistFavouriteReleases(collection) {
        if (isStoragedAvailable) {
            localStorage.setItem(favouriteReleasesKey, JSON.stringify(collection));
        }
    };

    function persistFavouriteArtists(collection) {
        if (isStoragedAvailable) {
            localStorage.setItem(favouritesArtistsKey, JSON.stringify(collection));
        }
    };

    function copyReleaseItems(source, destination) {
        if (!Array.isArray(destination)) {
            destination = [];
        }
        if (!Array.isArray(source)) {
            return destination;
        }

        source.forEach(function (item, index) {
            if (!isReleaseInCollection(item.id, destination)) {
                destination.push(item);
            }
        });
        return destination;
    };

    var removeFavouriteReleases = function (releases) {
        var currentReleases = getFavouriteReleases();
        for (var i = 0; i < releases.length; i++) {
            var outter = releases[i];
            for (var x = 0; x < currentReleases.length; x++) {
                var inner = currentReleases[x];
                if (outter.id === inner.id) {
                    currentReleases.splice(x, 1);
                    break;
                };
            }
        }
        persistFavouriteReleases(currentReleases);
    };

    var removeFavouriteArtist = function (artist) {
        var artists = getFavouriteArtists();
        for (var i = 0; i < artists.length; i++) {
            if (artists[i].id === artist.id) {
                artists.splice(i, 1);
            }
        }
        persistFavouriteArtists(artists);
    };

    return {
        getFavouriteArtists: getFavouriteArtists,
        getFavouriteReleasesByArtists: getFavouriteReleasesByArtists,
        removeFavouriteReleases: removeFavouriteReleases,
        removeFavouriteArtist: removeFavouriteArtist
    }
};

function Artist(id, name, url, imageUrl) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.imageUrl = imageUrl;
};

function Release(id, artistId, title, label, tracksCount, year) {
    this.id = id;
    this.artistId = artistId;
    this.title = title;
    this.label = label;
    this.tracksCount = tracksCount;
    this.year = year;
};

var objectFactory = function () {

    var mapArtist = function (musicBrainzObject) {
        if (musicBrainzObject.id === '')
            return;
        var id = musicBrainzObject.id;
        var name = musicBrainzObject.name;
        var artist = new Artist(id, name, '', '');
        return artist;
    };

    var mapRelease = function (musicBrainzRelease) {
        var release = new Release(musicBrainzRelease.id, musicBrainzRelease.artistId, musicBrainzRelease.title, musicBrainzRelease.label, musicBrainzRelease.tracksCount, musicBrainzRelease.year);
        return release;
    };

    var mapReleases = function (collection) {
        var releases = Array();
        for (var i = 0; i < collection.length; i++) {
            var release = mapRelease(collection[i]);
            if (release != undefined) {
                releases.push(release);
            }
        }
        return releases;
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

    var parseRelease = function (releaseHtmlElement) {
        var id = releaseHtmlElement.id;
        var year = releaseHtmlElement.children[0].textContent;
        var title = releaseHtmlElement.children[1].textContent;
        var label = releaseHtmlElement.children[2].textContent;
        var tracks = releaseHtmlElement.children[3].textContent;
        var release = new Release(id, '', title, label, tracks, year);
        return release;
    };

    return {
        mapArtists: mapArtists,
        artistFromHTML: artistFromHTML,
        parseRelease: parseRelease,
        mapReleases: mapReleases
    };
};

var viewModel = function (initialData) {

    var objFactory = new objectFactory();
    var storage = new StorageAdapter();
    var artists = ko.observableArray(objFactory.mapArtists(storage.getFavouriteArtists()));
    var releases = ko.observableArray();
    var selectedArtist = ko.observable();

    //#region dt functions
    function showArtistReleases() {
        releases(undefined);
        selectedArtist(undefined);
        var items = $("#artistsGrid .selected");
        if (items.length == 1) {
            var item = items[0];
            var artist = objFactory.artistFromHTML(item);
            selectedArtist(artist);
            var artistReleases = storage.getFavouriteReleasesByArtists(selectedArtist().id);
            releases(artistReleases);
            toastr.success(selectedArtist().name + ' releases loaded');
        }
    };

    function removeArtistFromFavourites() {
        var artist = extractArtistFromDOM();
        if (artist !== undefined && artist.id !== '' && artist.id !== undefined) {
            storage.removeFavouriteArtist(artist);
            artists(objFactory.mapArtists(storage.getFavouriteArtists()));
            toastr.warning('removed ' + artist.name + ' from your favourites');
            selectedArtist(undefined);
            showArtistReleases();
        }
    };

    function removeReleasesFromFavourites() {
        var releases = extractReleasesFromDOM();
        storage.removeFavouriteReleases(releases);
        releases.forEach(function (release, index, collection) {
            removeReleaseFromSearchList(release.id);
        });
        toastr.success(releases.length + ' releases removed from your favourites');
    };

    function extractArtistFromDOM() {
        var item = $("#artistsGrid .selected")[0];
        var artist = objFactory.artistFromHTML(item);
        return artist;
    };

    function removeReleaseFromSearchList(releaseId) {
        releases().find(function (value, index, travers) {
            if (value === undefined) {
                return;
            }

            if (value.id === releaseId) {
                releases.remove(value);
                return;
            }
        });
    };

    function extractReleasesFromDOM() {
        var items = $("#artistReleasesGrid .selected");
        var releases = [];
        if (items.length > 0) {
            items.each(function (index, releaseInHtml) {
                var release = objFactory.parseRelease(releaseInHtml);
                releases.push(release);
            });
        }
        else {
            toastr.error("please select one or more releases from the list to add to your favourites");
        }
        return releases;
    };

    $('#artistsGrid').DataTable({
        "searching": false,
        "paging": false,
        "ordering": false,
        "info": false,
        dom: "Bfrtip",
        select: true,
        buttons: [{
            text: 'Remove From Favourites',
            action: removeArtistFromFavourites
        }]
    });

    $("#artistsGrid tbody").on('click', 'tr', function () {
        var isSelected = $(this).hasClass('selected');
        if ($("#artistsGrid tbody tr").hasClass('selected')) {
            $("#artistsGrid tbody tr").removeClass('selected');
        }
        if (isSelected) {
            $(this).removeClass('selected');
        }
        else {
            $(this).addClass('selected');
        }

        showArtistReleases();
    });

    $('#artistReleasesGrid').DataTable({
        "searching": false,
        "paging": false,
        "ordering": false,
        "info": false,
        dom: "Bfrtip",
        select: true,
        buttons: [{
            text: 'Remove From Favourites',
            action: removeReleasesFromFavourites
        }]
    });

    $("#artistReleasesGrid tbody").on('click', 'tr', function () {
        $(this).toggleClass('selected');
    });


    //#endregion dt functions

    return {
        artists: artists,
        releases: releases
    };
};




