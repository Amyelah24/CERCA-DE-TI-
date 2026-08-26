document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initEmotions();
    initThemes();
});

// Sistema de Pestañas Moderno
function switchTab(tabId) {
    document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.add('hidden');
    });

    const targetView = document.getElementById(`tab-${tabId}`);
    if (targetView) {
        targetView.classList.remove('hidden');
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('bg-white', 'dark:bg-faith-700', 'shadow-sm');
            btn.classList.remove('text-faith-600', 'dark:text-faith-300');
        } else {
            btn.classList.remove('bg-white', 'dark:bg-faith-700', 'shadow-sm');
            btn.classList.add('text-faith-600', 'dark:text-faith-300');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modo Oscuro
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const htmlEl = document.documentElement;

    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    }

    toggleBtn.addEventListener('click', () => {
        if (htmlEl.classList.contains('dark')) {
            htmlEl.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlEl.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Emociones Interactivas
let currentSelectedEmotion = null;

function initEmotions() {
    const container = document.getElementById('emotionButtons');
    const emotionsMap = [
        { key: 'triste', label: 'Triste', icon: 'fa-cloud-rain' },
        { key: 'ansioso', label: 'Ansioso', icon: 'fa-wind' },
        { key: 'agradecido', label: 'Agradecido', icon: 'fa-hands-holding-child' },
        { key: 'sin_esperanza', label: 'Sin esperanza', icon: 'fa-cloud' },
        { key: 'confundido', label: 'Confundido', icon: 'fa-circle-question' },
        { key: 'enojado', label: 'Enojado', icon: 'fa-fire' },
        { key: 'direccion', label: 'Necesito dirección', icon: 'fa-compass' },
        { key: 'feliz', label: 'Feliz', icon: 'fa-sun' }
    ];

    container.innerHTML = emotionsMap.map(e => `
        <button onclick="selectEmotion('${e.key}')" class="p-4 rounded-2xl bg-white dark:bg-faith-800 border border-faith-200 dark:border-faith-700 hover:border-faith-600 dark:hover:border-faith-500 shadow-sm transition flex flex-col items-center justify-center gap-2 group">
            <i class="fa-solid ${e.icon} text-2xl text-faith-600 dark:text-faith-400 group-hover:scale-110 transition"></i>
            <span class="text-sm font-medium">${e.label}</span>
        </button>
    `).join('');
}

function selectEmotion(key) {
    const data = emotionsData[key];
    if (!data) return;
    currentSelectedEmotion = data;

    document.getElementById('emotionTag').textContent = data.tag;
    document.getElementById('emotionVerseTitle').textContent = data.title;
    document.getElementById('emotionVerseBody').textContent = data.verse;
    document.getElementById('emotionReflection').textContent = data.reflection;
    document.getElementById('emotionPrayer').textContent = data.prayer;

    document.getElementById('emotionResultCard').classList.remove('hidden');
}

function resetEmotion() {
    document.getElementById('emotionResultCard').classList.add('hidden');
}

// Temas Bíblicos
function initThemes() {
    const grid = document.getElementById('temas');
    grid.innerHTML = themesData.map(t => `
        <div onclick="alert('Tema: ${t.name}\\nVersículo: ${t.verse}\\nDescripción: ${t.desc}')" class="p-5 rounded-2xl bg-white dark:bg-faith-800 border border-faith-200 dark:border-faith-700 hover:border-faith-600 cursor-pointer transition text-center group shadow-sm">
            <h4 class="font-['Playfair_Display'] font-bold text-lg mb-1 group-hover:text-faith-600 transition">${t.name}</h4>
            <p class="text-xs text-faith-500 mb-1">${t.verse}</p>
            <p class="text-xs text-faith-600 dark:text-faith-400 italic">${t.desc}</p>
        </div>
    `).join('');
}

// Formulario Petición
function handlePrayerSubmit(e) {
    e.preventDefault();
    document.getElementById('prayerRequestForm').reset();
    const msg = document.getElementById('formSuccessMsg');
    msg.classList.remove('hidden');
    setTimeout(() => {
        msg.classList.add('hidden');
    }, 4000);
}