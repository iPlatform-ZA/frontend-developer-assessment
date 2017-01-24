
FrontEndApplication.service('toastMessageService', function () {

    this.getErrorConnectingToServer = function () {

        return {
            className: 'danger',
            content: 'Error connecting to backend service. Please try again.'
        };
    }


    this.getSearchTermRequired = function () {

        return {
            className: 'warning',
            content: 'The search term is required.'
        };
    }

    this.getSuccessAddingToFavourites = function () {

        return {
            className: 'success',
            content: 'Added to favourites successfully.',
            timeout	: 1000
        };
    }



});