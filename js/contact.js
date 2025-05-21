document.addEventListener('DOMContentLoaded', function () {
    // Switch/toggle düğmesini ve içindeki hareket eden daireyi seçiyoruz
    const switchButton = document.querySelector('button[role="switch"][aria-labelledby="switch-1-label"]');

    if (switchButton) {
        const switchCircle = switchButton.querySelector('span[aria-hidden="true"]');

        if (switchCircle) {
            switchButton.addEventListener('click', function () {
                // Mevcut durumu al (aria-checked attribute'u string döner)
                const isChecked = this.getAttribute('aria-checked') === 'true';

                if (isChecked) {
                    // Kapatma (Not Enabled durumu)
                    this.setAttribute('aria-checked', 'false');
                    this.classList.remove('bg-indigo-600'); // Aktif arka planını kaldır
                    this.classList.add('bg-gray-200');      // Pasif arka planını ekle

                    switchCircle.classList.remove('translate-x-3.5'); // Dairenin sağa kaymasını kaldır
                    switchCircle.classList.add('translate-x-0');        // Daireyi sola (başlangıç) pozisyonuna getir
                } else {
                    // Açma (Enabled durumu)
                    this.setAttribute('aria-checked', 'true');
                    this.classList.remove('bg-gray-200');      // Pasif arka planını kaldır
                    this.classList.add('bg-indigo-600');       // Aktif arka planını ekle

                    switchCircle.classList.remove('translate-x-0');        // Dairenin sol pozisyonunu kaldır
                    switchCircle.classList.add('translate-x-3.5');       // Daireyi sağa kaydır
                }
            });
        } else {
            console.warn('Switch button için hareketli daire (span) bulunamadı.');
        }
    }
    // Diğer form elemanları standart HTML davranışlarına sahip olduğu için ek JS gerektirmez.
    // Form gönderimi, doğrulama gibi işlemler için gerekirse buraya ek kod yazılabilir.
});