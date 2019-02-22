
//set the application
var app=angular.module('diavgeia_app',[]);


//set the controller
app.controller('apofaseisdsCtrl',function($scope,$http,$httpParamSerializerJQLike, $location){

/*set model data*/

	var baseUrl=$location.protocol()+"://"+$location.host()+":"+$location.port()+"/mymodules/diavgeia_ds/";
	var diavgeiaUrl=baseUrl+'php/getDiavgeiaData.php';
	$scope.decisionsFetched=[];//decisions fetched from the server
	//initialization function
	var init=function(){
		//DIAVGEIA SETTINGS
		//set the pageFetched and noOfResultsFetched fetched from diavgeia.
		$scope.noOfPageFetched=0;//number of page fetched

		$scope.noOfResultsFetched=500;//noOfResultsFetched fetched from the api. We use a large number so
		$scope.actualSizeOfDecisionsFetched=0;//actual size of decisions fetched
		//all the items are fetched in one pageFetched

		//Pagination settings
		$scope.noOfResultsShown=5;
		$scope.resultsShown=[];
		$scope.noOfPageShown=1;

		getDecisionsData(diavgeiaUrl);//get the decisions
	};


	//returns the "local" page number, meaning the number related to the page fetched
	var getLocalPageNumber=function(){

		var localPageNumber=
			Math.floor($scope.actualSizeOfDecisionsFetched/$scope.noOfResultsShown);
		if ($scope.actualSizeOfDecisionsFetched%$scope.noOfResultsShown>0){
			localPageNumber++;
		}
		return localPageNumber;
	}

	//returns the page number that will show on screen
	$scope.getPageNumber=function(){

		//calculate the number of pages shown per page fetched


		return $scope.noOfPageFetched*getLocalPageNumber()+
				$scope.noOfPageShown;


	}

//function that gets the data for the decisions from Diavgeia api
	var getDecisionsData=function(diavgeiaUrl){
		console.log("page number "+$scope.noOfPageFetched);
		console.log(diavgeiaUrl);
		$http({
	        url: diavgeiaUrl,
	        method: "POST",
	        data: $httpParamSerializerJQLike({ "pageFetched" : $scope.noOfPageFetched,"noOfResultsFetched":$scope.noOfResultsFetched}),
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    })
		.then(function(response){

				$scope.decisionsFetched=response.data.decisions;
				console.log(response.data);
				$scope.actualSizeOfDecisionsFetched=response.data.info.actualSize;

				displayDecisions();//display the decisions
				console.log("Data fetched");

		},function(response){
			console.log("Problem with fetching data!");
		})
	}

//function that displays the results on the webpage
	var displayDecisions=function(){

		$scope.resultsShown=[];
		var indexBase=($scope.noOfPageShown-1)*$scope.noOfResultsShown;
		for (var i=0;i<$scope.noOfResultsShown;i++){
			//console.log($scope.decisionsFetched[indexBase+i]);
			$scope.resultsShown.push($scope.decisionsFetched[indexBase+i]);
		}

	}
	//get the formatted date (from milliseconds to a readable form)
	$scope.getDate=function(date){
		var myDate=new Date(date);

		return myDate.toLocaleDateString();
	}

	//returns the url for the decision
	$scope.getDecisionUrl=function(decision){
		var address='decision/view/'+decision.ada;

		return address;
	}

	//function that is used when the next button is clicked, to display the next page
	$scope.getNextPage=function(){

		//if the results are already fetched, just display the next page of results
		if ($scope.noOfPageShown*$scope.resultsShown.length<$scope.actualSizeOfDecisionsFetched){
			console.log('More results to be shown');
			$scope.noOfPageShown++;
			displayDecisions();
		}
		//need to fetch more results from the server
		else{

			$scope.noOfPageShown=1; //reset the page shown to 1
			$scope.noOfPageFetched++;//set the next page to be fetched
			getDecisionsData(diavgeiaUrl);//get the decisions
		}

	}

	//function that is used when the previous button is clicked, to display the previous page
	$scope.getPreviousPage=function(){

		if (($scope.noOfPageFetched>0) || ($scope.noOfPageShown!=1)){//if you are not on the first page of data

			//if the results are already fetched (not on the first page), just display the previous page of results
			if ($scope.noOfPageShown>1){
				$scope.noOfPageShown--;
				displayDecisions();
			}
			else{
				$scope.noOfPageFetched--;
				getDecisionsData(diavgeiaUrl);//get the decisions
				$scope.noOfPageShown=getLocalPageNumber();
			}
		}	
	}

	init();

	
});