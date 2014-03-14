<?php

	if(isset($_POST["subscriber"]) && !empty($_POST["subscriber"]))
	{

		$filename = '../subscribers/subscribers.txt';
		$fh = fopen($filename, 'a+') or die("can't open file");

		//echo $fh;

		if($fh != false)
		{
			$stringData = $_POST["subscriber"] . PHP_EOL;
			$success = fwrite($fh, $stringData);
			fclose($fh);

			if($success)
			{
				$result = "gelukt";
			}
			else
			{
				$result = "niet gelukt";
			}

		}

		
		
		header('Content-Type: application/json');
		echo json_encode($result);
	}
?>