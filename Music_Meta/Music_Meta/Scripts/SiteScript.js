/// <reference path="jquery-1.9.1.min.js" />
/// <reference path="jquery-1.9.1.intellisense.js" />
/// <reference path="response.min.js" />
/// <reference path="jquery.easing.js" />
/// <reference path="bootstrap.min.js" />

//#region Global Objects
var ArtistDetails = [];
var ReleaseDetails = [];

var FavoriteArtists = [];
var FavoriteReleases = [];

//An object contain the Artist details
function Artist(id, arid, name, commandtext) {
    //ID used for iteration and identification
    this.ID = id;
    //Unique artist id
    this.Arid = arid;
    //Artist name
    this.Name = name;
    //variable which stores the artist's search result li
    this.SearchResult = '';
    //variable which stores the artist's short list li
    this.ShortList = '';
    this.CommandText = commandtext;
    //A function which populates the search result property which my be used for DOM generation
    this.PopulateListItem = function () {
        this.SearchResult = '<li><h4>' + this.Name + '</h4><button type="button" onclick="AddToSortedCollection(this)" value="' + this.ID + '" class="btn btn-default">' + this.CommandText + '</button></li>';
    };

    //A function which populates the short list property which maybe used for DOM generation
    this.PopulateShortList = function () {
        this.ShortList = '<li><h4>' + this.Name + '</h4>'
            + '<button onclick="DeleteFavoriteArtist(this)" class="Delete" type="button" value="' + this.ID + '">'
            + '<span>'
            + '<i class="glyphicon glyphicon-remove"></i></span></button>'

            + '<button onclick="AddFavoriteArtist(this)" class="Favorite" type="button" value="' + this.ID + '" >'
            + '<span>'
            + '<i class="glyphicon glyphicon-star"></i></span></button>';
    };
};

function Release(id, year, title, label, trackcount, reid, arid) {
    this.ID = id;
    //unique artist id
    this.Arid = arid;
    //unique release id
    this.Reid = reid;
    this.Year = year;
    this.Title = title;
    this.Label = label;
    this.TrackCount = trackcount;

    this.SearchResult = '';
    this.ReleaseInfo = '';

    this.PopulateSearchResult = function () {
        this.SearchResult = '<li><h4>' + this.Title + '</h4><button type="button" onclick="AddToSortedCollection(this)" value="' + this.ID + '" class="btn btn-default">Show Releases</button></li>';
    };

    this.PopulateReleaseInfo = function () {
        this.ReleaseInfo = '<li><h4>' + this.Year + ' - ' + title + ' - ' + this.Label + ' - ' + trackcount + ' Tracks' + '</h4>'
            + '<button onclick="DeleteFavoriteRelease(this)" class="Delete" type="button" value="' + this.ID + '">'
            + '<span>'
            + '<i class="glyphicon glyphicon-remove"></i></span></button>'

            + '<button onclick="AddFavoriteRelease(this)" class="Favorite" type="button" value="' + this.ID + '" >'
            + '<span>'
            + '<i class="glyphicon glyphicon-star"></i></span></button>';
    };
}
//#endregion

$(document).ready(function (e) {

});

function ArtistLoad() {
    var term = localStorage.getItem('ArtistSearch');
    if (term) {
        SearchArtist(term);
    }
}

function ReleaseLoad() {
    var term = localStorage.getItem('ReleaseSearch');
    if (term) {
        SearchRelease(term);
    }
}

