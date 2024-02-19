const ripple = () => {
  document.addEventListener('click', (event) => {
    const targetItem = event.target;
    const button = targetItem.closest('[data-ripple]');
    const ripple = document.createElement('span');

    const getAnimationDuration = () => {
      const duration = window.getComputedStyle(ripple).animationDuration;

      return duration.includes('ms')
        ? duration.replace('ms', '')
        : duration.replace('s', '') * 1000;
    };

    if (targetItem.closest('[data-ripple]')) {
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${
        event.pageX - (button.getBoundingClientRect().left + scrollX) - radius
      }px`;
      ripple.style.top = `${
        event.pageY - (button.getBoundingClientRect().top + scrollY) - radius
      }px`;
      ripple.classList.add('ripple');

      if (button.dataset.ripple === 'once' && button.querySelector('.ripple')) {
        button.querySelector('.ripple').remove();
      }

      button.appendChild(ripple);

      const timeOut = getAnimationDuration();

      setTimeout(() => {
        if (ripple) {
          ripple.remove();
        }
      }, timeOut);
    }
  });
};

export { ripple };
