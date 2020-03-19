"use strict";
//Händelsehanterare för submit-knappen för lägg till studier, arbete samt projekt
document.getElementById('submitP').addEventListener('click', addProject);

//Länk till webbtjänstens alla sidor för studier, arbete samt projekt
const urlProject = 'http://studenter.miun.se/~reho0301/dt173g/cvprojekt/cv-webservice/projects.php';


//Lägg till projekt, metod POST
function addProject(e){
    e.preventDefault();
  
    let projectTitle = document.getElementById('projectTitle').value;
    let url = document.getElementById('url').value;
    let description = document.getElementById('description').value;

    //Nollställer formuläret när projekt läggs till
    document.getElementById('projectTitle').value = "";
    document.getElementById('url').value = "";
    document.getElementById('description').value = "";
  
    fetch(urlProject, {
      method: 'POST',
      body:JSON.stringify({projectTitle:projectTitle, url:url, description:description})
    })
    .then((res) => res.json()) 
    .then((data) => {
      console.log(data);
      getProject();     //Kallar på funktionen för att hämta projekt
    })
    .catch((err) => console.log(err))
  }

//Hämta projekt, metod GET
function getProject(){
    fetch(urlProject) //Hämtar länk från webbtjänsten projects.php
    .then((res) => res.json())
    .then((data) => {
        let outputP = ""; //Variabel för div klassen "output"
        //Loop för utskrift i tabellformat för projekt, samt skapar knappar för uppdatera och radera (skickar med id)
        data.forEach(function(project){
          outputP += `
          <tr>
          <td><img class='projectImg' src="images/${project.projectTitle}.png"/></td>
          <td>${project.projectTitle}</td>
          <td><a href='${project.url}'target="_blank">Webblänk</a></td>
          <td>${project.description}</td>
          <td><button onclick='updateProject(${project.id})'id="update">Uppdatera</button></td>
          <td><button onclick='delProject(${project.id})'id="delete">Radera</button></td>
          <span id="form${project.id}"></span>
          </tr>
          `;
        });
        document.getElementById('outputP').innerHTML = outputP;
      })
  }
  getProject(); //Kallar på funktionen för projekt

//Uppdatera arbete, metod PUT
function updateProject(id) { //skickar med id för rätt projekt
  //uppdateringsformulär
  let output = `
  <h3>Uppdatera: </h3><br/>
  <form id="updateForm">
  <label for="projectTitle">Titel: </label>
  <input type="text" name="updateProjectTitle" id="updateProjectTitle" /> <br />
  <label for="url">URL: </label>
  <input type="text" name="updateUrl" id="updateUrl" /> <br />
  <label for="description">Start/slutdatum (månad/år): </label>
  <input type="text" name="updateDescription" id="updateDescription" /> <br />
  <p><input type="submit" class="updateP" id="${id}" value="Uppdatera"></p>
  </form>`


  document.getElementById("form" + id).innerHTML = output; //Utskrift till adminsidan/webbplatsen

  //Händelsehanterare för uppdateringsknappen, skickar med rätt id
  document.getElementById(id).addEventListener('click', updateForm);

}
//Funktion för den nya uppdateringen
function updateForm(e) {
  e.preventDefault();
  let updateId = (e.target.id);

  //Sätter variabler för ny uppdatering
  let updateProjectTitle = document.getElementById('updateProjectTitle').value;
  let updateUrl = document.getElementById('updateUrl').value;
  let updateDescription = document.getElementById('updateDescription').value;
  
  //Skapar ny json-sträng
  let jsonStr = JSON.stringify({
    "id": updateId,
    "projectTitle": updateProjectTitle,
    "url": updateUrl,
    "description": updateDescription
  }
  );
  console.log(jsonStr);

  fetch(urlProject, {
    method: 'PUT', 
    mode: 'cors',
    body: jsonStr
  })

  .then((res) => res.json()) 
    .then((data) => {
      console.log(data);
      getProject();     //Kalla på funktionen hämta arbete
    })
   .catch((err) => console.log(err))
}

//Radera projekt, metod DELETE
function delProject(id){ //skickar med id för rätt projekt

    fetch(urlProject, { //Hämtar rätt länk från webbtjänsten projekt
      method: 'DELETE',
      body:JSON.stringify({id:id})
    })
    .then((res) => res.json()) 
    .then((data) => {
      console.log(data);
      getProject();     //Kalla på hämta projekt
    })
    .catch((err) => console.log(err))
}