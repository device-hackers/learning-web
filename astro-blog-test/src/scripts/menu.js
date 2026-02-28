const menu = document.querySelector('.menu');

menu?.addEventListener('click', () => {
  const isExpanded = menu.getAttribute('aria-expanded') === 'true';
  console.log('isExpanded', isExpanded);
  menu.setAttribute('aria-expanded', `${!isExpanded}`);
});
