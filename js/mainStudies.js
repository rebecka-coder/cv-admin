"use strict";
//Händelsehanterare för submit-knappen för lägg till studier, arbete samt projekt
document.getElementById('submitS').addEventListener('click', addStudies);


//Länk till webbtjänstens alla sidor för studier, arbete samt projekt
const urlStudies = 'http://studenter.miun.se/~reho0301/dt173g/cvprojekt/cv-webservice/studies.php';

//Funktion för JSON
//Lägg till utbildning/kurs, metod POST
function addStudies(e){
  e.preventDefault();

  let university = document.getElementById('university').value;
  let studyName = document.getElementById('studyName').value;
  let studyDate = document.getElementById('studyDate').value;

  document.getElementById('university').value = "";
  document.getElementById('studyName').value = "";
  document.getElementById('studyDate').value = "";

  fetch(urlStudies, { //Hämtar länk från webbtjänsten studies.php
    method: 'POST',
    body:JSON.stringify({university:university, studyName:studyName, studyDate:studyDate})
  })
  .then((res) => res.json()) 
  .then((data) => {
    console.log(data);
    getStudies();     //Kallar på funktionen för att hämta utbildning/kurser
  })
  .catch((err) => console.log(err))
}

//Hämta utbildning/kurser, metod GET
function getStudies(){
  fetch(urlStudies) //Hämtar länk från webbtjänsten studies.php
  .then((res) => res.json())
  .then((data) => {
      let outputS = ""; //Variabel för div klassen "output"
      //Loop för utskrift i tabellformat för utbildning/kurser, samt skapar knappar för uppdatera och radera (skickar med id)
      data.forEach(function(studies){
        outputS += `
        <tr>
        <td>${studies.university}</td>
        <td>${studies.studyName}</td>
        <td>${studies.studyDate}</td>
        <td><button onclick='updateStudies(${studies.id})'id="update">Uppdatera</button></td>
        <td><button onclick='delStudies(${studies.id})'id="delete">Radera</button></td>
        <span id="form${studies.id}"></span>
        </tr>
        `
      });
      document.getElementById('outputS').innerHTML = outputS;
    })
}
getStudies();//Kalla på funktionen hämta utbildning/kurser

//Uppdatera arbete, metod PUT
function updateStudies(id) { //skickar med id för rätt arbete
  //uppdateringsformulär
  let output = `
  <h3>Uppdatera: </h3><br/>
  <form id="updateForm">
  <label for="university">Lärosäte: </label>
  <input type="text" name="updateUniversity" id="updateUniversity" /> <br />
  <label for="studyName">Titel: </label>
  <input type="text" name="updateStudyName" id="updateStudyName" /> <br />
  <label for="studyDate">Start/slutdatum (månad/år): </label>
  <input type="text" name="updateStudyDate" id="updateStudyDate" /> <br />
  <p><input type="submit" class="updateS" id="${id}" value="Uppdatera"></p>
  </form>`

  document.getElementById("form" + id).innerHTML = output; //Skrivs ut på sidan

  //Händelsehanterare för uppdateringsknappen, skickar med rätt id
  document.getElementById(id).addEventListener('click', updateForm);

}
//Funktion för den nya uppdateringen
function updateForm(e) {
  e.preventDefault();
  let updateId = (e.target.id);

  //Sätter variabler för ny uppdatering
  let updateUniversity = document.getElementById('updateUniversity').value;
  let updateStudyName = document.getElementById('updateStudyName').value;
  let updateStudyDate = document.getElementById('updateStudyDate').value;
  
  let jsonStr = JSON.stringify({
    "id": updateId,
    "university": updateUniversity,
    "studyName": updateStudyName,
    "studyDate": updateStudyDate
  }
  );
  console.log(jsonStr);

  fetch(urlStudies, {
    method: 'PUT', 
    mode: 'cors',
    body: jsonStr
  })

  .then((res) => res.json()) 
    .then((data) => {
      console.log(data);
      getStudies();     //Kalla på funktionen hämta studier
    })
   .catch((err) => console.log(err))
}

//Radera utbildning/kurs, metod DELETE
function delStudies(id){ //skickar med id för rätt kurs

  fetch(urlStudies, { //Hämtar rätt länk från webbtjänsten studier
    method: 'DELETE',
    body:JSON.stringify({id:id})
  })
  .then((res) => res.json()) 
  .then((data) => {
    console.log(data);
    getStudies();     //Kalla på hämta utbildning/kurser
  })
  .catch((err) => console.log(err))
}