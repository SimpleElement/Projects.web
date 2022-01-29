<?php
    include 'components/fileHandler.php';
    include 'components/dataBaseController.php';
    include 'components/fileManager.php';

    function update() {

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
    }
