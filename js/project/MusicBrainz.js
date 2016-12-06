$(document).ready(function () {

    $("#btnSearch").click(function () {
        var search = "";
        $.ajax({
            url: 'http://musicbrainz.org/ws/2/artist/?query=artist:' + $("#inputSearch").val() + '%20AND%20type:person&fmt=json',
            success: function (data) {
                for (var i = 0; i < data.artists.length; i++) {
                    search += '<span>' + data.artists[i].name + ' - </span><a href=# class=releases data-itemname="' + data.artists[i].name + '" data-itemid="' + data.artists[i].id + '">View Releases</a><br /><p></p>';
                }

                $("#results").html(search);
            }
        });
    });

    $("#results").on("click", ".releases", function () {

        $.ajax({
            url: 'http://musicbrainz.org/ws/2/release/?query=arid:' + $(this).data("itemid") + '&fmt=json',
            success: function (data) {
                var search = ""
                for (var i = 0; i < data.releases.length; i++) {
                    search += '<span><div>Title: ' + data.releases[i].title + '</div><div>Year: ' + data.releases[i].date + '</div><div>Number of tracks: ' + data.releases[i]['track-count'] + '</div></span><a href=# class=favourite data-itemname="' + data.releases[i].title + '" data-itemid="' + data.releases[i].id + '">Favourite</a><br /><p></p>';
                }

                $("#releases").html(search);
            },
            error: function (data) {
                var s = data;
            }
        });
    });

    $("#releases").on("click", ".favourite", function () {
        var favouriteItemsBrains = JSON.parse(localStorage.getItem('favouriteItemsBrains'));

        var favouriteItemsBrain = { id: $(this).data('itemid'), name: $(this).data('itemname') };

        if (favouriteItemsBrains == null) {
            var itemArr = new Array();

            itemArr.push(favouriteItemsBrain);

            localStorage.setItem("favouriteItemsBrains", JSON.stringify(itemArr));
        }
        else {

            favouriteItemsBrains.push(favouriteItemsBrain);
            localStorage.setItem("favouriteItemsBrains", JSON.stringify(favouriteItemsBrains));

        }

        addToFavourite();

    });

    $("#favourited").on("click", ".favouriteRemove", function () {
        $(this).parent().remove();
        removeFromFavourite($(this).data("itemid"));

    });


    $("#favourited").on("load", ".shortListFavourite", function () {
        addToFavourite();
    });

    function addToFavourite() {
        var favouriteItemsBrains = JSON.parse(localStorage.getItem('favouriteItemsBrains'));
        if (favouriteItemsBrains != null) {
            var favouriteItemsBrainsStr = "";

            for (var i = 0; i < favouriteItemsBrains.length; i++) {
                favouriteItemsBrainsStr += '<span><span>' + favouriteItemsBrains[i].name + ' - </span><a href=# class=favouriteRemove data-itemname=' + favouriteItemsBrains[i].name + ' data-itemid=' + favouriteItemsBrains[i].id + '>Remove</a><br /><p></p></span>';
            }

            $("#favourited").html(favouriteItemsBrainsStr);
        }


    }

    function removeFromFavourite(item) {
        var favouriteItemsBrains = JSON.parse(localStorage.getItem('favouriteItemsBrains'));
        $.each(favouriteItemsBrains, function (i) {
            if (favouriteItemsBrains[i].id === item) {
                favouriteItemsBrains.splice(i, 1);

            }
            localStorage.setItem("favouriteItemsBrains", JSON.stringify(favouriteItemsBrains));
        });
    }

    addToFavourite();

});