function FavoritesLoad() {
    FavoriteArtists = $.parseJSON(localStorage.getItem('FavoriteArtists'));
    FavoriteReleases = $.parseJSON(localStorage.getItem('FavoriteReleases'));

    if (FavoriteArtists != null) {
        for (var i = 0; i < FavoriteArtists.length; i++) {
            $('#ArtistFavorite').append(FavoriteArtists[i].ShortList);
        };

        var lis = $('#ArtistFavorite li button');
        lis.each(function (i, e) {
            if ($(e).hasClass('Favorite')) {
                $(e).addClass('FavoriteGreen');
            }
        });
    }

    if (FavoriteReleases != null) {
        for (var i = 0; i < FavoriteReleases.length; i++) {
            $('#ReleasesFavorite').append(FavoriteReleases[i].ReleaseInfo);
        };

        var lis = $('#ReleasesFavorite li button');
        lis.each(function (i, e) {
            if ($(e).hasClass('Favorite')) {
                $(e).addClass('FavoriteGreen');
            }
        });
    }
}

//#region control events
//#region Artists Search / Results
function SearchArtist(term) {
    if ($.trim(term)) {
        $('#txtArtistSearch').val('');
        SearchArtistController(term, $('#SearchResults'), 'Add to short list');
        ClearSearch();
    }
    else {
        Notification("Hi, :)", "Artist name may not be blank. Please enter valid artist name.");
    }
}

function ArtistHomeSearch(e, term) {
    //e.preventDefault();

    if ($.trim(term)) {
        localStorage.setItem("ArtistSearch", term);
        window.location.href = 'Artist.html';
    }
    else {
        Notification("Hi, :)", "Artist name may not be blank. Please enter valid artist name.");
    }
}

function ReleaseHomeSearch(e, term) {
    //e.preventDefault();

    if ($.trim(term)) {
        localStorage.setItem("ReleaseSearch", term, 'Add to short list');
        window.location.href = 'Release.html';
    }
    else {
        Notification("Hi, :)", "Artist name may not be blank. Please enter valid artist name.");
    }
}

function AddToSortedCollection(e) {

    if (e != null || e != undefined) {
        switch (e.innerText) {
            case 'Show releases': {
                //Clear
                $('#ReleaseDetails').empty();
                //localStorage.removeItem('ReleaseDetails');

                //get release info per arid
                SearchReleaseController(ArtistDetails[e.value].Arid);

            }
                break;
            case 'Add to short list': {
                $('#ArtistShortList').append(ArtistDetails[e.value].ShortList);
            }
                break;
        }
    }
};

//Adds/removes favorite class to button, removes from collection and adds to local storage of an artist
function AddFavoriteArtist(e) {
    if ($(e).hasClass('FavoriteGreen')) {
        $(e).removeClass('FavoriteGreen');
        FavoriteArtists = RemoveItemFromCollection(FavoriteArtists, e.value);
    }
    else {
        $(e).addClass('FavoriteGreen');
        FavoriteArtists.push(ArtistDetails[e.value]);
    }

    localStorage.setItem('FavoriteArtists', JSON.stringify(FavoriteArtists));
};

//Adds/removes favorite class to button, removes from collection and adds to local storage of a Release
function AddFavoriteRelease(e) {
    if ($(e).hasClass('FavoriteGreen')) {
        $(e).removeClass('FavoriteGreen');
        FavoriteReleases = RemoveItemFromCollection(FavoriteReleases, e.value);
    }
    else {
        $(e).addClass('FavoriteGreen');
        FavoriteReleases.push(ReleaseDetails[e.value]);
    }

    localStorage.setItem('FavoriteReleases', JSON.stringify(FavoriteReleases));
};

function DeleteFavoriteArtist(e) {
    if ($(e).parent().children([2]).hasClass('FavoriteGreen')) {
        FavoriteArtists = RemoveItemFromCollection(FavoriteArtists, e.value);
    }

    $(e).parent().remove();
    localStorage.setItem('FavoriteArtists', JSON.stringify(FavoriteArtists));
};

function DeleteFavoriteRelease(e) {
    if ($(e).parent().children([2]).hasClass('FavoriteGreen')) {
        FavoriteReleases = RemoveItemFromCollection(FavoriteReleases, e.value);
    }

    $(e).parent().remove();
    localStorage.setItem('FavoriteReleases', JSON.stringify(FavoriteReleases));
}
//#endregion

