<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>WebLab2</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="assets/Style.css">
    <link rel="shortcut icon" href="assets/images/sharingan.png">
    <script src="assets/script.js"></script>
</head>
<body>
    <a class="name" href="https://github.com/sReGeDiT">WebLab2</a>

    <div class="input__zone">
        <header class="input__heading">Проверка попадания точки в ограниченную область</header>
        <fieldset class="input">
        <legend class="x_input__table">Выберете координату X:</legend>
            <div class="x_div">
                <input type="radio" name="x" value="-3">-3
                <input type="radio" name="x" value="-2">-2
                <input type="radio" name="x" value="-1">-1
                <input type="radio" name="x" value="0">0
                <input type="radio" name="x" value=1>1
                <input type="radio" name="x" value="2">2
                <input type="radio" name="x" value="3">3
                <input type="radio" name="x" value="4">4
                <input type="radio" name="x" value="5">5
            </div>
        </fieldset>
        <fieldset class="input">
            <legend class="y_input__table">Введите координату Y:</legend>
            <div class="y_div">
                > <input type="text" name="y" placeholder="-5 ... 3">
            </div>
        </fieldset>

        <fieldset class="input">
            <legend class="r_input__table">Выберете параметр R:</legend>
            <div class="r_div">
                <select name="select">
                    <option name="r" value="1">1</option>
                    <option name="r" value="1.5">1.5</option>
                    <option name="r" value="2">2</option>
                    <option name="r" value="2.5" selected>2.5</option>
                    <option name="r" value="3">3</option>
                </select>
            </div>
        </fieldset>

        <div class="x_y_z_result__zone">
            <div class="x_result">
                x:<input type="text" name="x__result" id="x" value="" disabled/>
            </div>
            <div class="y_result">
                y:<input type="text" name="y__result" id="y" value="" disabled/>
            </div>
            <div class="r_result">
                r:<input type="text" name="r__result" id="r" value="" disabled/>
            </div>
        </div>

        <div class="button__cfg">
            <button type="button" class="btn submit">отправить</button>
            <button type="button" class="btn clear">отчистить</button>
        </div>

        <img class="eyes" src="assets\images\eyes.png">
    </div>

    <div class="screen__zone">
        <header class="screen__heading">График</header>
        <div class="graph">
            <svg class="zone_coordinates" width="450" height="450" xmlns="http://www.w3.org/2000/svg">
                <!-- Оси координат -->
                <line x1="0" x2="450" y1="225" y2="225" stroke="black"></line>
                <line x1="225" x2="225" y1="0" y2="450" stroke="black"></line>
                <!-- Стрелки к осям -->
                <polygon points="225,0 220,15 230,15" stroke="black"></polygon>
                <polygon points="450,225 435,220 435,230" stroke="black"></polygon>
                <!-- Подписи к осям -->
                <text x="435" y="215">X</text>
                <text x="230" y="15">Y</text>
                <!-- Метки для значений R на оси X -->
                <line x1="45" x2="45" y1="220" y2="230" stroke="black"></line>
                <line x1="135" x2="135" y1="220" y2="230" stroke="black"></line>
                <line x1="315" x2="315" y1="220" y2="230" stroke="black"></line>
                <line x1="405" x2="405" y1="220" y2="230" stroke="black"></line>
                <!-- Метки для значений R на оси Y -->
                <line x1="220" x2="230" y1="45" y2="45" stroke="black"></line>
                <line x1="220" x2="230" y1="135" y2="135" stroke="black"></line>
                <line x1="220" x2="230" y1="315" y2="315" stroke="black"></line>
                <line x1="220" x2="230" y1="405" y2="405" stroke="black"></line>
                <!-- Значения R на оси X -->
                <text x="35" y="245">-3</text>
                <text x="120" y="245">-1.5</text>
                <text x="305" y="245">1.5</text>
                <text x="400" y="245">3</text>
                <!-- Значения R на оси Y -->
                <text x="210" y="51">3</text>
                <text x="195" y="140">1.5</text>
                <text x="190" y="320">-1.5</text>
                <text x="205" y="410">-3</text>
                <!-- Прямоугольник -->
                <polygon id="1" stroke="#877cd3" fill="#877cd3" fill-opacity="0.4" points=""></polygon>
                <!-- Треугольник -->
                <polygon id="2" stroke="#877cd3" fill="#877cd3" fill-opacity="0.4" points=""></polygon>
                <!-- Четверть эллипса -->
                <path id="3" stroke="#877cd3" fill="#877cd3" fill-opacity="0.4" d=""></path>

                <svg class="points">
                </svg>
            </svg>
        </div>
    </div>

    <div class="result__zone">
        <header class="zone__heading">Реультат</header>
        <div class="dataTable">
            <div class="scroll-table">
                <table>
                    <thead>
                    <tr>
                        <th>Result</th>
                        <th width="20px">X</th>
                        <th width="20px">Y</th>
                        <th width="20px">R</th>
                        <th>ExecuteTime</th>
                        <th>CurrentTime</th>
                    </tr>
                    </thead>
                </table>
                <div class="scroll-table-body">
                    <table>
                        <tbody id="output">
                            <jsp:include page="assets/jsp/Table.jsp"/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <marquee class="student" behavior="alternate" scrollamount="1">
        Выполнил: Гайдамаков Александр Сергеевич
        Группа: P3212
        Вариант: 12046
    </marquee>
</body>
<script src="assets/script.js"></script>
</html>