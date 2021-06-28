<html>
  <head>
    <title>courses</title>
    <?php
    $con = new mysqli('localhost', 'root', '', 'coursedb', '3308');
    if(mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
     ?>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="home.css">
    <script> type="text/javascript" src='home.js' </script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  </head>
<body>
<label for="courses">Choose a course: </label>
<select id="course" onclick="updateDates()">

<?php
$sqli = "select * from course";
$result = mysqli_query($con, $sqli);
while($row = mysqli_fetch_array($result)){
  echo '<option>' .$row['name']. '</option>';
}
 ?>
</select>






</body>
</html>
