/** TODO
 * Faire un gradient de couleur en fonction de la taille.
 * Faire en sorte que l'ajustement fonctionne quelque soit la longueur du slider.
 * Modifier la longueur du slider dans le HTML pour qu'il corresponde à la longueur du tableau.
 */

//Object de configuration
let config = {
    Title: "Je veux mon projet :",

    Cost: [
        "😵 En burnout",
        "😰 Sous pression",
        "😐 Challengés",
        "😄 Actif dans les tâches internes",
        "🤩 Equilibre vie pro / vie perso au top !"
    ],

    Time: [
        "📉 Faillite",
        "Chiffrage large",
        "Chiffrage réaliste",
        "Chiffrage optimiste",
        "0 Dépassement"
    ],

    Quality: [
        "10% 🤢 (Cassé)",
        "30% 🙈 (Fonctionnel mais immaintenable)",
        "50% 😶‍🌫️ (Fonctionnel)",
        "80% 😮 (Fonctionnel + Cas limites)",
        "100% 😎 (Perfection)"
    ]
};

let MaxTotal = 0;

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
    let indice = Math.round(value);
    return config.Quality[indice];
}
function getTimeLabel(value) {
    let indice = Math.round(value); 
    return config.Time[indice];
}
function getCostLabel(value) {
    let indice = Math.round(value); 
    return config.Cost[indice];
}

// Fonction pour ajuster les autres curseurs
function adjustOtherSliders(changedSlider) {
    const costVal = parseInt(costSlider.value);
    const timeVal = parseInt(timeSlider.value);
    const qualityVal = parseInt(qualitySlider.value);
    
    const currentTotal = costVal + timeVal + qualityVal;
    
    if (currentTotal > MaxTotal) {
        const excess = currentTotal - MaxTotal;
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
    
    costValue.className = 
        costVal == 0 ? 'slider-value negative' :
        costVal == 4 ? 'slider-value positive' :
        'slider-value';

    timeValue.className = 
        timeVal == 0 ? 'slider-value negative' :
        timeVal == 4 ? 'slider-value positive' :
        'slider-value';

    qualityValue.className = 
        qualityVal == 0 ? 'slider-value negative' :
        qualityVal == 4 ? 'slider-value positive' :
        'slider-value';
}

function updateSlidersFromConfig() {
    const sliders = [
        { id: "cost-slider", key: "Cost" },
        { id: "time-slider", key: "Time" },
        { id: "quality-slider", key: "Quality" }
    ];

    sliders.forEach(slider => {
        const input = document.getElementById(slider.id);
        if (!input) return;

        const maxValue = config[slider.key].length - 1; // max = taille du tableau -1
        input.max = maxValue;
        input.value = Math.floor(maxValue / 2); // value = max/2

        console.log(`Slider ${slider.id}: max=${input.max}, value=${input.value}`);
        console.log(input)

        MaxTotal += parseInt(input.max); // assure-toi que c'est un nombre
    });

    MaxTotal = (MaxTotal * 2) / 3;
    console.log("maxtotal = " + MaxTotal);
}

function updateTitleFromConfig() {
    document.querySelector(".title").textContent = config.Title;
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


window.addEventListener("DOMContentLoaded", () => {
    updateSlidersFromConfig();
    updateTitleFromConfig();
    updateDisplays();
});