//вычесляет верхнию координату для позиционирования
export function getTop() {
  const sort = document.querySelector('.sort');
  const getTop = sort.offsetTop;

  document.documentElement.style.setProperty('--top', `${getTop}px`);
  return getTop
}

//Проверяет breakpoint 1110
export function checkAdaptive() {
  if (window.matchMedia('(max-width: 1110px)').matches) {
    return false
  } else return true
}

