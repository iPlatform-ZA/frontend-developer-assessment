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
    var shortListKey = "_artistShortList";
    var favouritesKey = "_artistFavourites";
    var favouriteReleasesKey = "_favouriteReleases";

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

    function saveFavouriteReleases(releases) {
        var favouriteReleases = new Array();
        favouriteReleases = copyReleaseItems(getFavouriteReleases(), favouriteReleases);
        favouriteReleases = copyReleaseItems(releases, favouriteReleases);
        persistFavouriteReleases(favouriteReleases);
    };

    return {
        saveFavouriteReleases: saveFavouriteReleases
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

    var mapRelease = function (musicBrainzRelease, artistId) {
        var release = new Release(musicBrainzRelease.id, artistId, musicBrainzRelease.title, ' ', musicBrainzRelease["track-count"], musicBrainzRelease.date);
        if (musicBrainzRelease.hasOwnProperty("label-info")) {
            release.label = musicBrainzRelease["label-info"][0]["label"]["name"];
        }

        return release;
    };

    var mapReleases = function (collection, artistId) {
        var releases = Array();
        for (var i = 0; i < collection.length; i++) {
            var release = mapRelease(collection[i], artistId);
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
        var artistId = $(releaseHtmlElement).attr('value');
        var year = releaseHtmlElement.children[0].textContent;
        var title = releaseHtmlElement.children[1].textContent;
        var label = releaseHtmlElement.children[2].textContent;
        var tracks = releaseHtmlElement.children[3].textContent;
        var release = new Release(id, artistId, title, label, tracks, year);
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

    var musicBrainz = new MusicBrainzAdapter(initialData);
    var objFactory = new objectFactory();
    var storage = new StorageAdapter();

    var searchQuery = ko.observable(undefined);
    var musicSearchResults = ko.observableArray(undefined);
    var releases = ko.observableArray();
    var releaseArtist = ko.observable(undefined);
    var selectedArtistId = ko.observable(undefined);

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

    function onArtistSearchResponse(searchResults) {
        var artists = objFactory.mapArtists(searchResults.artists);
        if (artists.length < 1) {
            toastr.warning("search returned no matches");
            return;
        }
        musicSearchResults(artists);
        toastr.success("search complete");
    };

    function onReleasesResponse(releaseResponse) {
        var results = objFactory.mapReleases(releaseResponse.releases, selectedArtistId());
        releases(results);
        console.log(releases.length);
    };

    function onSearchFailed(errorResponse) {
        musicSearchResults(undefined);
        isGridVisible(false);
        toastr.error(errorResponse.statusText);
    };

    var searchButton = ko.observable();

    searchButton.subscribe(function () {
        resetSearchResults();
        musicBrainz.searchArtists(searchQuery(), onArtistSearchResponse, onSearchFailed);
    });

    function resetSearchResults() {
        musicSearchResults([]);
        releases([]);
        releaseArtist(undefined);
        selectedArtistId(undefined);

    };

    function showArtistReleases() {
        var items = $("#artistSearchGrid .selected");
        if (items.length > 0) {
            var artist = objFactory.artistFromHTML(items[0]);
            resetSearchResults();
            releaseArtist(artist.name);
            selectedArtistId(artist.id);
            musicBrainz.getReleases(artist.id, onReleasesResponse, onSearchFailed);
        }
        else {
            toastr.error("please select an artist from the list to show releases");
        }
    };

    function addReleaseToFavourites() {
        var items = $("#artistReleasesGrid .selected");
        if (items.length > 0) {
            var releases = [];
            items.each(function (index, releaseInHtml) {
                var release = objFactory.parseRelease(releaseInHtml);
                releases.push(release);
                removeReleaseFromSearchList(release.id);
            });
            storage.saveFavouriteReleases(releases);
            toastr.success(releases.length + ' releases added to your favourites');
        }
        else {
            toastr.error("please select one or more releases from the list to add to your favourites");
        }
    };

    function showShortListArtists() {
        alert('switching to short lists');
    };

    var grid = $('#artistSearchGrid').DataTable({
        "searching": false,
        "paging": false,
        "ordering": false,
        "info": false,
        dom: "Bfrtip",
        select: true,
        buttons: [{
            text: 'Show releases',
            action: showArtistReleases
        },
        {
            text: 'My Short list',
            action: function () {
                window.location = initialData.shortListUrl
            }
        }]
    });

    $("#artistSearchGrid tbody").on('click', 'tr', function () {
        var isSelected = $(this).hasClass('selected');
        if ($("#artistSearchGrid tbody tr").hasClass('selected')) {
            $("#artistSearchGrid tbody tr").removeClass('selected');
        }
        if (isSelected) {
            $(this).removeClass('selected');
        }
        else {
            $(this).addClass('selected');
        }
    });

    var releasesGrid = $('#artistReleasesGrid').DataTable({
        "searching": false,
        "paging": false,
        "ordering": false,
        "info": false,
        dom: "Bfrtip",
        select: true,
        buttons: [{
            text: 'Add selected to favourites',
            action: addReleaseToFavourites
        }]
    });

    $("#artistReleasesGrid tbody").on('click', 'tr', function () {
        $(this).toggleClass('selected');
    });

    return {
        searchQuery: searchQuery,
        searchButton: searchButton,
        searchResults: musicSearchResults,
        releases: releases,
        releaseArtist: releaseArtist
    };
};




