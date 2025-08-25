/** TODO
 * Faire un gradient de couleur en fonction de la taille.
 * Mettre en place un système automatique où les lignes s'adaptent au nombre d'éléments que je mets dans les tableaux (Cost, Time et Quality)
    * Il doit s'adapter à la pondération de chacun des curseurs 
    * Un curseurs avec 3 éléments est plus dur à reculer qu'un curseur avec 18 éléments.
        * Remettre tous les sliders de 0 à 100 pour faciliter la réduction
        * Faire le rapport indice/Length pour obtenir le wording à afficher.
 */

//Object de configuration
const config = {
    Cost1: "En burnout",
    Cost2: "Sous pression",
    Cost3: "Challengés",
    Cost4: "Actif dans les tâches internes",
    Cost5: "Equilibre vie pro / vie perso au top !",

    Time1: "No limit !",
    Time2: "Prenez le temps nécessaire",
    Time3: "Chiffrage réaliste",
    Time4: "Chiffrage optimiste",
    Time5: "Ce qu'on a vendu au client, rien de plus",

    Quality1: "Cassé",
    Quality2: "Baclé",
    Quality3: "Fonctionnel mais immaintenable",
    Quality4: "Bon à 80 %",
    Quality5: "A la perfection !",

    MaxTotal: 10
};

// Récupération des éléments
const costSlider = document.getElementById('cost-slider');
const timeSlider = document.getElementById('time-slider');
const qualitySlider = document.getElementById('quality-slider');

const costValue = document.getElementById('cost-value');
const timeValue = document.getElementById('time-value');
const qualityValue = document.getElementById('quality-value');

const costLabel = document.getElementById('cost-label');
const timeLabel = document.getElementById('time-label');
const qualityLabel = document.getElementById('quality-label');


// Fonctions pour convertir les valeurs en texte
function getQualityLabel(value) {
    switch(value){
        case 1:
            return config.Quality1;
            break;
        case 2:
            return config.Quality2;
            break;
        case 3:
            return config.Quality3;
            break;
        case 4:
            return config.Quality4;
            break;
        case 5:
            return config.Quality5;
            break;
    }
}
function getTimeLabel(value) {
    switch(value){
        case 1:
            return config.Time1;
            break;
        case 2:
            return config.Time2;
            break;
        case 3:
            return config.Time3;
            break;
        case 4:
            return config.Time4;
            break;
        case 5:
            return config.Time5;
            break;
    }
}
function getCostLabel(value) {
    switch(value){
        case 1:
            return config.Cost1;
            break;
        case 2:
            return config.Cost2;
            break;
        case 3:
            return config.Cost3;
            break;
        case 4:
            return config.Cost4;
            break;
        case 5:
            return config.Cost5;
            break;
    }
}

// Fonction pour ajuster les autres curseurs
function adjustOtherSliders(changedSlider) {
    const costVal = parseInt(costSlider.value);
    const timeVal = parseInt(timeSlider.value);
    const qualityVal = parseInt(qualitySlider.value);
    
    const currentTotal = costVal + timeVal + qualityVal;
    console.log("Total = " + currentTotal);
    
    if (currentTotal > config.MaxTotal) {
        const excess = currentTotal - config.MaxTotal;
        console.log("Excès = "+excess);
        
        // Identifier les deux autres curseurs
        let otherSliders = [];
        if (changedSlider !== costSlider) otherSliders.push(costSlider);
        if (changedSlider !== timeSlider) otherSliders.push(timeSlider);
        if (changedSlider !== qualitySlider) otherSliders.push(qualitySlider);
        
        // Répartir la réduction sur les deux autres curseurs
        let remainingReduction = excess;
        
        // Première passe : réduire proportionnellement
        for (let slider of otherSliders) {
            const currentValue = parseInt(slider.value);
            const reduction = Math.min(currentValue, Math.ceil(remainingReduction / 2));
            slider.value = currentValue - reduction;
            remainingReduction -= reduction;
            
            if (remainingReduction <= 0) break;
        }
        
        // Deuxième passe : si il reste encore de la réduction à faire
        for (let slider of otherSliders) {
            if (remainingReduction <= 0) break;
            const currentValue = parseInt(slider.value);
            const reduction = Math.min(currentValue, remainingReduction);
            slider.value = currentValue - reduction;
            remainingReduction -= reduction;
        }
    }
}

// Mise à jour des affichages
function updateDisplays() {
    const costVal = parseInt(costSlider.value);
    console.log(costVal)
    const timeVal = parseInt(timeSlider.value);
    const qualityVal = parseInt(qualitySlider.value);
    
    // Mise à jour des labels à côté des curseurs
    costValue.textContent = getCostLabel(costVal);
    timeValue.textContent = getTimeLabel(timeVal);
    qualityValue.textContent = getQualityLabel(qualityVal);
    
    // Gestion des couleurs pour les labels des curseurs (rouge si très bas)
    costValue.className = costVal == 1 ? 'slider-value negative' : 'slider-value';
    timeValue.className = timeVal == 1 ? 'slider-value negative' : 'slider-value';
    qualityValue.className = qualityVal == 1 ? 'slider-value negative' : 'slider-value';
}

// Écouteurs d'événements avec ajustement automatique
costSlider.addEventListener('input', function() {
    adjustOtherSliders(this);
    updateDisplays();
});
timeSlider.addEventListener('input', function() {
    adjustOtherSliders(this);
    updateDisplays();
});
qualitySlider.addEventListener('input', function() {
    adjustOtherSliders(this);
    updateDisplays();
});

// Initialisation
updateDisplays();