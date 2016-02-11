<?php
	$usage = '"' . date('Y-m-d H:i') . '"';
	$usage .= ',' . '"' . htmlspecialchars($_GET["source"]) . '"';
	$usage .= ',' . '"' . htmlspecialchars($_GET["permalink"]) . '"';
	$usage .= "\n";
	$filepath = "permalinkmaker-logging.csv";
	$handle = fopen($filepath, "a");
	$success = fwrite($handle, $usage);
	fclose($handle);
?>