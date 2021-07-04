var invoices = new Array();

function addInvoice(courseDate, courseName, company, companyEmail, companyPhone, attendees){

  var invoice = new Array();
  invoice.courseDate = courseDate;
  invoice.courseName = courseName[0];
  invoice.company = company;
  invoice.companyEmail = companyEmail[0];
  invoice.companyPhone = companyPhone;
  invoice.attendees = new Array();

  for(var i = 0; i < attendees.length; i++){
    var attendee = new Object();
    attendee.name = attendees[i][0] + " " + attendees[i][1];
    attendee.email = attendees[i][2];
    attendee.phone = attendees[i][3];
    invoice.attendees.push(attendee);
  }
  invoices.push(invoice);
  loadInvoice(invoices.length-1);
}


/**
* Summary. This method loads elements to the invoice table.
*/
function loadFiles(){
  for( i = 0; i < 7; i++){
    loadInvoice("Checking", "1267451**** - WOLFE", "Active", "USD", "$6266.33");
    loadInvoice("Saving", "5719371**** - MAENGUNE", "Active", "USD", "$10998.10");
    loadInvoice("Saving", "7125781**** - KAISER", "Deactivated", "USD", "$23.86");
    }
}

/**
* Summary.
* @param {Integer} id id of the invoice.
*/
function loadInvoice(id){
    var table = document.getElementById("invoices");
    var row, cell1, cell2, cell3, cell4;
    row = table.insertRow(1); //Insert a new row into the invoice table.
    cell1 = row.insertCell(0); //Insert a cell in position 0 on the row.
    cell2 = row.insertCell(1); //Insert a cell in position 1 on the row.
    cell3 = row.insertCell(2); //Insert a cell in position 2 on the row.
    cell4 = row.insertCell(3); //Insert a cell in position 3 on the row.
    cell1.innerHTML = invoices[id].courseDate; //write date into the cell.
    cell2.innerHTML = invoices[id].courseName; //write course into the cell.
    cell3.innerHTML = invoices[id].company; //write company into the cell.
    cell4.innerHTML = invoices[id].attendees.length; //write attendees into the cell.
    'use strict';
    //Add an onclick attribute to the row. If the user clicks on it it should display its contents into the infoFrame.
    row.setAttribute('onclick', "(function(){displayInvoice(" + id +");})()");
}

/**
* Summary. The main sorting function. When first called, the function sorts all
* content in a specified column of the table in descending order. If the column
* is already sorted it will sort the column in ascending order.
* @param {int} column the index of the column to be sorted.
*/
function sortBy(column){
  var table, rows, switching, i, x, y, shouldSwitch, numberOfSwitches, descending; //begin varuable listing
  numberOfSwitches = 0; //Initialize the counting of switches.
  descending = false;
  table = document.getElementById("invoices"); //Save the invoice table to a variable.
  switching = true; //Initialize switching.
  while(switching){
    switching = false; //initialize switching as false.
    rows = table.rows; //get rows from invoice table.
    for(i = 1; i < (rows.length - 1); i++){ //cycle through each row.
      shouldSwitch = false; //Initialize shouldSwitch value to false.
      x = rows[i].cells[column]; //Retrieve the value of the cell in the current row in the selected column.
      y = rows[i + 1].cells[column]; //Retrieve the value of the cell in the next row un the selected column.
      if(column < 4){ //If the cell isn't under the "amount" category.
        if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){ //Compare the two cells.
          shouldSwitch = true; //If the two cells are not in the correct order, make a note to switch them later.
          numberOfSwitches = numberOfSwitches+1; //Add number of switches performed.
          descending = true;
          break;
        }
      }else{ //Special case for the "amount" column.
        if(parseInt(x.innerHTML.substr(1)) < parseInt(y.innerHTML.substr(1))){ //Compare the values of two amount cells.
          shouldSwitch = true;
          numberOfSwitches = numberOfSwitches+1;
          descending = true;
          break;
        }
      }
    }
    if(shouldSwitch){ //If the two rows are instructed to be switched.
      rows[i].parentNode.insertBefore(rows[i+1], rows[i]); //Switch rows;
      switching = true;
    }
  }
  if(numberOfSwitches == 0){ //If the column is already sorted in descending order, sort it in ascending order.
    //This part of the function is identical to the sorting program above, but reverses the sorting order.
    switching = true;
    while(switching){
      switching = false;
      rows = table.rows;
      for(i = 1; i < (rows.length - 1); i++){
        shouldSwitch = false;
        x = rows[i].cells[column];
        y = rows[i + 1].cells[column];
        if(column < 4){
          if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){ //compare the two cells (reverse)
            shouldSwitch = true;
            descending = false;
            break;
          }
        }else{
          if(parseInt(x.innerHTML.substr(1)) > parseInt(y.innerHTML.substr(1))){ //Compare the values of two amount cells (reverse).
            shouldSwitch = true;
            break;
          }
        }
      }
      if(shouldSwitch){
        rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
        switching = true;
        descending = false;
      }
    }
  }
  changeSortingArrow(column, descending); //Changes the current arrow character in the first row to reflect which way the column is sorted (ascending/descending).
}

