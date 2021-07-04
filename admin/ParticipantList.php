<html>
<head>
  <title>Recieved Applications</title>
  <?php
  $con = new mysqli('localhost', 'root', '', 'coursedb', '3308');
  if(mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  ?>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="ParticipantList.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  <script language="JavaScript" type="text/javascript" src="ParticipantList.js"> </script>
</head>

<body>
  <div class="row">
    <div class="column">
      <h1>All participants </h1>
      <table class= "invoiceList" id = "invoices">
        <tr>
          <th onClick = "sortBy(0)">Date &#9663;</th>
          <th onClick = "sortBy(1)">Course Name &#9663;</th>
          <th onClick = "sortBy(2)">Company &#9663;</th>
          <th onClick = "sortBy(3)">Attendees &#9663;</th>
        </tr>
      </table>
    </div>
    <div class="column2">
      <div class="infoFrame">
        <!--<div class="infoFrameText">
        Company:
        <div class="infoRow">
        <div class="infoBox" id="CName">
        <div class="header">
        <b>Company name</b>
      </div>
      <div class="content">
      Hello
    </div>
  </div>
</div>
<div class="infoRow">
<div class="infoBox" id="CEmail">
<div class="header">
<b>Company email</b>
</div>
<div class="content">
Hello
</div>
</div>
</div>
<div class="infoRow">
<div class="infoBox" id="CPhone">
<div class="header">
<b>Company phone</b>
</div>
<div class="content">
Hello
</div>
</div>
</div>
Attendees:
<div class="infoRow">
<div class="infoBox" id="PName">
<div class="header">
<b>Name</b>
</div>
<div class="content">
Hello
</div>
</div>
</div>
<div class="infoRow">
<div class="infoBox" id="PEmail">
<div class="header">
<b>Email</b>
</div>
<div class="content">
Hello
</div>
</div>
</div>
<div class="infoRow">
<div class="infoBox" id="PPhone">
<div class="header">
<b>Phone</b>
</div>
<div class="content">
Hello
</div>
</div>
</div>
</div>-->
</div>
</div>
<!--<div id="X" onClick="hideInfoFrame()">
  <b>X</b>
</div>-->
</div>
</div>


<?php
$sqli = 'SELECT schedule.date, course.courseName, company.name, company.email, company.phone, schedule.scheduleId
FROM schedule, course, company, participant, participation
WHERE schedule.course = course.id AND company.id = participant.companyId AND participation.schedule = schedule.scheduleId AND participation.participant = participant.id
GROUP BY schedule.date, course.courseName, company.name
ORDER BY course.id';

$result = mysqli_query($con, $sqli);
while ($row = mysqli_fetch_array($result)){
  $courseDate = $row['date'];
  $courseName = array($row['courseName']);
  $company = $row['name'];
  $companyEmail = array($row['email']);
  $companyPhone = $row['phone'];
  $scheduleId = $row['scheduleId'];

  $sqli2 = 'SELECT participant.fname, participant.lname, participant.email, participant.phone
  FROM participant, company, schedule, participation
  WHERE company.name = "'.$company.'" AND company.id = participant.companyId AND participant.id = participation.participant AND participation.schedule = '.$scheduleId.'
  GROUP BY participant.email';

  $result2 = mysqli_query($con, $sqli2);
  $participants = array();

  while ($row2 = mysqli_fetch_array($result2)){
    $participant = array($row2['fname'], $row2['lname'], $row2['email'], $row2['phone']);
    array_push($participants, $participant);
  }
  $participants = json_encode($participants);
  $courseName = json_encode($courseName);
  $companyEmail = json_encode($companyEmail);
  $company = json_encode($company);
  $courseDate = json_encode($courseDate);
  echo '<script> addInvoice('.$courseDate.', '.$courseName.', '.$company.', '.$companyEmail.', '.$companyPhone.', '.$participants.') </script>';
}


?>
</body>

</html>
