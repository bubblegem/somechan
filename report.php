<?php
require 'inc/bootstrap.php';

$global = isset($_GET['global']);
$post = (isset($_GET['post']) ? $_GET['post'] : false);
$board_uri = (isset($_GET['board']) ? $_GET['board'] : false);

if (!$post || !preg_match('/^delete_\d+$/', $post) || !$board_uri || !openBoard($board_uri)) {
    header('HTTP/1.1 400 Bad Request');
    error(_('Bad request.'));
}

if ($config['report_captcha']) {
    $captcha = generate_captcha($config['captcha']['extra']);
} else {
    $captcha = null;
}

$body = Element($config['file_report'], [
    'global' => $global,
    'post' => $post,
    'board' => $board_uri,
    'captcha' => $captcha,
    'config' => $config
]);

global $board;

$title = $board['url'] . ' - ' . $board['title'] . '; Report window';
$subtitle = $board['subtitle'] ?? '';

echo Element($config['file_page_template'], [
    'config' => $config,
    'title' => $title,
    'subtitle' => $subtitle,
    'boardlist' => createBoardlist(),
    'body' => $body
]);
