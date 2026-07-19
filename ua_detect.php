<?php
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
$ip = $_SERVER['REMOTE_ADDR'] ?? '';

file_put_contents(
    __DIR__ . '/user_agent_with_ip.log',
    "IP: " . $ip . " | UA: " . $ua . PHP_EOL,
    FILE_APPEND
);

// Match only the specific spoof patterns you observed
$blockedPatterns = [
    // put blocked user agents here
];

$hit = false;
foreach ($blockedPatterns as $p) {
    if ($p !== '' && stripos($ua, $p) !== false) {
        $hit = true;
        break;
    }
}

if ($hit) {
    $isAjax = (
        (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') ||
        (isset($_SERVER['HTTP_ACCEPT']) && stripos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)
    );

    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        error('You look like a bot. Either you are using the User-agent Switcher and Manager extension or your user agent is blocked.');
        echo json_encode([
            'ok' => false,
            'message' => 'You look like a bot. Either you are using the User-agent Switcher and Manager extension or your user agent is blocked.'
        ]);
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        error('You look like a bot. Either you are using the User-agent Switcher and Manager extension or your user agent is blocked.');
        echo 'You look like a bot. Either you are using the User-agent Switcher and Manager extension or your user agent is blocked.';
    }
    exit;
}
?>