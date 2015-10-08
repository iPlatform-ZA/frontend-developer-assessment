'use strict';

/**
 * @ngdoc function
 * @name assessApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the assessApp
 */
angular.module('assessApp')
  .controller('MainCtrl', function ($q, $http, $scope) {
  	$scope.artist = "";
    $scope.result = "";
  	$scope.artists =[]; 
  	$scope.ShortListed = []; 	
  	// function to search for an artist.
    $scope.search = function(){ 
      
      if($scope.artist === ""){
        $scope.result = "Please provide artist name you are looking for";
        return;
      }

    	$scope.artists =[];
      $scope.result = "";
    	$q.when($http.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="'+$scope.artist+'"&api_key=f21088bf9097b49ad4e7f487abab981e&format=json'))
    	.then(function(data){    
    		// check to see if there are any artists found		
    		if(data.data.results.artistmatches.artist.length <= 0){
          $scope.result = "No results found for " + $scope.artist;
    			return;
    		}
    		// loop through the artists returned and add them to the artists array
    		angular.forEach(data.data.results.artistmatches.artist, function (artist) {
    			$scope.artists.push(artist.name);
    		});		

    	});
	};

    // Add a Item to the list
    $scope.addItem = function (artist) {
    	if($scope.ShortListed.indexOf(artist) === -1 ){
    		$scope.ShortListed.push(artist);	
    	}
    };

});




