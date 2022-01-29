<?php
    $connection = null;

    $servername = '127.0.0.1:3306';
    $database = 'project';
    $username = 'root';
    $password = '1111';

    function testConnection(): bool {
        global $connection, $servername, $database, $username, $password;
        $connection = mysqli_connect($servername, $username, $password, $database);
        if (!$connection) {
            return false;
        }
        mysqli_set_charset($connection, "utf8");
        return true;
    }

    function addOrUppDateElementInDataBase($key, $value): bool {
        global $connection;

        return $connection -> query("INSERT INTO data(code_value, title_value) VALUES ({$key}, '{$value}') ON DUPLICATE KEY UPDATE title_value='{$value}'");
    }

    function closeDataBase() {
        global $connection;

        $connection -> close();
    }