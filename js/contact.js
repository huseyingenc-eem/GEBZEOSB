// js/contact.js
document.addEventListener('DOMContentLoaded', function () {
    const switchButton = document.getElementById('privacy-switch');
    const hiddenCheckbox = document.getElementById('privacy-policy-checkbox');

    if (switchButton && hiddenCheckbox) {
        const switchCircle = switchButton.querySelector('span[aria-hidden="true"]');

        if (!switchCircle) {
            console.error('Switch button için hareketli daire (span[aria-hidden="true"]) bulunamadı.');
            return; // Daire yoksa devam etme
        }

        function updateSwitchVisuals(isChecked) {
            switchButton.setAttribute('aria-checked', isChecked.toString());
            if (isChecked) {
                switchButton.classList.remove('bg-gray-200');
                switchButton.classList.add('bg-indigo-600');
                switchCircle.classList.remove('translate-x-0');
                switchCircle.classList.add('translate-x-3.5');
            } else {
                switchButton.classList.remove('bg-indigo-600');
                switchButton.classList.add('bg-gray-200');
                switchCircle.classList.remove('translate-x-3.5');
                switchCircle.classList.add('translate-x-0');
            }
        }

        // Görsel butona tıklandığında
        switchButton.addEventListener('click', function () {
            // Checkbox'ın mevcut durumunu al ve tersine çevir
            const newCheckedState = !hiddenCheckbox.checked;
            hiddenCheckbox.checked = newCheckedState; // Checkbox'ın durumunu programatik olarak değiştir
            // Checkbox'ın 'change' event'i tetikleneceği için updateSwitchVisuals otomatik çağrılacak.
            // İsterseniz doğrudan da çağırabilirsiniz: updateSwitchVisuals(newCheckedState);
            // Ancak 'change' event'ini dinlemek daha merkezi bir kontrol sağlar.
            // Eğer 'change' event'i programatik değişikliklerde tetiklenmiyorsa (tarayıcıya göre değişebilir),
            // aşağıdaki satırı aktif hale getirin:
            // updateSwitchVisuals(newCheckedState);
        });

        // Gizli checkbox'ın durumu değiştiğinde (etikete tıklama veya JS ile değişiklik sonrası)
        hiddenCheckbox.addEventListener('change', function() {
            updateSwitchVisuals(this.checked);
        });

        // Sayfa yüklendiğinde anahtarın görselini checkbox'ın başlangıç durumuna göre ayarla
        updateSwitchVisuals(hiddenCheckbox.checked);
        
    } else {
        // Hangi elemanın bulunamadığını konsola yazdırarak hata ayıklamaya yardımcı ol
        if (!switchButton) {
            console.warn('ID\'si "privacy-switch" olan buton bulunamadı.');
        }
        if (!hiddenCheckbox) {
            console.warn('ID\'si "privacy-policy-checkbox" olan checkbox bulunamadı.');
        }
    }
});