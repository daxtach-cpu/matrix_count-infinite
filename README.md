🟢 Matrix — Calcul Infini



Une simulation visuelle inspirée de The Matrix qui exécute un moteur de calcul mathématique infini — en temps réel, sans jamais s'arrêter.


✨ Fonctionnalités

🌧️ Pluie Matrix — pluie de caractères animée (katakana, chiffres, symboles mathématiques)
🔢 Calcul infini — moteur qui tourne sans fin avec des opérations de plus en plus complexes
📐 Formules géantes en fond — ∫, ∑, E=mc², e^(iπ)+1=0... qui défilent en arrière-plan
⚡ Accélération progressive — le moteur s'accélère automatiquement au fil du temps
📊 Tableau de bord en temps réel :

Opération active (addition, multiplication, GCD, XOR, racine carrée...)
Compteur d'opérations totales
Vitesse (ops/sec)
Résultat accumulé en BigInt (précision infinie)


📟 Effet CRT — scanlines, glow vert, coins de cadre, barre de statut
⏱️ Chronomètre, entropie, mémoire simulée


🧮 Types d'opérations calculées
SymboleOpération+Addition×Multiplication−SoustractionmodModulo^2Somme de carrés∑Somme de séquence√Racine carrée entière⊕XOR binaireGCDPlus grand commun diviseur<<Décalage de bits

🚀 Utilisation
Aucune installation requise. C'est du HTML/CSS/JS pur.
bash# Cloner le repo
git clone https://github.com/daxtach-cpu/matrix-count-infinite.git

# Ouvrir dans le navigateur
double-clic sur index.html
Ou utiliser Live Server dans VS Code pour un aperçu en direct.

📁 Structure
matrix-count-infinite/
├── index.html     # Structure + canvas
├── style.css      # Thème Matrix (vert sur noir, scanlines, glow)
└── script.js      # Moteur de calcul infini + animations

🛠️ Technologies

HTML5 Canvas — pour la pluie et les formules de fond
CSS3 — animations, backdrop-filter, conic-gradient, effet CRT
JavaScript Vanilla — BigInt pour les calculs à précision infinie, setInterval pour la boucle infinie


👨‍💻 Auteur
daxtach-cpu — Développeur autodidacte passionné par les interfaces visuelles et les projets qui sortent de l'ordinaire.


Projet réalisé from scratch — HTML, CSS, JS pur. Aucune librairie externe.
