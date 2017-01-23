FrontEndApplication.filter('yearFilter', function ($filter) {

    function getYearFromNonDate(inputDate, separator) {

        var tokenArr = inputDate.split(separator);

        return tokenArr.filter(function (s) {
            return s.length === 4;
        });
    };


    return function(inputDate) {
    
        
        var year = $filter('date')(inputDate, 'yyyy');

        if(year && year.length > 4){

            if (inputDate.length === 4) { return inputDate; }

            var yearArr = getYearFromNonDate(inputDate, '-');
            if (yearArr.length === 1) { return yearArr[0] };

            yearArr = getYearFromNonDate(inputDate, '/');
            if (yearArr.length === 1) { return yearArr[0] };

        }

        return year;
    }
});