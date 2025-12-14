// Manejo de los botones de requisitos
(function(){
    const nextState = { pending: 'review', review: 'complete', complete: 'pending' };
    
    const stateText = {
        pending: { text: '• Pending', cls: 'status-pending' },
        review: { text: '⏳ Under Review', cls: 'status-review' },
        complete: { text: '✓ Completed', cls: 'status-complete' }
    };

    function loadStates() {
        const rows = document.querySelectorAll('.requirement-row');
        rows.forEach(row => {
            const key = row.getAttribute('data-key');
            const btn = row.querySelector('.status-btn');
            if (!key || !btn) return;
            const saved = localStorage.getItem('reqState_' + key);
            if (saved && stateText[saved]) {
                applyState(btn, saved);
            } else {
                const initial = btn.getAttribute('data-state') || 'pending';
                applyState(btn, initial);
            }
        });
    }

    function applyState(btn, state) {
        btn.classList.remove('status-pending','status-review','status-complete');
        btn.classList.add(stateText[state].cls);
        btn.setAttribute('data-state', state);
        btn.innerHTML = (state === 'complete' ? '✓ ' : (state === 'review' ? '⏳ ' : '• ')) + 
                       stateText[state].text.replace(/^[^ ]+ /,'').trim();
    }

    function saveState(key, state) {
        try {
            localStorage.setItem('reqState_' + key, state);
        } catch(e){
            // Ignorar errores de localStorage
        }
    }

    function initListeners() {
        const rows = document.querySelectorAll('.requirement-row');
        rows.forEach(row => {
            const btn = row.querySelector('.status-btn');
            const key = row.getAttribute('data-key');
            if (!btn || !key) return;
            btn.addEventListener('click', function(){
                const current = btn.getAttribute('data-state') || 'pending';
                const next = nextState[current] || 'pending';
                applyState(btn, next);
                saveState(key, next);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function(){
        loadStates();
        initListeners();
    });
})();

// Mostrar número de recibo desde URL
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const receiptDisplay = document.getElementById('receipt-display');
    if (receiptDisplay) {
        receiptDisplay.textContent = urlParams.get('receiptNumber') || 'IOE1234567890';
    }
});