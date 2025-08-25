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
    Cost: [
        "En burnout",
        "Sous pression",
        "Challengés",
        "Actif dans les tâches internes",
        "Equilibre vie pro / vie perso au top !"
    ],

    Time: [
        "No limit !",
        "Prenez le temps nécessaire",
        "Chiffrage réaliste",
        "Chiffrage optimiste",
        "Ce qu'on a vendu au client, rien de plus"
    ],

    Quality: [
        "Cassé",
        "Baclé",
        "Fonctionnel mais immaintenable",
        "Bon à 80 %",
        "A la perfection !"
    ],

    MaxTotal: 200
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
    let indice = Math.round(value * (config.Quality.length-1) / 100); 
    return config.Quality[indice];
}
function getTimeLabel(value) {
    let indice = Math.round(value * (config.Time.length-1) / 100); 
    return config.Time[indice];
}
function getCostLabel(value) {
    let indice = Math.round(value * (config.Cost.length-1) / 100); 
    return config.Cost[indice];
}

// Fonction pour ajuster les autres curseurs
function adjustOtherSliders(changedSlider) {
    const costVal = parseInt(costSlider.value);
    const timeVal = parseInt(timeSlider.value);
    const qualityVal = parseInt(qualitySlider.value);
    
    const currentTotal = costVal + timeVal + qualityVal;
    console.log("-----------");
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
        console.log("Début de la réduction");

        // Cas particulier : réduction de 1 → choisir un slider au hasard
        if (remainingReduction == 1) {
            const randomSlider = otherSliders[Math.floor(Math.random() * otherSliders.length)];
            randomSlider.value = Math.max(0, parseInt(randomSlider.value) - 1);
            console.log("Réduction aléatoire sur :", randomSlider.id);
        }else {
            // Première passe : réduire proportionnellement
            for (let slider of otherSliders) {
                console.log("--")
                console.log(slider.id)
                const currentValue = parseInt(slider.value);
                const reduction = Math.min(currentValue, Math.ceil(excess / otherSliders.length));
                console.log("Réduction restante = "+remainingReduction);
                console.log("currentvalue = "+currentValue)
                console.log(Math.ceil(remainingReduction / 2))
                console.log("reduction = "+reduction);
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
}

// Mise à jour des affichages
function updateDisplays() {
    const costVal = parseInt(costSlider.value);
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