/**
* Summary. This function changes the direction of the arrows in the invoice table to reflect if the sorting is in ascending or descending order.
* @param {int} column the column which has been pressed.
* @param {boolean} descending information regarding wether the list is in ascending or descending order.
*/
function changeSortingArrow(column, descending){
  var cell, upArrow, downArrow, row, i; //variable listing
  upArrow = "&#9653;"; //character which represents the up arrow
  downArrow = "&#9663;"; //character which represents the down arrow
  row = document.getElementById("invoices").rows[0]; //Recieve the first row of the invoice table
    for(i = 0; i < row.cells.length; i++){ //Cycle through all of the cells in the first row
      cell = row.cells[i]; //Save current cell as variable cell.
      if(i == column){ //If current cell is the one pressed then do the following.
        var tmp = cell.innerHTML; //Save the innerHTML as a variable.
        tmp = tmp.substring(0, tmp.length-1); //Make a substring out of the innerHTML and remove the last symbol.
        if(descending){ //If the list is sorted in descending order:
          tmp = tmp + downArrow; //Change arrow to point down.
        }else{ //If the list is in ascending order:
          tmp = tmp + upArrow; //Change arrow to point up.
        }
        cell.innerHTML = tmp; //Replace current innerHTML of the cell to the updated one.
      }else{ //If the current cell isn't the one pressed then do the following:
        var tmp = cell.innerHTML; //Save the innerHTML as a variable.
        tmp = tmp.substring(0, tmp.length-1); //Make a substring out of the innerHTML and remove the last symbol.
        tmp = tmp + downArrow; //Replace last symbol with an up arrow (default).
        cell.innerHTML = tmp; //Replace current innerHTML of the cell to the updated one.
      }
    }
}

/**
* Summary. When called, this function hide the infoframe.
*/
function hideInfoFrame(){
    document.getElementsByClassName("infoFrame")[0].style.visibility = 'hidden'; //Setting infoframe visibility to "hidden"
    document.getElementById("X").style.visibility='hidden'; //Setting the X visibility to "hidden"
    document.getElementById("X").style.opacity = 0; //Set X opacity to 0;
    document.getElementsByClassName("infoFrame")[0].style.opacity = 0; //Set infoFrame to 0;
}

