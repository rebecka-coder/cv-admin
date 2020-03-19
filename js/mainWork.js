"use strict";
//Händelsehanterare för submit-knappen för lägg till studier, arbete samt projekt
document.getElementById('submitW').addEventListener('click', addWork);

//Länk till webbtjänstens alla sidor för studier, arbete samt projekt
const urlWork = 'http://studenter.miun.se/~reho0301/dt173g/cvprojekt/cv-webservice/work.php';

//Lägg till arbete, metod POST
function addWork(e){
    e.preventDefault();
  
    let workPlace = document.getElementById('workPlace').value;
    let workTitle = document.getElementById('workTitle').value;
    let workDate = document.getElementById('workDate').value;

    //Nollställer formuläret när kurs läggs till
    document.getElementById('workPlace').value = "";
    document.getElementById('workTitle').value = "";
    document.getElementById('workDate').value = "";
  
    fetch(urlWork, {
      method: 'POST',
      body:JSON.stringify({workPlace:workPlace, workTitle:workTitle, workDate:workDate})
    })
    .then((res) => res.json()) 
    .then((data) => {
      console.log(data);
      getWork();     //Kallar på funktionen för att hämta arbete
    })
    .catch((err) => console.log(err))
  }

//Hämta arbeten, metod GET
function getWork(){
    fetch(urlWork) //Hämtar länk från webbtjänsten work.php
    .then((res) => res.json())
    .then((data) => {
        let outputW = "";  //Variabel för div klassen "output"
        //Loop för utskrift i tabellformat för arbeten, samt skapar knappar för uppdatera och radera (skickar med id)
        data.forEach(function(work){ 
          outputW += `
          <td>${work.workPlace}</td>
          <td>${work.workTitle}</td>
          <td>${work.workDate}</td>
          <td><button onclick='updateWork(${work.id})'id="update">Uppdatera</button></td>
          <td><button onclick='delWork(${work.id})'id="delete">Radera</button></td>
          <span id="form${work.id}"></span>
          </tr>
          `;
        });
        document.getElementById('outputW').innerHTML = outputW;
      })
  }
  getWork(); //Kalla på funktionen hämta arbeten

//Uppdatera arbete, metod PUT
function updateWork(id) { //skickar med id för rätt arbete
  //Utskrift för uppdateringsformulär
  let output = `
  <h3>Uppdatera: </h3><br/>
  <form id="updateForms">
  <label for="workPlace">Arbetsplats: </label>
  <input type="text" name="updateWorkPlace" id="updateWorkPlace" /> <br />
  <label for="workTitle">Titel: </label>
  <input type="text" name="updateWorkTitle" id="updateWorkTitle" /> <br />
  <label for="workDate">Start/slutdatum (månad/år): </label>
  <input type="text" name="updateWorkDate" id="updateWorkDate" /> <br />
  <p><input type="submit" class="updateW" id="${id}" value="Uppdatera"></p>
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
  let updateWorkPlace = document.getElementById('updateWorkPlace').value;
  let updateWorkTitle = document.getElementById('updateWorkTitle').value;
  let updateWorkDate = document.getElementById('updateWorkDate').value;
  
  let jsonStr = JSON.stringify({
    "id": updateId,
    "workPlace": updateWorkPlace,
    "workTitle": updateWorkTitle,
    "workDate": updateWorkDate
  }
  );
  console.log(jsonStr);

  fetch(urlWork, {
    method: 'PUT', 
    mode: 'cors',
    body: jsonStr
  })

  .then((res) => res.json()) 
    .then((data) => {
      console.log(data);
      getWork();     //Kalla på funktionen hämta arbete
    })
   .catch((err) => console.log(err))
}
//Radera arbete, metod DELETE
function delWork(id){ //skickar med id för rätt arbete

    fetch(urlWork, { //Hämtar rätt länk från webbtjänsten arbeten
      method: 'DELETE',
      body:JSON.stringify({id:id})
    })
    .then((res) => res.json()) 
    .then((data) => {
      console.log(data);
      getWork();     //Kalla på hämta arbeten
    })
    .catch((err) => console.log(err))
  }