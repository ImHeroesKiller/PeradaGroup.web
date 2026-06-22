function initOnlineNotifier() {
    let wasOffline = !navigator.onLine;

    const showOnlineToast = () => {
        const existing = document.getElementById('online-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'online-toast';
        toast.className = 'online-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML = '<i class="fa-solid fa-wifi" aria-hidden="true"></i><span>Koneksi kembali. Anda sudah online.</span>';
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('is-visible'));

        window.setTimeout(() => {
            toast.classList.remove('is-visible');
            window.setTimeout(() => toast.remove(), 350);
        }, 4000);
    };

    window.addEventListener('offline', () => {
        wasOffline = true;
    });

    window.addEventListener('online', () => {
        if (wasOffline) {
            wasOffline = false;
            showOnlineToast();
        }
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOnlineNotifier);
} else {
    initOnlineNotifier();
}