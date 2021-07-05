var courseList=new Array;


function addCourse(name, dates){
  var Course = new Object();
  Course.name = name[0];
  Course.dates = new Array;
  for(var i = 0; i < dates.length; i++){
    Course.dates.push(dates[i]);
  }
  courseList.push(Course);
}

function getCourses(){
  return courseList;
}

function getCourse(index){
  return courseList[index];
}

function addDateToForm(){
  initForm();
  hideButtons();
}

function updateDateList(){
  var dates = document.getElementById("dates");
  var length = dates.options.length;
  //Reset date list
  for( var i = length-1; i >= 0; i--){
    dates.options[i] = null;
  }
  var tmp = courseList[document.getElementById("courses").selectedIndex].dates;
  //Add new dates to list

  document.getElementById("DateButtons").innerHTML = "";
  var buttonHeader = document.createElement("h1");
  buttonHeader.innerHTML = "Choose a date: <br>";
  document.getElementById("DateButtons").appendChild(buttonHeader);
  for(var i = 0; i < tmp.length; i++){
    //Create new date button
    var opt = document.createElement("option");
    opt.value = tmp[i];
    opt.innerHTML = tmp[i];
    dates.appendChild(opt);

    var scheduleButton = document.createElement("button");
    scheduleButton.innerHTML = "&#128197 <br>" + tmp[i];
    scheduleButton.id = tmp[i];
    scheduleButton.className = "ScheduleButton";
    var val = tmp[i];
    scheduleButton.addEventListener("click", pasteDate);
    document.getElementById("DateButtons").appendChild(scheduleButton);
  }
  var currentSelectedDate = document.getElementById("dates").value;
  document.getElementById("courseId").value = document.getElementById("courses").value;
  document.getElementById("courseDate").value = "";
}

function pasteDate(event){
  var clickedElement = event.target;
  document.getElementById("courseDate").value = clickedElement.id;
}

var formCreated = false;
function initForm(){
  if(formCreated == false){
    formCreated = true;
    addCompanyForm();
    addPersonForm();
  }
}

function addCompanyForm(){
  var companyDiv = document.createElement("div");
  companyDiv.className = "companyDiv";

  var frm = document.getElementById("contactForm");

  var cname = document.createElement("input");
  cname.type ="text";
  cname.id="cname";
  cname.placeholder="Company name";
  cname.name="cname";

  cname.value ="";
  cname.required = true;
  var lcname = document.createElement("label");
  lcname.for = "cname";
  lcname.className ="Label";
  lcname.innerHTML ="Company name: ";

  var cphone = document.createElement("input");
  cphone.type ="tel";
  cphone.id="cphone";
  cphone.placeholder="Company phone number";
  cphone.name="cphone";

  cphone.value ="";
  cphone.required = true;
  var lcphone = document.createElement("label");
  lcphone.for = "cphone";
  lcphone.className = "Label";
  lcphone.innerHTML ="Company phone: ";

  var cemail = document.createElement("input");
  cemail.type ="text";
  cemail.id="cemail";
  cemail.placeholder="Company email";
  cemail.name="cemail";

  cemail.value ="";
  cemail.required = true;
  var lcemail = document.createElement("label");
  lcemail.for = "cemail";
  lcemail.className = "Label";
  lcemail.innerHTML ="Company email: ";

  var column = document.createElement("div");
  column.id = "ccolumn1";
  column.appendChild(lcname);
  column.appendChild(document.createElement("br"));
  column.appendChild(lcphone);
  column.appendChild(document.createElement("br"));
  column.appendChild(lcemail);
  companyDiv.appendChild(column);

  var column = document.createElement("div");
  column.id = "ccolumn2";
  column.appendChild(cname);
  column.appendChild(document.createElement("br"));
  column.appendChild(cphone);
  column.appendChild(document.createElement("br"));
  column.appendChild(cemail);
  column.appendChild(document.createElement("br"));
  companyDiv.appendChild(column);


  var column = document.createElement("div");
  column.id = "ccolumn3";
  var submitButton = document.createElement("input");
  submitButton.type ="submit";
  submitButton.id = "submitButton";
  submitButton.value = "submit";
  column.appendChild(submitButton);
  companyDiv.appendChild(column);



  frm.appendChild(companyDiv);

}

var participantCount = 0;

