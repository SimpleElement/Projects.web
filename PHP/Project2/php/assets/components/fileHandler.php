<?php
    $lines = null;

    function validateFormatFile($file): bool {
        if (pathinfo($file['name'])['extension'] != 'csv')
            return false;
        return true;
    }

    function validateDataFile($file): bool {
        global $lines;

        $contents = file_get_contents($file);
        $lines = explode("\r\n", $contents);

        if (count($lines) == 0) {
            return false;
        }

        if (array_shift($lines) != 'Code;Name;') {
            return false;
        }

        return true;
    }

    function validateKey($key): bool {
        if ((is_int($key) || ctype_digit($key)) && (int)$key > 0 ) return true;
        return false;
    }

    function validateValue($value): bool {
        if ($value == "" || strlen($value) > 20) return false;
        preg_match('/[а-яА-Яa-zA-Z0-9.-]+/', $value, $result);
        return $value == $result[0];
    }

    function processFile(): array {
        global $lines;

        $result = array();
        $result[] = array(
            'Code' => 'Code',
            'Name' => 'Name',
            'Error' => 'Error'
        );
        foreach ($lines as $val)
        {
            $str = explode(";", $val);

            if (count($str) != 3 || $str[2] != '') {
                $result[] = array(
                    'Code' => '-',
                    'Name' => '-',
                    'Error' => 'Invalid format data',
                );
                continue;
            }

            $err = '';

            if (!validateKey($str[0])) {
                $err .= 'Invalid key characters';
            }

            if (!validateValue($str[1])) {
                if (!validateKey($str[0])) {
                $err .= ' and Invalid name characters';
                } else {
                    $err .= 'Invalid name characters';
                }
            }

            $result[] = array(
                'Code' => $str[0],
                'Name' => $str[1],
                'Error' => $err,
            );

            if (!validateKey($str[0]) || !validateValue($str[1])) {
                continue;
            }

            addOrUppDateElementInDataBase($str[0], $str[1]);
        }
        return $result;
    }