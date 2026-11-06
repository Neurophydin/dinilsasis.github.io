(() => {
  'use strict';
  const data = window.RESEARCH_CONTENT;
  if (!data) return;
  const one = (selector) => document.querySelector(selector);
  const all = (selector) => [...document.querySelectorAll(selector)];

  const menu = one('.menu-toggle');
  const nav = one('#main-nav');
  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
  });
  all('#main-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });

  const topicButtons = all('.research-topic');
  function selectTopic(button, focus = false) {
    const topic = data.topics[button.dataset.topic];
    if (!topic) return;
    topicButtons.forEach(item => {
      const selected = item === button;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    one('#research-panel').setAttribute('aria-labelledby', button.id);
    one('#panel-kicker').textContent = topic.kicker;
    one('#panel-title').textContent = topic.title;
    one('#panel-description').textContent = topic.description;
    one('.panel-graphic > span').textContent = topic.graphicLabel;
    one('#panel-tags').replaceChildren(...topic.tags.map(tag => {
      const element = document.createElement('span');
      element.textContent = tag;
      return element;
    }));
    if (focus) button.focus();
  }
  topicButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectTopic(button));
    button.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowDown') target = (index + 1) % topicButtons.length;
      if (event.key === 'ArrowUp') target = (index + topicButtons.length - 1) % topicButtons.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = topicButtons.length - 1;
      if (target !== undefined) {
        event.preventDefault();
        selectTopic(topicButtons[target], true);
      }
    });
  });

  function renderPublications(filter) {
    const publications = data.publications.filter(item => filter === 'all' || item.type === filter);
    const fragment = document.createDocumentFragment();
    publications.forEach(publication => {
      const article = document.createElement('article');
      article.className = 'publication';
      const year = document.createElement('span');
      year.className = 'publication-year';
      year.textContent = String(publication.year);
      const content = document.createElement('div');
      const label = document.createElement('p');
      label.className = 'eyebrow publication-label';
      label.textContent = publication.label;
      const heading = document.createElement('h3');
      const link = document.createElement('a');
      link.href = publication.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = publication.title;
      heading.append(link);
      const authors = document.createElement('p');
      authors.className = 'publication-authors';
      authors.textContent = publication.authors;
      const venue = document.createElement('p');
      venue.className = 'publication-venue';
      venue.textContent = publication.venue;
      content.append(label, heading, authors, venue);
      const arrow = document.createElement('a');
      arrow.className = 'publication-arrow';
      arrow.href = publication.url;
      arrow.target = '_blank';
      arrow.rel = 'noopener noreferrer';
      arrow.setAttribute('aria-label', `${publication.linkText}: ${publication.title} (opens in a new tab)`);
      arrow.innerHTML = '<span aria-hidden="true">↗</span>';
      article.append(year, content, arrow);
      fragment.append(article);
    });
    one('#publication-list').replaceChildren(fragment);
    one('#publication-count').textContent = `${publications.length} selected ${publications.length === 1 ? 'work' : 'works'}`;
  }
  all('.filter-button').forEach(button => button.addEventListener('click', () => {
    all('.filter-button').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    renderPublications(button.dataset.filter);
  }));
  renderPublications('all');

  const waveform = [];
  const trend = [];
  for (let x = 0; x <= 540; x += 1.5) {
    const response = 51 * Math.exp(-Math.pow((x - 330) / 125, 4));
    const baseline = 150 - response;
    const phase = ((x + 6) % 40) / 40;
    const pulse = 43 * Math.exp(-Math.pow((phase - 0.2) / 0.105, 2)) + 13 * Math.exp(-Math.pow((phase - 0.53) / 0.14, 2));
    waveform.push(`${x === 0 ? 'M' : 'L'}${x.toFixed(1)} ${(baseline - pulse + 2 * Math.sin(x / 19)).toFixed(1)}`);
    trend.push(`${x === 0 ? 'M' : 'L'}${x.toFixed(1)} ${(baseline - 9).toFixed(1)}`);
  }
  one('#wave-line').setAttribute('d', waveform.join(' '));
  one('#wave-fill').setAttribute('d', `${waveform.join(' ')} L540 225 L0 225 Z`);
  one('#trend-line').setAttribute('d', trend.join(' '));

  const dialog = one('#workflow-dialog');
  one('#open-workflow').addEventListener('click', () => {
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
  function closeDialog() { dialog.close(); }
  one('.dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    one('#open-workflow').focus();
  });

  let copyTimer;
  one('#copy-email').addEventListener('click', async () => {
    const status = one('#copy-status');
    clearTimeout(copyTimer);
    let copied = false;
    try {
      await navigator.clipboard.writeText('dsankar2@jhmi.edu');
      copied = true;
    } catch {
      const field = document.createElement('textarea');
      field.value = 'dsankar2@jhmi.edu';
      field.setAttribute('readonly', '');
      field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.append(field);
      field.select();
      try { copied = document.execCommand('copy'); } catch { copied = false; }
      field.remove();
      one('#copy-email').focus({ preventScroll: true });
    }
    status.textContent = copied ? 'Email address copied.' : 'You can select the address above or click it to open your email app.';
    copyTimer = setTimeout(() => { status.textContent = ''; }, 6000);
  });
  one('#copyright-year').textContent = String(new Date().getFullYear());

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        all('#main-nav a').forEach(link => {
          const current = link.hash === `#${entry.target.id}`;
          if (current) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-12% 0px -60% 0px', threshold: 0 });
    all('main section[id]').forEach(section => observer.observe(section));
  }
})();
