<form action="wificonn.php" method="POST"> 
    SSID:<input type="text" name="ssid"/> 
    Password:<input type="password" name=password"/> 
    input type ="submit" /> </form>
    
    <?php
$var1 = "ssid";
$var2 = "password";
exec ( "/usr/bin/python getWifi.py $var1 $var2" );
?>
