// Sélectionne l'élément HTML avec l'ID 'communeSelect'
const communeSelect = document.getElementById('SelectVille');
const envoie = document.getElementById("envoie");
const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
const cp = document.getElementById("cp");
const SelectVille = document.getElementById("SelectVille");

const sectionDisplay = document.getElementById("affichage");

// Sélectionne l'élément HTML avec l'ID 'envoyer' et ajoute un écouteur d'événements 'click'
document.getElementById('envoyer').addEventListener('click',()=>{
    // Appelle la fonction de traitementMeteo lorsque le bouton est cliqué
    traitementMeteo();
});


//appelle fonction chercheCP pour liste commune

cp.addEventListener('change',()=>{
    let nb_cp = parseInt(cp.value)

    if(nb_cp > 9999){
        SelectVille.disabled = false
        chercheCP();
    }else{
        SelectVille.disabled = true
    }
});



//fonction qui gère la liste des communes 
//fonction qui gère la liste des communes 
function chercheCP() {
    SelectVille.innerHTML = ''; //vide le SelectVille pour éviter les bugs
    let url; //définie la variable url
    url = apiUrl + cp.value; //fusionne dans url Le contenue d'apiURL avec un code postal
    fetch(url) //utilise l'url obtenue pour le fetch, et mettre le tableau qu'il contient dans data
        .then(response => response.json())
        .then(data => {
            // Traitement des données renvoyées par l'API ici
            if (data && data.length >= 1) { //Si le nombre d'éléments de data est sup à 1, alors il y a au moins une ville
                data.forEach(v => { //parcours le tableau data. v prend la valeur de chaque ville
                    //crée un élément "option", qui va prendre une valeur égal au code postal, et un nom égal au nom de la ville
                    let option = document.createElement("option");
                    option.textContent = v.nom;
                    option.value = v.code;
                    SelectVille.appendChild(option)
                });
            }
        })
        .catch(error => { //gestion erreur
            console.error('Erreur lors de la requête : ', error);
        });
}


// Définit une fonction de traitement pour la météo
function traitementMeteo(){
    // Récupère la valeur sélectionnée dans la liste déroulante communeSelect
    const commune= communeSelect.value;
    if(commune!=null){
            // Effectue une requête fetch pour obtenir les données météorologiques
        fetch(`https://api.meteo-concept.com/api/forecast/daily/0?token=a40f714d88661e3a21d0b715f5867d5953a2231d2b9beefa5838800b5fc40d8d&insee=${commune}`).then(response=> 
            response.json().then(data => {
                console.log(data);
                document.getElementById('tMin').textContent=data.forecast.tmin; //met à jour la température minimal de la ville sélectionnée 
                document.getElementById('tMax').textContent=data.forecast.tmax; //met à jour la température maximal de la ville sélectionnée 
                document.getElementById('probabilite').textContent=data.forecast.probarain+ "%"; //met à jour la probabilité de pluie en % de la ville sélectionnée 
                document.getElementById('latitude').textContent=data.city.latitude; //met à jour la latitude de la ville sélectionnée 
                document.getElementById('longitude').textContent=data.city.longitude; //met à jour la longitude de la ville sélectionnée 
                let date= new Date(Date.now());
                document.getElementById('date').textContent=creer_date(date); //met à jour la date d'aujourd'hui de la ville sélectionnée 
                document.getElementById('ville').textContent=data.city.name; //met à jour le nom de la ville sélectionnée sur la page html 
                //document.getElementById('vitesse').textContent=data.forecast.wind10m+" km/h"; //met à jour la vitesse du vent de la ville sélectionnée 
                document.getElementById('tempsSoleil').textContent=data.forecast.sun_hours +" h"; //met à jour le temps d'ensoleillement de la ville sélectionnée 
                //document.getElementById('direction').textContent=data.forecast.dirwind10m+" °"; //met à jour le degrès de direction du vent de la ville sélectionnée 
                //document.getElementById('precipitation').textContent=data.forecast.rr10+" mm";//met à jour le cumul de pluie sur la journée en mm de la ville sélectionnée 
            })
        ).catch((err)=>console.log('Erreur : '+ err));
    }
}

