<?php

    session_start();

    require_once('assets/fileHandler.php');
    require_once('assets/dataBaseController.php');
    require_once('assets/fileManager.php');

    if ($_FILES['file'] == null) {
        http_response_code(400);
        echo 'File not loaded';
        return;
    }

    if (!validateFormatFile($_FILES['file'])) {
        http_response_code(400);
        echo 'Invalid file format';
        return;
    }

    if (!validateDataFile($_FILES['file']['tmp_name'])) {
        http_response_code(400);
        echo 'Invalid data format';
        return;
    }

    if (!testConnection()) {
        http_response_code(400);
        echo 'DataBase connection error';
        return;
    }

    $file = processFile();
    sendFile($file);

    closeDataBase();
