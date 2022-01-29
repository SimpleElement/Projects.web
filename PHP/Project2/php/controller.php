<?php
    require_once('assets/updateElements.php');

    if ($_GET['type'] == "updateElements") {
        update();
    } else {
        http_response_code(404);
        echo "Script Not Found";
    }