function creer_date(date){
    let chaine_date = "";

    //Ajout du jour de la semaine
    if(date.getDay()== 1){
        chaine_date += "Lundi";
    }else if(date.getDay()== 2){
        chaine_date += "Mardi";
    }else if(date.getDay()== 3){
        chaine_date += "Mercredi";
    }else if(date.getDay()== 4){
        chaine_date += "Jeudi";
    }else if(date.getDay()== 5){
        chaine_date += "Vendredi";
    }else if(date.getDay()== 6){
        chaine_date += "Samedi";
    }else if(date.getDay()== 7){
        chaine_date += "Dimanche";
    }

    //Ajout du numéro du jour dans le mois
    chaine_date += " " + date.getUTCDate(); 

    //Ajout du mois
    switch(date.getMonth() + 1){
        case 1: chaine_date += " " + "Janvier";
        break;
        case 2: chaine_date += " " + "Février";
        break;
        case 3: chaine_date += " " + "Mars";
        break;
        case 4: chaine_date += " " + "Avril";
        break;
        case 5: chaine_date += " " + "Mai";
        break;
        case 6: chaine_date += " " + "Juin";
        break;
        case 7: chaine_date += " " + "Juillet";
        break;
        case 8: chaine_date += " " + "Août";
        break;
        case 9: chaine_date += " " + "Septembre";
        break;
        case 10: chaine_date += " " + "Octobre";
        break;
        case 11: chaine_date += " " + "Novembre";
        break;
        case 12: chaine_date += " " + "Décembre";
    }

    //Ajout de l'année
    chaine_date += " " + date.getFullYear();

    return chaine_date;
}

function scrollALaSection2() {
    sectionDisplay.classList.add("affichage");
    sectionDisplay.classList.remove("affichageNone");

    const section2 = document.getElementById('section2');
    section2.scrollIntoView({ behavior: 'smooth' });
}

//Affichage de la longitude
if(localStorage.getItem('longitude') == 'true'){
    document.getElementById('caseCoordonnees').classList.remove("donnees-sup-none");
    document.getElementById('caseCoordonnees').classList.add("donnees-sup-grid");
    document.getElementById('long').style.display = 'block';
}
else if(localStorage.getItem('longitude') == 'false'){
    document.getElementById('long').style.display = 'none';
}

//Affichage de la latitude
if(localStorage.getItem('latitude') == 'true'){
    document.getElementById('caseCoordonnees').classList.remove("donnees-sup-none");
    document.getElementById('caseCoordonnees').classList.add("donnees-sup-grid");
    document.getElementById('lat').style.display = 'block';
}
else if(localStorage.getItem('latitude') == 'false'){
    document.getElementById('lat').style.display = 'none';
}

//Affichage de la direction du vent
if(localStorage.getItem('direction') == 'true'){
    document.getElementById('caseVent').classList.remove("donnees-sup-none");
    document.getElementById('caseVent').classList.add("donnees-sup-grid");
    document.getElementById('dire').style.display = 'block';
}
else if(localStorage.getItem('direction') == 'false'){
    document.getElementById('dire').style.display = 'none';
}

//Affichage de la vitesse du vent
if(localStorage.getItem('vitessse') == 'true'){
    document.getElementById('caseVent').classList.remove("donnees-sup-none");
    document.getElementById('caseVent').classList.add("donnees-sup-grid");
    document.getElementById('vite').style.display = 'block';
}
else if(localStorage.getItem('vitesse') == 'false'){
    document.getElementById('vite').style.display = 'none';
}

//Affichage de la probabilité de pluie
if(localStorage.getItem('probabilite') == 'true'){
    document.getElementById('casePluie').classList.remove("donnees-sup-none");
    document.getElementById('casePluie').classList.add("donnees-sup-grid");
    document.getElementById('proba').style.display = 'block';
}
else if(localStorage.getItem('probabilite') == 'false'){
    document.getElementById('proba').style.display = 'none';
}

//Affichage de la précipitation
if(localStorage.getItem('precipitation') == 'true'){
    document.getElementById('casePluie').classList.remove("donnees-sup-none");
    document.getElementById('casePluie').classList.add("donnees-sup-grid");
    document.getElementById('prec').style.display = 'block';
}
else if(localStorage.getItem('precipitation') == 'false'){
    document.getElementById('prec').style.display = 'none';
}
