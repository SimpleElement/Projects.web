<?php
    function sendFile($file) {
        header("Content-type: text/csv");
        header("Content-Disposition: attachment; filename=file.csv");
        header("Pragma: no-cache");
        header("Expires: 0");

        $buffer = fopen('php://output', 'w');
        fputs($buffer, chr(0xEF) . chr(0xBB) . chr(0xBF));
        foreach($file as $val) {
            fputcsv($buffer, $val, ';');
        }
        fclose($buffer);
    }
