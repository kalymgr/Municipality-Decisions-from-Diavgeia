<?php 
	$page=$_POST['pageFetched'];
 	$results=$_POST['noOfResultsFetched'];
	echo file_get_contents('https://diavgeia.gov.gr/opendata/search.json?size='.$results.'&page='.$page.'&signer=100028228;100003267&from_date=2014-09-01');
?>