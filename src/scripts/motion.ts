import { animate, inView, scroll } from 'motion';

// Stop functions for the current page's observers and scroll links.
let cleanups: Array<() => void> = [];

const motionOn = () => document.documentElement.classList.contains('motion');

/** Adds .is-in once an element scrolls into view; CSS does the rest (see global.css). */
function initReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal], [data-draw]').forEach((el) => {
    cleanups.push(
      inView(
        el,
        () => {
          el.classList.add('is-in');
        },
        { amount: 0.2 },
      ),
    );
  });
}

function initCounts() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    let started = false;
    el.textContent = '0';
    cleanups.push(
      inView(
        el,
        () => {
          if (started) return;
          started = true;
          animate(0, target, {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
              el.textContent = Math.round(v).toLocaleString('en-US');
            },
          });
        },
        { amount: 0.6 },
      ),
    );
  });
}

function initScrollLinked() {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (bar) {
    cleanups.push(scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' })));
  }

  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  const line = timeline?.querySelector<HTMLElement>('[data-timeline-line]');
  if (timeline && line) {
    cleanups.push(
      scroll(animate(line, { scaleY: [0, 1] }, { ease: 'linear' }), {
        target: timeline,
        offset: ['start 0.75', 'end 0.6'],
      }),
    );
  }
}

/** Work-card figures lean a few pixels toward the pointer. */
function initTilt() {
  if (!matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (((e.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
      card.style.setProperty('--my', (((e.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--mx', '0');
      card.style.setProperty('--my', '0');
    });
  });
}

/** One underline that slides to whichever nav link is hovered or focused. */
function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const indicator = nav?.querySelector<HTMLElement>('[data-nav-indicator]');
  if (!nav || !indicator) return;

  const moveTo = (link: HTMLElement) => {
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    indicator.style.opacity = '1';
  };
  const hide = () => {
    indicator.style.opacity = '0';
  };

  nav.querySelectorAll<HTMLElement>('a').forEach((link) => {
    link.addEventListener('pointerenter', () => moveTo(link));
    link.addEventListener('focus', () => moveTo(link));
  });
  nav.addEventListener('pointerleave', hide);
  nav.addEventListener('focusout', hide);
}

function init() {
  cleanups.forEach((stop) => stop());
  cleanups = [];

  initNav();
  if (!motionOn()) return;

  initReveals();
  initCounts();
  initScrollLinked();
  initTilt();
}

// Fires on first load and after every client-side navigation.
document.addEventListener('astro:page-load', init);

// The toggle button is replaced on navigation, so listen on the document.
document.addEventListener('click', (e) => {
  if (!(e.target instanceof Element) || !e.target.closest('[data-theme-toggle]')) return;
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    // Storage can be blocked; the choice then lasts for this page only.
  }
});
