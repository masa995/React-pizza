export function getTop() {
  const sort = document.querySelector('.sort');
  const getTop = sort.offsetTop;

  document.documentElement.style.setProperty('--top', `${getTop}px`);
  return getTop
}

export function checkAdaptive() {
  if (window.matchMedia('(max-width: 1100px)').matches) {
    return false
  } else return true
}

