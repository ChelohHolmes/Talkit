<?php
include 'Header.php';
require 'C:\Users\Marcelo Ramirez\Talkit/FrontEnd/vendor/autoload.php';
use \Statickidz\GoogleTranslate;
$translate = new GoogleTranslate();

$data = json_decode(file_get_contents('php://input'), true);

$text = $data['Translate'];
$source = $data['TranslateLanguage'];
$target = $data['TranslatedLanguage'];
$translation = $translate->translate($source, $target, $text);
echo json_encode($translation);