function addPersonForm(){


  var personDiv = document.createElement("div");
  personDiv.className = "personDiv";
  participantCount++;
  var frm = document.getElementById("contactForm");

  var fname = document.createElement("input");
  fname.type ="text";
  fname.id="fname";
  fname.placeholder="First name";
  fname.name="fname[]";

  fname.value="";
  fname.required = true;
  var lfname = document.createElement("label");
  lfname.for = "fname";
  lfname.id = "lfname";
  lfname.innerHTML ="First name: ";

  var lname = document.createElement("input");
  lname.type ="text";
  lname.id="lname";
  lname.placeholder="Last name";
  lname.name="lname[]";

  lname.value="";
  lname.required = true;
  var llname = document.createElement("label");
  llname.for = "lname";
  llname.id = "llname";
  llname.innerHTML ="Last name: ";

  var pemail = document.createElement("input");
  pemail.type ="email";
  pemail.id="pemail";
  pemail.placeholder="Email";
  pemail.name="pemail[]";

  pemail.value="";
  pemail.required = true;
  var lpemail = document.createElement("label");
  lpemail.for = "pemail";
  lpemail.id = "lpemail";
  lpemail.innerHTML ="Email: ";
  var pphone = document.createElement("input");
  pphone.type ="tel";
  pphone.id="pphone[]";
  pphone.placeholder="Phone number"
  pphone.value="";
  pphone.name="pphone[]";
  pphone.required = true;
  var lpphone = document.createElement("label");
  lpphone.for = "pphone";
  lpphone.id = "lpphone";
  lpphone.innerHTML ="phone: ";


  lfname.className="Label";
  llname.className="Label";
  lpphone.className="Label";
  lpemail.className="Label";

  fname.className="Input";
  lname.className="Input";
  pphone.className="Input";
  pemail.className="Input";

  var column = document.createElement("div");
  column.id = "column1";
  column.appendChild(lfname);
  column.appendChild(document.createElement("br"));
  column.appendChild(llname);
  column.appendChild(document.createElement("br"));
  column.appendChild(lpemail);
  column.appendChild(document.createElement("br"));
  column.appendChild(lpphone);
  column.appendChild(document.createElement("br"));
  personDiv.appendChild(column);

  var column = document.createElement("div");
  column.id = "column2";
  column.appendChild(fname);
  column.appendChild(document.createElement("br"));
  column.appendChild(lname);
  column.appendChild(document.createElement("br"));
  column.appendChild(pemail);
  column.appendChild(document.createElement("br"));
  column.appendChild(pphone);
  column.appendChild(document.createElement("br"));
  personDiv.appendChild(column);

  personDiv.appendChild(document.createElement("br"));


  var opcty = 0.9 - 0.05*participantCount;
  personDiv.style.background = "rgba(46, 134, 171, "+opcty+")";
  frm.appendChild(personDiv);

  var ptpbtn = document.getElementById("ParticipantButtons");
  if(participantCount == 1){
    if(document.getElementById("AddParticipant") != null) document.getElementById("AddParticipant").remove();
    var btn = document.createElement("button");
    btn.innerHTML  ="+ Add a participant";
    btn.id = "AddParticipant";
    btn.className = "participantButton";
    btn.onclick = function(){
      addPersonForm();
    }
    ptpbtn.appendChild(btn);
  }else{
    document.getElementById("AddParticipant").remove();
    if(document.getElementById("RemoveParticipant") != null) document.getElementById("RemoveParticipant").remove();
    var btn = document.createElement("button");
    btn.innerHTML  ="+ Add a participant";
    btn.id = "AddParticipant";
    btn.className = "participantButton";
    btn.onclick = function(){
      addPersonForm();
    }

    var rmvbtn = document.createElement("button");
    rmvbtn.innerHTML  ="- Remove a participant";
    rmvbtn.id = "RemoveParticipant";
    rmvbtn.className = "participantButton";
    rmvbtn.onclick = function(){
      removeLastParticipant();
    }
    ptpbtn.appendChild(btn);
    ptpbtn.appendChild(rmvbtn);
  }

  window.scrollTo(0,document.body.scrollHeight);
}

function hideButtons(){
  var buttons = document.getElementsByClassName("ScheduleButton");
  for(var i = 0; i < buttons.length; i++){
    if(buttons[i].id == document.getElementById("courseDate").value){
      buttons[i].style.opacity = "1";
    }else{
      buttons[i].style.opacity = null;
    }
  }
}

function removeLastParticipant(){
  var participantDivs = document.getElementsByClassName("personDiv");
  participantDivs[participantDivs.length -1].remove();

  participantCount--;
  if(participantCount == 1){
    document.getElementById("RemoveParticipant").remove();
  }
}
