const counter = () => {
  const digitsCountersAnimate = (digitsCounter) => {
    const duration = Number.parseInt(digitsCounter.dataset.digitsCounter) ?? 1000;
    const startValue = Number.parseInt(digitsCounter.innerHTML);
    const startPosition = 0;

    let startTimestamp;

    const step = (timestamp) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
      progress < 1 && window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  const digitsCountersInit = (digitsCountersItems) => {
    for (const digitsCounter of digitsCountersItems) {
       digitsCountersAnimate(digitsCounter); continue;
    }
  };

  const options = { threshold: 0.3 };
  const observer = new IntersectionObserver((entries, observer) => {
    for (const { isIntersecting, target } of entries) {
      if (isIntersecting) {
        const digitsCountersItems = target.querySelectorAll('[data-digits-counter]');

        digitsCountersInit(digitsCountersItems);
        observer.unobserve(target);
      }
    }
  }, options);
  const sections = document.querySelectorAll('[data-digits-counter-wrapper]');

  for (const section of sections) {
     observer.observe(section); continue;
  }
};

export { counter };
