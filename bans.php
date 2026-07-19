<?php
$title = 'Ban List';

function h($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

require_once 'inc/bootstrap.php';

// Activity statistics
$now = time();
$hour_before = $now - 60 * 60;
$day_before = $now - 60 * 60 * 24;
$month_before = $now - 60 * 60 * 24 * 30;

$query = '';
$boards = listBoards();
foreach ($boards as &$_board) {
	$query .= sprintf("SELECT SUM(time >= :hour_before) as `pph`, SUM(time >= :day_before) as `ppd`, SUM(time >= :month_before) as `ppm`, SUM(time >= :hour_before AND thread IS NULL) as `tph`, SUM(time >= :day_before AND thread IS NULL) as `tpd`, '%s' AS `board` FROM ``posts_%s`` UNION ALL ", $_board['uri'], $_board['uri']);
}
$query = preg_replace('/UNION ALL $/', 'ORDER BY `ppd` DESC', $query);
$query = prepare($query);
$query->bindValue(":hour_before", $hour_before, PDO::PARAM_INT);
$query->bindValue(":day_before", $day_before, PDO::PARAM_INT);
$query->bindValue(":month_before", $month_before, PDO::PARAM_INT);
$query->execute() or error(db_error());

$stats['activity']['total']['uri'] = "Total";
$stats['activity']['total']['pph'] = 0;
$stats['activity']['total']['ppd'] = 0;
$stats['activity']['total']['avg_ppd'] = 0;
$stats['activity']['total']['tph'] = 0;
$stats['activity']['total']['tpd'] = 0;

while ($_board = $query->fetch(PDO::FETCH_ASSOC)) {
	$stats['activity'][$_board['board']]['uri'] = "/" . $_board['board'] . "/";
	$stats['activity'][$_board['board']]['pph'] = $_board['pph'];
	$stats['activity'][$_board['board']]['ppd'] = $_board['ppd'];
	$stats['activity'][$_board['board']]['avg_ppd'] = number_format($_board['ppm'] / 30, 2);
	$stats['activity'][$_board['board']]['tph'] = $_board['tph'];
	$stats['activity'][$_board['board']]['tpd'] = $_board['tpd'];

	$stats['activity']['total']['pph'] += $_board['pph'];
	$stats['activity']['total']['ppd'] += $_board['ppd'];
	$stats['activity']['total']['avg_ppd'] += $_board['ppm'] / 30;
	$stats['activity']['total']['tph'] += $_board['tph'];
	$stats['activity']['total']['tpd'] += $_board['tpd'];
}

$stats['activity']['total']['avg_ppd'] = number_format($stats['activity']['total']['avg_ppd'], 2);
$boardlist = createBoardlist();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= h($title) ?></title>
</head>
<body>
<?php echo $boardlist['top'] ?>
<?php
$requiredFile = __DIR__ . '/bans.html';

if (file_exists($requiredFile)) {
    include $requiredFile;
    exit;
}

echo '<link rel="stylesheet" media="screen" href="/stylesheets/style.css">';
echo '<script type="text/javascript" src="/js/mobile-style.js"></script>';
require 'inc/javascript.php';

echo '<center>bans.html file cannot be found. For mods: go to the mod dashboard, click manage themes, and install the Public Banlist one, then this will start working.</center>';
?>
</body>
</html>