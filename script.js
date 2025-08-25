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
    Quality5: "A la perfection !"
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
    if (value >= 0 && value <= 20) return config.Quality1;
    if (value >= 21 && value <= 40) return config.Quality2;
    if (value >= 41 && value <= 60) return config.Quality3;
    if (value >= 61 && value <= 80) return config.Quality4;
    if (value >= 81 && value <= 100) return config.Quality5;
    return value.toString();
}

function getTimeLabel(value) {
    if (value >= 0 && value <= 20) return config.Time1;
    if (value >= 21 && value <= 40) return config.Time2;
    if (value >= 41 && value <= 60) return config.Time3;
    if (value >= 61 && value <= 80) return config.Time4;
    if (value >= 81 && value <= 100) return config.Time5;
    return value.toString();
}

function getCostLabel(value) {
    if (value >= 0 && value <= 20) return config.Cost1;
    if (value >= 21 && value <= 40) return config.Cost2;
    if (value >= 41 && value <= 60) return config.Cost3;
    if (value >= 61 && value <= 80) return config.Cost4;
    if (value >= 81 && value <= 100) return config.Cost5;
    return value.toString();
}




const MAX_TOTAL = 200;

// Fonction pour ajuster les autres curseurs
function adjustOtherSliders(changedSlider) {
    const costVal = parseInt(costSlider.value);
    const timeVal = parseInt(timeSlider.value);
    const qualityVal = parseInt(qualitySlider.value);
    
    const currentTotal = costVal + timeVal + qualityVal;
    
    if (currentTotal > MAX_TOTAL) {
        const excess = currentTotal - MAX_TOTAL;
        
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
    const timeVal = parseInt(timeSlider.value);
    const qualityVal = parseInt(qualitySlider.value);
    
    // Mise à jour des labels à côté des curseurs
    costValue.textContent = getCostLabel(costVal);
    timeValue.textContent = getTimeLabel(timeVal);
    qualityValue.textContent = getQualityLabel(qualityVal);
    
    // Gestion des couleurs pour les labels des curseurs (rouge si très bas)
    costValue.className = costVal <= 20 ? 'slider-value negative' : 'slider-value';
    timeValue.className = timeVal <= 20 ? 'slider-value negative' : 'slider-value';
    qualityValue.className = qualityVal <= 20 ? 'slider-value negative' : 'slider-value';
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