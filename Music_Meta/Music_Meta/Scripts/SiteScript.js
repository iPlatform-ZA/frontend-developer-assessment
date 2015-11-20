/// <reference path="jquery-1.9.1.min.js" />
/// <reference path="jquery-1.9.1.intellisense.js" />
/// <reference path="response.min.js" />
/// <reference path="jquery.easing.js" />
/// <reference path="bootstrap.min.js" />

$(document).ready(function (e) {

});

function ArtistLoad() {
    $('#txtArtistSearch').val(localStorage.getItem('ArtistSearch'));
    //$('#txtArtistSearch').val('In Flames');
    SearchArtist($('#txtArtistSearch').val());

}

var ArtistDetails = [];
var FavoriteArtists = [];

function Artist(id, arid, name) {
    this.ID = id;
    this.Arid = arid;
    this.Name = name;
    this.SearchResult = '';
    this.ShortList = '';

    this.PopulateListItem = function () {
        this.SearchResult = '<li><h4>' + this.Name + '</h4><button type="button" onclick="AddToShortList(this)" value="' + this.ID + '" class="btn btn-default">Add To Short List</button></li>';
    };

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

//#region control events
function SearchArtist(term) {
    if (term) {
        ShowLoader(1);
        $('#SearchResults').empty();
        SearchArtistController(term);
        ClearSearch();
    }
}

$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$(function () {
    $('#aHeaderSearch').click(function (e) {

        e.preventDefault();

        var search = $("#txtHeaderSearch").val();

        if ($.trim(search)) {
            localStorage.setItem("ArtistSearch", $("#txtHeaderSearch").val());
            window.location.href = 'Artist.html';
        }
        else {
            Notification("Hi, :)", "Artist name may not be blank. Please enter valid artist name.");
        }
    })
});

function AddToShortList(e) {
    $('#ArtistShortList').append(ArtistDetails[e.value].ShortList);
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

//#region Service Controllers
function SearchArtistController(artist) {
    ArtistDetails = [];

    var URL = "http://musicbrainz.org/ws/2/artist/?query=artist:" + artist + "&fmt=json";

    $.ajax({
        url: URL,
        type: "GET",
        dataType: "json",
        success: function (data) {
            //var foo = JSON.parse(data);

            $.each(data, function (key, val) {
                for (var i = 0; i < data.artists.length; i++) {
                    var foo = new Artist(i, data.artists[i]["id"], data.artists[i]["name"]);
                    foo.PopulateListItem();
                    foo.PopulateShortList();
                    ArtistDetails.push(foo);
                    $('#SearchResults').append(foo.SearchResult);
                }
            });

            ShowLoader(0);

            //alert(JSON.stringify(ArtistDetails));

        },
        error: function (ex) {
            alert("Error could not get data " + ex);
        }
    });
};
//#endregion

//#region service requests
function GetArtistDetails(artist) {
    var URL = "http://musicbrainz.org/ws/2/artist/?query=artist:" + artist + "&fmt=json";

    $.ajax({
        url: URL,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var foo = (data);
            $.each(obj, function (key, val) {

            });
            alert(foo);
            return foo;
        },
        error: function (ex) {
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
    $('#txtArtistSearch').val('');
    $('#txtHeaderSearch').val('');
    localStorage.setItem('ArtistSearch', '');
}
//#endregion


