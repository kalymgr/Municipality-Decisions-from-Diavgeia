# Municipality-Decisions-from-Diavgeia
Tool for showing Municipality decisions that are posted on Diavgeia

This tool is functional and can be accessed from https://kalymnos.gov.gr/el/enimerosi/apofaseis-dimotikoy-symvouliou

It was added as a menu link, linking to a Jumi application.

The code of Jumi application is the following:

<?php
$document = JFactory::getDocument();

$urlDiavgeiaApp=JUri::base() ."mymodules/diavgeia_ds/js/diavgeia_app.js";
$urlAngular="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js";
$urlMainCss=JUri::base() ."mymodules/diavgeia_ds/css/main.css";

$document->addScript($urlAngular);
$document->addScript($urlDiavgeiaApp);


$document->addStyleSheet($urlMainCss);

?>



