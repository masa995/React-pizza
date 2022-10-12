
export function lockScroll() {
  let pagePosition = window.scrollY; //сохраняем координаты на котором мы находились
  document.body.classList.add('disable-scroll'); //выключаем скролл
  document.body.dataset.position = pagePosition; //передаем в боди новый атребут
  document.body.style.top = -pagePosition; //убираем прыжок при применение стилей
}

export function unlockScroll() {
  let pagePosition = parseInt(document.body.dataset.position, 10); //перевод в число позиции из атребота
  document.body.style.top = 'auto';
  document.body.classList.remove('disable-scroll');
  window.scroll({ top: pagePosition, left: 0 });
  document.body.removeAttribute('data-position');
}