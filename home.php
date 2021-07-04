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
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  <script language="JavaScript" type="text/javascript" src="home.js"> </script>
</head>
<body>

  <label for="courses">Choose a course: </label>
  <select id="courses" onclick="updateDateList()">
    <?php
    $sqli1 = "SELECT * from course Order By id";
    $result1 = mysqli_query($con, $sqli1);
    while($row1 = mysqli_fetch_array($result1)){
      $id = $row1['id'];
      $sqli2 = "SELECT date FROM schedule WHERE course = $id";
      $result2 = mysqli_query($con, $sqli2);
      $a=array();
      while($row2 = mysqli_fetch_array($result2)){
        array_push($a, $row2['date']);
        //echo '<option>' .$a[0].'</option>';
      }
      $a = json_encode($a);
      $name1 = $row1['courseName'];
      $name2 = array($name1);
      echo '<script>addCourse('.$name2.', '.$a.');</script>';
      echo '<option>' .$name2[0]. '</option>';
    }
    ?>
  </select>

  <label for="dates">Choose a date: </label>
  <select id="dates" onclick="addDateToForm()">

  </select>
  <?php
  //echo '<script> updateDateList() </script>';
  ?>

  <!--
  Date buttons go here
-->
<div id="DateButtons">

</div>

<form id="contactForm" method="post" action="/submit.php">
  <input type="text" id="courseId" name="courseId" value="" required hidden>
  <input type="text" id="courseDate" name="courseDate" value="" required hidden>
  <!--<input type="submit" value="submit"> -->
</form>
<div id="ParticipantButtons"> </div>
</body>
</html>