//#region Releases Search / Results
function SearchRelease(term) {
    if ($.trim(term)) {
        $('#txtSearchRelease').val('');
        SearchArtistController(term, $('#ReleaseResults'), 'Show releases');
        ClearSearch();
    }
    else {
        Notification("Hi, :)", "Artist name may not be blank. Please enter valid artist name.");
    }
}

//#endregion
//#endregion

//#region Service Controllers
function SearchArtistController(artist, targetedul, commandtext) {
    ArtistDetails = [];

    ShowLoader(1);
    $(targetedul).empty();

    var URL = "http://musicbrainz.org/ws/2/artist/?query=artist:" + artist + "&fmt=json";

    $.ajax({
        url: URL,
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (key, val) {
                for (var i = 0; i < data.artists.length; i++) {
                    var foo = new Artist(i, data.artists[i]["id"], data.artists[i]["name"], commandtext);
                    foo.PopulateListItem();
                    foo.PopulateShortList();
                    ArtistDetails.push(foo);
                    $(targetedul).append(foo.SearchResult);
                }
            });

            ShowLoader(0);
        },
        error: function (ex) {
            alert("Error could not get data " + ex);
            ShowLoader(0);
        }
    });
};

function SearchReleaseController(arid) {
    ReleaseDetails = [];
    ShowLoader(1);
    var URL = "http://musicbrainz.org/ws/2/release/?query=arid:" + arid + "&fmt=json";

    $.ajax({
        url: URL,
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (key, val) {
                for (var i = 0; i < data.releases.length; i++) {

                    var date = '';
                    var title = '';
                    var label = '';
                    var trackcount = '';
                    var reid = '';
                    var arid = '';

                    try {
                        date = data.releases[i].date;
                    } catch (e) {
                        date = 'No Date';
                    }

                    try {
                        title = data.releases[i].title;
                    } catch (e) {
                        title = 'No Title';
                    }

                    try {
                        label = data.releases[i]["label-info"][0].label.name;
                    } catch (e) {
                        label = 'No Label';
                    }

                    try {
                        trackcount = data.releases[i]["track-count"];
                    } catch (e) {
                        trackcount = '0';
                    }

                    try {
                        reid = data.releases[i].id;
                    } catch (e) {
                        reid = 'No id';
                    }

                    try {
                        arid = data.releases[i]["artist-credit"][0].artist.id;
                    } catch (e) {
                        arid = 'No id';
                    }

                    var temp = new Release(i, date, title, label, trackcount, reid, arid);
                    temp.PopulateSearchResult();
                    temp.PopulateReleaseInfo();
                    ReleaseDetails.push(temp);
                    $('#ReleaseDetails').append(temp.ReleaseInfo);
                }
            });

            ShowLoader(0);
        },
        error: function (ex) {
            ShowLoader(0);
            alert("Error could not get data " + ex);
        }
    });
}
//#endregion

//#region Helper Functions
function Notification(title, message) {
    $('#MessageHeader').html(title);
    $('#pMessage').html(message);
    $('#NotificationDialog').modal().show();
}

function NavigateToControl(targetid) {
    if (targetid != '') {
        $('html, body').stop().animate({
            scrollTop: $(targetid).offset().top
        }, 1500, 'easeInOutExpo');
    }
}

function ShowLoader(IsVisible) {
    if (IsVisible) {
        $('#Loader').css('visibility', 'visible');
    }
    else {
        $('#Loader').css('visibility', 'hidden');
    }
}

function RemoveItemFromCollection(arr, index) {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].ID != index) {
            temp.push(arr[i]);
        }
    }

    arr = temp;
    return temp;
}

function ClearSearch() {
    $('#txtHomeReleaseSearch').val('');
    $('#txtHomeArtistSearch').val('');
    localStorage.setItem('ArtistSearch', '');
    localStorage.setItem('ReleaseSearch', '');
}
//#endregion


