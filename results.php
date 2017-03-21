<?php
/**
 * Created by PhpStorm
 * User: Biko
 * Date: 22.02.2017
 * Time: 18:39
 */
const RESULTSFILE= "resources/data/results.json";

$recData=json_decode($_GET["data"]);
$resultsContent=json_decode(file_get_contents(RESULTSFILE));
$resultsContent->amount+=1;
$resultsContent->ceo+=$recData->ceo;
$resultsContent->fin+=$recData->fin;
$resultsContent->tec+=$recData->tec;
file_put_contents(RESULTSFILE,json_encode($resultsContent));
var_dump($resultsContent);
echo "success";
