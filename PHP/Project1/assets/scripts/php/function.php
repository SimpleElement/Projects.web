<?php

session_start();

date_default_timezone_set('Europe/Moscow');
$start = microtime(true);

if ($_GET['type'] == "update") {
    update();
} else if ($_GET['type'] == "check") {
    if (validationCoordinate()) check($start); else {
        error($start);
    }
} else if ($_GET['type'] == "clear") {
    clear($start);
} else {
    error($start);
}

function update() {
    if ($_SESSION['results'] == null) return;

    $reversed = array_reverse($_SESSION['results']);

    foreach ($reversed as $item) {
        echo "<tr><td>{$item['result']}</td><td width=\"20px\">{$item['x']}</td><td width=\"20px\">{$item['y']}</td><td width=\"20px\">{$item['r']}</td><td>{$item['executionTime']}</td><td>{$item['currentTime']}</td><tr>";
    }
}

function check($start)
{
    $x = (float)$_GET['x'];
    $y = (float)$_GET['y'];
    $r = (float)$_GET['r'];

    $result = "False";

    if (checkCoordinate($x, $y, $r)) {
        $result = "True";
    }

    $executionTime = (microtime(true) - $start) * 1000000;

    $_SESSION['results'][] = array(
        'result' => $result,
        'x' => $x,
        'y' => $y,
        'r' => $r,
        'executionTime' => round($executionTime, 2, PHP_ROUND_HALF_EVEN),
        'currentTime' => date("H:i:s"),
    );

    $reversed = array_reverse($_SESSION['results']);

    foreach ($reversed as $item) {
        echo "<tr><td>{$item['result']}</td><td width=\"20px\">{$item['x']}</td><td width=\"20px\">{$item['y']}</td><td width=\"20px\">{$item['r']}</td><td>{$item['executionTime']}</td><td>{$item['currentTime']}</td><tr>";
    }
}

function clear($start)
{
    $executionTime = (microtime(true) - $start) * 1000000;
    $executionTimeR = round($executionTime, 2, PHP_ROUND_HALF_EVEN);
    $currentTime = date("H:i:s");
    echo "<tr><td>Clear</td><td width=\"20px\">-</td><td width=\"20px\">-</td><td width=\"20px\">-</td><td>{$executionTimeR}</td><td>{$currentTime}</td><tr>";
    session_destroy();
}

function error($start)
{
    $executionTime = (microtime(true) - $start) * 1000000;
    $_SESSION['results'][] = array(
        'result' => "Error",
        'x' => "-",
        'y' => "-",
        'r' => "-",
        'executionTime' => round($executionTime, 2, PHP_ROUND_HALF_EVEN),
        'currentTime' => date("H:i:s"),
    );

    $reversed = array_reverse($_SESSION['results']);

    foreach ($reversed as $item) {
        echo "<tr><td>{$item['result']}</td><td width=\"20px\">{$item['x']}</td><td width=\"20px\">{$item['y']}</td><td width=\"20px\">{$item['r']}</td><td>{$item['executionTime']}</td><td>{$item['currentTime']}</td><tr>";
    }
}

function validationCoordinate()
{
    if (
        is_numeric($_GET['x']) &
        is_numeric($_GET['y']) &
        is_numeric($_GET['r'])
    ) return true;
    return false;
}

function checkCoordinate($x, $y, $r)
{
    if (
        (0 <= $x & $x <= ($r / 2)) &
        (0 <= $y & $y <= $r)
    ) return true;
    if (
        (-($r / 2) <= $x & $x <= 0) &
        (0 <= $y & $y <= ($r / 2)) &
        (sqrt(pow($x, 2) + pow($y, 2)) <= $r / 2)
    ) return true;
    if (
        (-$r <= $x & $x <= 0) &
        (-$r <= $y & $y <= 0) &
        (-$x + -$y <= $r)
    ) return true;
    return false;
}

?>