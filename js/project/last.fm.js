$(document).ready(function () {

    $("#btnSearch").click(function () {
        var search = "";
        $.ajax({
            url: 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + $("#inputSearch").val() + '&api_key=e83ce8d3d0b44ed1998a31a470a032e3&format=json',
            success: function (data) {
                for (var i = 0; i < data.results.artistmatches.artist.length; i++) {
                    search += '<span>' + data.results.artistmatches.artist[i].name + ' - </span><a href=# class=shortList data-itemname="' + data.results.artistmatches.artist[i].name + '" data-itemid="' + data.results.artistmatches.artist[i].mbid + '">Shortlist</a><br /><p></p>';
                }

                $("#results").html(search);
            }
        });
    });

    $("#results").on("click", ".shortList", function () {
        var shortListItems = JSON.parse(localStorage.getItem('shortListItems'));
        var shortListItem = { id: $(this).data('itemid'), name: $(this).data('itemname') };

        if (shortListItems == null) {
            var itemArr = new Array();

            itemArr.push(shortListItem);

            localStorage.setItem("shortListItems", JSON.stringify(itemArr));
        }
        else {

            shortListItems.push(shortListItem);
            localStorage.setItem("shortListItems", JSON.stringify(shortListItems));

        }

        addToShortList();

    });

    $("#shortListed").on("click", ".shortListRemove", function () {
        $(this).parent().remove();
        removeFromShortList($(this).data("itemid"));

    });

    $("#favourited").on("click", ".favouriteRemove", function () {
        $(this).parent().remove();
        removeFromFavourite($(this).data("itemid"));

    });

    $("#shortListed").on("load", ".shortListRemove", function () {
        addToShortList();
    });

    $("#favourited").on("load", ".shortListFavourite", function () {
        addToFavourite();
    });

    $("#shortListed").on("click", ".shortListFavourite", function () {
        var favouriteItems = JSON.parse(localStorage.getItem('favouriteItems'));

        var favouritetItem = { id: $(this).data('itemid'), name: $(this).data('itemname') };

        if (favouriteItems == null) {
            var itemArr = new Array();

            itemArr.push(favouritetItem);

            localStorage.setItem("favouriteItems", JSON.stringify(itemArr));
        }
        else {

            favouriteItems.push(favouritetItem);
            localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));

        }

        addToFavourite();
    });

    function addToFavourite() {
        var favouriteItems = JSON.parse(localStorage.getItem('favouriteItems'));
        if (favouriteItems != null) {
            var favouritelist = "";

            for (var i = 0; i < favouriteItems.length; i++) {
                favouritelist += '<span><span>' + favouriteItems[i].name + ' - </span><a href=# class=favouriteRemove data-itemname=' + favouriteItems[i].name + ' data-itemid=' + favouriteItems[i].id + '>Remove</a><br /><p></p></span>';
            }

            $("#favourited").html(favouritelist);
        }


    }

    function removeFromFavourite(item) {
        var favouriteItems = JSON.parse(localStorage.getItem('favouriteItems'));
        $.each(favouriteItems, function (i) {
            if (favouriteItems[i].id === item) {
                favouriteItems.splice(i, 1);

            }
            localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
        });
    }

    function addToShortList() {
        var shortListItems = JSON.parse(localStorage.getItem('shortListItems'));
        if (shortListItems != null) {
            var shortlistedlist = "";

            for (var i = 0; i < shortListItems.length; i++) {
                shortlistedlist += '<span><span>' + shortListItems[i].name + ' - </span><a href=# class=shortListRemove data-itemname=' + shortListItems[i].name + ' data-itemid=' + shortListItems[i].id + '>Remove</a> - <a href=# class=shortListFavourite data-itemname=' + shortListItems[i].name + ' data-itemid=' + shortListItems[i].id + '>Favourite</a><br /><p></p></span>';
            }

            $("#shortListed").html(shortlistedlist);
        }


    }

    function removeFromShortList(item) {
        var shortListItems = JSON.parse(localStorage.getItem('shortListItems'));
        $.each(shortListItems, function (i) {
            if (shortListItems[i].id === item) {
                shortListItems.splice(i, 1);

            }
            localStorage.setItem("shortListItems", JSON.stringify(shortListItems));
        });

    }

    addToShortList();
    addToFavourite();

});