/**
* Summary. When called, this function takes the content of the clicked row
* and display them in the infobox.
* @param {Integer} id invoice id.
*/
function displayInvoice(id){
  var infoFrame = document.getElementsByClassName("infoFrame")[0];
  var infoFrameText = document.getElementsByClassName("infoFrameText")[0];
  infoFrame.innerHTML="";
  infoFrameText = document.createElement("div");
  infoFrameText.classList.add( "infoFrameText");


  var infoRow = document.createElement("div");
  infoRow.classList.add( "infoRow");

  var infoBox = document.createElement("div");
  infoBox.classList.add( "infoBox");
  infoBox.id = "LDivider";

  var content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = "<b>Company: <b><br><hr class='divider'>";
  infoBox.appendChild(content);

  infoRow.appendChild(infoBox);
  infoFrameText.appendChild(infoRow);

  //Company name
  var infoRow = document.createElement("div");
  infoRow.classList.add("infoRow");

  var infoBox = document.createElement("div");
  infoBox.classList.add("infoBox");
  infoBox.id = "CName";

  var content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = invoices[id].company;
  infoBox.appendChild(content);

  infoRow.appendChild(infoBox);
  infoFrameText.appendChild(infoRow);

  //Company email
  var infoRow = document.createElement("div");
  infoRow.classList.add( "infoRow");

  var infoBox = document.createElement("div");
  infoBox.classList.add( "infoBox");
  infoBox.id = "CEmail";

  var content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = invoices[id].companyEmail;
  infoBox.appendChild(content);

  infoRow.appendChild(infoBox);
  infoFrameText.appendChild(infoRow);

  //Company phone
  var infoRow = document.createElement("div");
  infoRow.classList.add( "infoRow");

  var infoBox = document.createElement("div");
  infoBox.classList.add( "infoBox");
  infoBox.id = "CPhone";

  var content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = invoices[id].companyPhone  + "<br><hr class='divider'>";
  infoBox.appendChild(content);

  infoRow.appendChild(infoBox);
  infoFrameText.appendChild(infoRow);


//Divider
  var infoRow = document.createElement("div");
  infoRow.classList.add( "infoRow");

  var infoBox = document.createElement("div");
  infoBox.classList.add( "infoBox");
  infoBox.id = "LDivider";

  var content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = "<b>Participants: <b><br><hr class='divider'>";
  infoBox.appendChild(content);

  infoRow.appendChild(infoBox);
  infoFrameText.appendChild(infoRow);



  for(var i = 0; i < invoices[id].attendees.length; i++){
    //Person name
    var infoRow = document.createElement("div");
    infoRow.classList.add("infoRow");

    var infoBox = document.createElement("div");
    infoBox.classList.add("infoBox");
    infoBox.id = "PName";

    var content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = invoices[id].attendees[i].name;
    infoBox.appendChild(content);

    infoRow.appendChild(infoBox);
    infoFrameText.appendChild(infoRow);

    //Person email
    var infoRow = document.createElement("div");
    infoRow.classList.add( "infoRow");

    var infoBox = document.createElement("div");
    infoBox.classList.add( "infoBox");
    infoBox.id = "PEmail";

    var content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = invoices[id].attendees[i].email;
    infoBox.appendChild(content);

    infoRow.appendChild(infoBox);
    infoFrameText.appendChild(infoRow);

    //Person phone
    var infoRow = document.createElement("div");
    infoRow.classList.add( "infoRow");

    var infoBox = document.createElement("div");
    infoBox.classList.add( "infoBox");
    infoBox.id = "PPhone";

    var content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = invoices[id].attendees[i].phone  + "<br><hr class='divider'>";
    infoBox.appendChild(content);

    infoRow.appendChild(infoBox);
    infoFrameText.appendChild(infoRow);
  }
  //Finish
  infoFrame.appendChild(infoFrameText);

  //var type, accountName, status, currency, balance, notes; //begin variable listing.
  document.getElementsByClassName("infoFrame")[0].style.visibility = 'visible'; //Set infoFrame visible.
  //document.getElementById("X").style.visibility='visible'; //Set X visible.
  //document.getElementById("X").style.opacity = 0.6; //Set x opacity to 0.6.
  document.getElementsByClassName("infoFrame")[0].style.opacity = 1; //Set infoframe opacity to 1.
  //type = document.getElementById("type").children[1]; //Recieve type element from info frame.
  //accountName = document.getElementById("accountName").children[1]; //Recieve accountName element from info frame.
  //status = document.getElementById("status").children[1]; //Recieve status element from info frame.
  //currency = document.getElementById("currency").children[1]; //Recieve currency element from info frame.
  //balance = document.getElementById("balance").children[1]; //Recieve balance element from info frame.
  //notes = document.getElementById("notes").children[1]; //Recieve notes element from info frame.
  //type.innerHTML = a; //set type to type from row.
  //document.getElementsByClassName("accountName")[0].innerHTML = b; //Set header for the info box to the account name
  //accountName.innerHTML = b; //set accountName to accountName from row.
  //status.innerHTML = c; //set status to status from row.
  //currency.innerHTML = d; //set currency to currency from row.
  //balance.innerHTML = e; //set balance to balance from row.
  //notes.innerHTML = "Lorem ipsum dolor sit amet, viris blandit mediocrem id."; //set notes to whatever.
}
