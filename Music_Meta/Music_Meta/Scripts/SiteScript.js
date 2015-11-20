/// <reference path="jquery-1.9.1.min.js" />
/// <reference path="jquery-1.9.1.intellisense.js" />
/// <reference path="response.min.js" />
/// <reference path="jquery.easing.js" />
/// <reference path="bootstrap.min.js" />

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

//#region Global Objects
var ArtistDetails = [];

var FavoriteArtists = [];
//An object contain the Artist details
function Artist(id, arid, name, commandtext) {
    //ID used for iteration and identification
    this.ID = id;
    //Unique artist id
    this.Arid = arid;
    //Artis name
    this.Name = name;
    //variable which stores the artist's search result li
    this.SearchResult = '';
    //variable which stores the artist's short list li
    this.ShortList = '';
    this.CommandText = commandtext;
    //A function which populates the searchresult property which my be used for DOM generation
    this.PopulateListItem = function () {
        this.SearchResult = '<li><h4>' + this.Name + '</h4><button type="button" onclick="AddToSortedCollection(this)" value="' + this.ID + '" class="btn btn-default">' + this.CommandText + '</button></li>';
    };

    //A function which populates the short list property which maybe used for DOM generation
    this.PopulateShortList = function () {
        this.ShortList = '<li><h4>' + this.Name + '</h4>'
            + '<button onclick="DeleteFavorite(this)" class="Delete" type="button" value="' + this.ID + '">'
            + '<span>'
            + '<i class="glyphicon glyphicon-remove"></i></span></button>'

            + '<button onclick="MarkAsFavorite(this)" class="Favorite" type="button" value="' + this.ID + '" >'
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
        this.SearchResult = '<li><h4>' + this.Title + '</h4><button type="button" onclick="AddToSortedCollection(this)" value="'+ this.ID +'" class="btn btn-default">Show Releases</button></li>';
    };

    this.PopulateReleaseInfo = function () {
        this.ReleaseInfo = '<li><h4>' + this.Year + ' - ' + title + ' - ' + this.Label + ' - ' + trackcount + ' Tracks' + '</h4>'
            + '<button onclick="DeleteFavorite(this)" class="Delete" type="button" value="' + this.ID + '">'
            + '<span>'
            + '<i class="glyphicon glyphicon-remove"></i></span></button>'

            + '<button onclick="MarkAsFavorite(this)" class="Favorite" type="button" value="' + this.ID + '" >'
            + '<span>'
            + '<i class="glyphicon glyphicon-star"></i></span></button>';
    };
}
//#endregion


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

function MarkAsFavorite(e) {
    if ($(e).hasClass('FavoriteGreen')) {
        $(e).removeClass('FavoriteGreen');
        RemoveFavoriteArtist(e.value);
    }
    else {
        $(e).addClass('FavoriteGreen');
        FavoriteArtists.push(ArtistDetails[e.value]);
    }
};

function DeleteFavorite(e) {
    if ($(e).parent().children([2]).hasClass('FavoriteGreen')) {
        RemoveFavoriteArtist(e.value);
    }

    $(e).parent().remove();
};
//#endregion

//#region Releases Search / Results
function SearchRelease(term) {
    //if ($.trim(term)) {
    $('#txtSearchRelease').val('');
    SearchArtistController(term, $('#ReleaseResults'), 'Show releases');
    //SearchReleaseController(term);
    ClearSearch();
    //}
    //else {
    //    Notification("Hi, :)", "Artist name may not be blank. Please enter valid artist name.");
    //}
}

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
                    //foo.PopulateShortList();


                    //var foo = new Artist(i, data.releases[i]["id"], data.artists[i]["name"]);
                    //foo.PopulateListItem();
                    //foo.PopulateShortList();
                    //ArtistDetails.push(foo);
                    //$('#SearchResults').append(foo.SearchResult);
                }
            });

            ShowLoader(0);
            return ReleaseDetails;

            //localStorage.setItem('ReleaseDetails', ReleaseDetails);
        },
        error: function (ex) {
            ShowLoader(0);
            alert("Error could not get data " + ex);
        }
    });
    //alert('Release count: ' + TempReleaseDetail.length);
}
//#endregion

//#region service requests
//function GetArtistDetails(artist) {
//    var URL = "http://musicbrainz.org/ws/2/artist/?query=artist:" + artist + "&fmt=json";

//    $.ajax({
//        url: URL,
//        type: "GET",
//        dataType: "json",
//        success: function (data) {
//            var foo = (data);
//            $.each(obj, function (key, val) {

//            });
//            alert(foo);
//            return foo;
//        },
//        error: function (ex) {
//            alert("Error could not get data " + ex);
//        }
//    });
//}
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

function RemoveFavoriteArtist(index) {
    var temp = [];
    for (var i = 0; i < FavoriteArtists.length; i++) {
        if (FavoriteArtists[i].ID != index) {
            temp.push(FavoriteArtists[i]);
        }
    }

    FavoriteArtists = temp;
    temp = [];
}

function ClearSearch() {
    $('#txtHomeReleaseSearch').val('');
    $('#txtHomeArtistSearch').val('');
    localStorage.setItem('ArtistSearch', '');
    localStorage.setItem('ReleaseSearch', '');
}
//#endregion


