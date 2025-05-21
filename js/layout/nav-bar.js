// js/layout/nav-bar.js
$(function() {
    function initializeFlyout(buttonSelector, flyoutSelector, namespace) {
        const $button = $(buttonSelector);
        const $flyout = $(flyoutSelector); // Dinamik olarak butonun yanındaki eleman yerine ID ile de seçilebilir

        if ($button.length && $flyout.length) {
            // Başlangıç durumu
            $flyout.addClass('opacity-0 translate-y-1 hidden transition-all'); // Temel geçiş sınıfları

            const openFlyout = () => {
                $flyout.removeClass('hidden');
                // "Entering" geçişi
                $flyout.removeClass('ease-in duration-150 opacity-0 translate-y-1').addClass('ease-out duration-200 opacity-100 translate-y-0');
                $button.attr('aria-expanded', 'true');
                // Diğer açık flyoutları kapat (isteğe bağlı)
                // closeOtherFlyouts(namespace); 
                $(document).on('click.' + namespace, function(event) {
                    handleClickOutside(event, $button, $flyout, namespace, closeFlyout);
                });
            };

            const closeFlyout = () => {
                // "Leaving" geçişi
                $flyout.removeClass('ease-out duration-200 opacity-100 translate-y-0').addClass('ease-in duration-150 opacity-0 translate-y-1');
                $button.attr('aria-expanded', 'false');
                setTimeout(() => {
                    $flyout.addClass('hidden');
                }, 150); // duration-150
                $(document).off('click.' + namespace);
            };

            $button.on('click', function(event) {
                event.stopPropagation();
                const isExpanded = $(this).attr('aria-expanded') === 'true';
                if (isExpanded) {
                    closeFlyout();
                } else {
                    // Diğer açık flyoutları kapat (isteğe bağlı, aynı anda sadece birinin açık kalması için)
                    // Örneğin: $('.js-flyout-button[aria-expanded="true"]').not(this).each(function() { $(this).trigger('closeflyout'); });
                    openFlyout();
                }
            });
            // Buton için özel kapatma olayı (başka bir yerden tetiklemek için)
            // $button.on('closeflyout', closeFlyout); 
        }
    }
    
    function handleClickOutside(event, $button, $flyout, namespace, closeCallback) {
        if ($button.attr('aria-expanded') === 'true') {
            if (!$button.is(event.target) && $button.has(event.target).length === 0 &&
                !$flyout.is(event.target) && $flyout.has(event.target).length === 0) {
                closeCallback();
            }
        }
    }

    // Kategoriler Menüsü Başlatma
    initializeFlyout(
        'header nav .hidden.lg\\:flex .relative > button[aria-expanded]:contains("Kategoriler")', // Buton seçicisi
        'header nav .hidden.lg\\:flex .relative > button[aria-expanded]:contains("Kategoriler") + div', // Flyout seçicisi
        'kategorilerFlyout' // Namespace
    );

    // Hesabım Menüsü Başlatma
    initializeFlyout(
        '#account-menu-button', // Buton ID'si
        '#account-flyout',      // Flyout ID'si
        'hesabimFlyout'         // Namespace
    );


    // --- Mobil Menü ---
    const $mobileMenuOpenButton = $('header nav .lg\\:hidden > button:has(span.sr-only:contains("Ana menüyü aç"))');
    const $mobileMenuDialog = $('header > div.lg\\:hidden[role="dialog"]');
    const $mobileMenuBackdrop = $mobileMenuDialog.find('> .fixed.inset-0.z-10'); // Backdrop'u seç
    const $mobileMenuPanel = $mobileMenuDialog.find('> .fixed.inset-y-0.right-0.z-20'); // Panel'i seç
    const $mobileMenuCloseButton = $mobileMenuDialog.find('button:has(span.sr-only:contains("Menüyü kapat"))');

    if ($mobileMenuOpenButton.length && $mobileMenuDialog.length && $mobileMenuPanel.length) {
        $mobileMenuDialog.addClass('hidden'); // Başlangıçta tüm diyalog gizli

        const openMobileMenu = () => {
            $mobileMenuDialog.removeClass('hidden');
            // Panel için giriş animasyonu (Tailwind UI genellikle bu tür sınıfları kullanır)
            $mobileMenuPanel.removeClass('translate-x-full').addClass('translate-x-0');
            $mobileMenuBackdrop.removeClass('opacity-0').addClass('opacity-100');
             $('body').addClass('overflow-hidden'); // Arka plan kaymasını engelle
        };
        const closeMobileMenu = () => {
             $('body').removeClass('overflow-hidden');
            $mobileMenuPanel.removeClass('translate-x-0').addClass('translate-x-full');
            $mobileMenuBackdrop.removeClass('opacity-100').addClass('opacity-0');
            setTimeout(() => {
                $mobileMenuDialog.addClass('hidden');
            }, 300); // Animasyon süresiyle eşleşmeli
        };

        $mobileMenuOpenButton.on('click', openMobileMenu);
        $mobileMenuCloseButton.on('click', closeMobileMenu);
        $mobileMenuBackdrop.on('click', closeMobileMenu); // Backdrop'a tıklayınca kapat
    }

    // --- Mobil Menü İçindeki "Kategoriler" Açılır Alanı ---
    if ($mobileMenuDialog.length) {
        const $mobileDisclosureButton = $mobileMenuDialog.find('button[aria-controls="disclosure-categories-mobile"]');
        const $mobileDisclosureSubMenu = $('#disclosure-categories-mobile');
        const $mobileDisclosureIcon = $mobileDisclosureButton.find('svg');

        if ($mobileDisclosureButton.length && $mobileDisclosureSubMenu.length && $mobileDisclosureIcon.length) {
            $mobileDisclosureSubMenu.addClass('hidden'); // Başlangıçta gizli

            $mobileDisclosureButton.on('click', function() {
                const isExpanded = $(this).attr('aria-expanded') === 'true';
                if (isExpanded) {
                    $mobileDisclosureSubMenu.slideUp(200); // jQuery ile yumuşak kapanış
                    $(this).attr('aria-expanded', 'false');
                    $mobileDisclosureIcon.removeClass('rotate-180');
                } else {
                    $mobileDisclosureSubMenu.slideDown(200); // jQuery ile yumuşak açılış
                    $(this).attr('aria-expanded', 'true');
                    $mobileDisclosureIcon.addClass('rotate-180');
                }
            });
        }
    }
});