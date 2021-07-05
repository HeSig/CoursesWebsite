<?php
$con = new mysqli('localhost', 'root', '', 'coursedb', '3308');
$courseName = $_POST['courseId'];
$courseDate = $_POST['courseDate'];
$companyName = $_POST['cname'];
$companyEmail = $_POST['cemail'];
$companyPhone = $_POST['cphone'];


$firstName = array();
$lastName = array();
$email = array();
$phone = array();

$size = count($_POST['fname']);
//Create array of participants
for($i = 0; $i < $size; $i++){
  array_push($firstName, $_POST['fname'][$i]);
  array_push($lastName, $_POST['lname'][$i]);
  array_push($email, $_POST['pemail'][$i]);
  array_push($phone, $_POST['pphone'][$i]);

  //echo $firstName[$i]. "<br>";
  //echo $lastName[$i]."<br>";
  //echo $email[$i]."<br>";
  //echo $phone[$i]."<br>";
}
//Get course ID
//echo 'SELECT id FROM COURSE WHERE courseName ="' .$courseName.'"';
$sqli1 = 'SELECT id FROM COURSE WHERE courseName ="' .$courseName.'"';
$result1 = mysqli_query($con, $sqli1);
$courseId = mysqli_fetch_array($result1)[0];

//Get schedule ID
//echo 'SELECT scheduleId FROM schedule where date = "'.$courseDate.'" AND course = '.$courseId.'';
$sqli1 = 'SELECT scheduleId FROM schedule where date = "'.$courseDate.'" AND course = '.$courseId;
$result1 = mysqli_query($con, $sqli1);

$scheduleId = mysqli_fetch_array($result1)[0];

//Get company name
$sqli1 = 'SELECT id FROM company where name = "'.$companyName.'" AND email = "'.$companyEmail.'" AND phone = '.$companyPhone;
$result1 = mysqli_query($con, $sqli1);
$res = mysqli_fetch_array($result1);
if($res == null){
  //If company name is not registered, register it
  $sqli1 = 'INSERT INTO company (name, email, phone) VALUES ("'.$companyName.'", "'.$companyEmail.'", '.$companyPhone.')';
  $result1 = mysqli_query($con, $sqli1);
}
$sqli1 = 'SELECT id FROM company WHERE name = "'.$companyName.'"';
$result1 = mysqli_query($con, $sqli1);
$companyId = mysqli_fetch_array($result1)[0];

for($i = 0; $i < $size; $i++){
  $sqli1 = 'SELECT * FROM participant WHERE email = "'.$email[$i].'"';
  $result1 = mysqli_query($con, $sqli1);
  $res = mysqli_fetch_array($result1);
  if($res == null){
    $sqli1 = 'INSERT INTO participant (companyId, fname, lname, phone, email) VALUES ('.$companyId.',
      "'.$firstName[$i].'", "'.$lastName[$i].'", '.$phone[$i].', "'.$email[$i].'")';
      $result1 = mysqli_query($con, $sqli1);
      $sqli1 = 'SELECT * FROM participant WHERE email = "'.$email[$i].'"';
      $result1 = mysqli_query($con, $sqli1);
      $res = mysqli_fetch_array($result1);
    }
    $participantId = $res[0];
    $sqli1 = 'SELECT * FROM participation WHERE schedule = '.$scheduleId.' AND participant = '.$participantId;
    $result1 = mysqli_query($con, $sqli1);
    $res = mysqli_fetch_array($result1);
    if($res == null){
      $sqli1 = 'INSERT INTO participation (schedule, participant) VALUES ('.$scheduleId.', '.$participantId.')';
      $result1 = mysqli_query($con, $sqli1);
    }else{
      echo "Participant already registered";
    }
  }
header("Location:complete.php");
  ?>
