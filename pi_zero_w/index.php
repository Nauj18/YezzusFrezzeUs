<html lang="en">

<head>

<title>Yezzus</title>

<style type="text/css">
head{

}

body {
    //text-align: right;
    background-image: url('https://previews.123rf.com/images/jenifoto/jenifoto1706/jenifoto170600071/81169473-hipster-pineapple-with-sunglasses-against-a-blue-wooden-background.jpg');
}
</style>

</head>
<font size="12" color="black">Welcome to YEZZUS FREZZUS!! </font><br>
<font size="4" color="black">Please enter you'r wifi name, wifi password, and user ID </font>

<body>

<form action="wificonn.php" method="POST"> <br>
    SSID:<input type="text" name="ssid"/> <br><br><br>
    Password:<input type="password" name="password"/> <br><br><br>
    User ID:<input type="text" name="UID"/> <br>
    <br><br><input type ="submit" /> 
    </form>
    
    <?php
$var1 = "ssid";
$var2 = "password";
$var3 = "UID";
exec ( "/usr/bin/python getWifi.py $var1 $var2" );
?>

</body>
</html>
