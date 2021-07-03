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
  document.getElementById("courseDate").value = document.getElementById("dates").value;


  initForm();
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
  for(var i = 0; i < tmp.length; i++){
    var opt = document.createElement("option");
    opt.value = tmp[i];
    opt.innerHTML = tmp[i];
    dates.appendChild(opt);
  }
  document.getElementById("courseId").value = document.getElementById("courses").value;
  document.getElementById("courseDate").value = document.getElementById("dates").value;
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
  var frm = document.getElementById("contactForm");

  var cname = document.createElement("input");
  cname.type ="text";
  cname.id="cname";
  cname.name="cname";

  cname.value ="test";
  cname.required = true;
  var lcname = document.createElement("label");
  lcname.for = "cname";
  lcname.innerHTML ="Company name: ";

  var cphone = document.createElement("input");
  cphone.type ="tel";
  cphone.id="cphone";
  cphone.name="cphone";

    cphone.value ="12345";
  cphone.required = true;
  var lcphone = document.createElement("label");
  lcphone.for = "cphone";
  lcphone.innerHTML ="Company phone: ";

  var cemail = document.createElement("input");
  cemail.type ="text";
  cemail.id="cemail";
  cemail.name="cemail";

    cemail.value ="test@test.se";
  cemail.required = true;
  var lcemail = document.createElement("label");
  lcemail.for = "cemail";
  lcemail.innerHTML ="Company email: ";

  frm.appendChild(document.createElement("br"));
  frm.appendChild(lcname);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(cname);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(lcphone);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(cphone);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(lcemail);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(cemail);
  frm.appendChild(document.createElement("br"));

}

var participantCount = 0;

function addPersonForm(){
  participantCount++;
  var frm = document.getElementById("contactForm");

  var fname = document.createElement("input");
  fname.type ="text";
  fname.id="fname";
  fname.name="fname[]";

  fname.value="Test";
  fname.required = true;
  var lfname = document.createElement("label");
  lfname.for = "fname";
  lfname.id = "lfname";
  lfname.innerHTML ="First name: ";

  var lname = document.createElement("input");
  lname.type ="text";
  lname.id="lname";
  lname.name="lname[]";

  lname.value="Testsson";
  lname.required = true;
  var llname = document.createElement("label");
  llname.for = "lname";
  llname.id = "llname";
  llname.innerHTML ="Last name: ";

  var pemail = document.createElement("input");
  pemail.type ="email";
  pemail.id="pemail";
  pemail.name="pemail[]";

  pemail.value="test@test.se";
  pemail.required = true;
  var lpemail = document.createElement("label");
  lpemail.for = "pemail";
  lpemail.id = "lpemail";
  lpemail.innerHTML ="Email: ";
  var pphone = document.createElement("input");
  pphone.type ="tel";
  pphone.id="pphone[]";

  pphone.value="12345";
  pphone.name="pphone[]";
  pphone.required = true;
  var lpphone = document.createElement("label");
  lpphone.for = "pphone";
  lpphone.id = "lpphone";
  lpphone.innerHTML ="phone: ";

  frm.appendChild(lfname);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(fname);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(llname);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(lname);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(lpemail);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(pemail);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(lpphone);
  frm.appendChild(document.createElement("br"));
  frm.appendChild(pphone);
  frm.appendChild(document.createElement("br"));

  var ptpbtn = document.getElementById("ParticipantButtons");
  if(participantCount == 1){
    if(document.getElementById("AddParticipant") != null) document.getElementById("AddParticipant").remove();
    var btn = document.createElement("button");
    btn.innerHTML  ="+ Add a participant";
    btn.id = "AddParticipant";
    //btn.onClick = addPersonForm();
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
    btn.onclick = function(){
      addPersonForm();
    }

    var rmvbtn = document.createElement("button");
    rmvbtn.innerHTML  ="- Remove a participant";
    rmvbtn.id = "RemoveParticipant";
    rmvbtn.onclick = function(){
      removeLastParticipant();
    }
    ptpbtn.appendChild(btn);
    ptpbtn.appendChild(rmvbtn);
  }
}

function removeLastParticipant(){
  var select = document.getElementById("contactForm");
  for(var i = 0; i < 16 ; i++){
    select.removeChild(select.lastChild);
  }
  participantCount--;
  if(participantCount == 1){
    document.getElementById("RemoveParticipant").remove();
  }
}
