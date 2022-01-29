<?php
    $servername = '127.0.0.1:3306';
    $database = 'project';
    $username = 'root';
    $password = '1111';

    $connection = mysqli_connect($servername, $username, $password, $database);
    if (!$connection) {
        echo 'ne';
    }
    mysqli_set_charset($connection, "utf8");
    echo 'da';
