// Mobilmeny: åpne og lukke hovedmenyen
(function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('hovedmeny');
    if (!toggle || !nav) return;

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', String(open));
        nav.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 760) setOpen(false);
    });
})();

// Myk inntoning av innhold når det scrolles inn i bildet
(function () {
    var groups = [
        '.section-title', '.about-text', '.page-intro',
        '.skill-grid > *', '.video-frame', '.team-grid > *', '.section-intro', '.member-card', '.contact-primary',
        '.project-section-title', '.project-grid > *', '.soon-card', '.bachelor-card', '.bachelor-steps > *',
        '.cta-band h2', '.cta-band p', '.cta-band .btn'
    ];
    var els = document.querySelectorAll(groups.join(','));
    if (!('IntersectionObserver' in window)) return;

    els.forEach(function (el) {
        el.classList.add('reveal');
        // Små forsinkelser så kort i samme rad kommer etter hverandre
        var parent = el.parentElement;
        if (parent && (parent.classList.contains('skill-grid') || parent.classList.contains('team-grid') || parent.classList.contains('project-grid'))) {
            var i = Array.prototype.indexOf.call(parent.children, el);
            el.style.setProperty('--delay', (i % 3) * 70 + 'ms');
        }
    });

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
})();

// Skygge under menyen når man har scrollet
(function () {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function update() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', update, { passive: true });
    update();
})();
