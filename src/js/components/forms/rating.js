const rating = () => {
  const ratings = document.querySelectorAll('.rating');

  const initRatings = () => {
    let ratingActive;
    let ratingValue;

    const initRatingVariables = (rating) => {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
    };

    const setRatingActiveWidth = (index = ratingValue.innerHTML) => {
      const ratingActiveWidth = index / 0.05;

      ratingActive.style.width = `${ratingActiveWidth}%`;
    };

    const setRatingValue = async (rating) => {
      const ratingSendingClassModule = 'rating--sending';

      if (!rating.classList.contains(ratingSendingClassModule)) {
        rating.classList.add(ratingSendingClassModule);

        const response = await fetch('rating.json', {
          method: 'GET',
        });

        if (response.ok) {
          const result = await response.json();
          const {newRating} = result;

          ratingValue.innerHTML = newRating;
          setRatingActiveWidth();
          rating.classList.remove(ratingSendingClassModule);
        } else {
          alert('Error');
          rating.classList.remove(ratingSendingClassModule);
        }
      }
    };

    const setRating = (rating) => {
      const ratingStars = rating.querySelectorAll('.rating__star');

      for (const [index, ratingStar] of ratingStars.entries()) {

        ratingStar.addEventListener('mouseenter', () => {
          initRatingVariables(rating);
          setRatingActiveWidth(ratingStar.value);
        });
        ratingStar.addEventListener('mouseleave', () => {
          setRatingActiveWidth();
        });
        ratingStar.addEventListener('click', () => {
          initRatingVariables(rating);

          if (rating.dataset.ajax) {
            setRatingValue(ratingStar.value);
          } else {
            ratingValue.innerHTML = index + 1;
            setRatingActiveWidth();
          }
        });
      }
    };

    const initRating = (rating) => {
      initRatingVariables(rating);
      setRatingActiveWidth();

      if (rating.classList.contains('rating--set')) {
        setRating(rating);
      }
    };

    for (const rating of ratings) {
       initRating(rating); continue;
    }
  };

  if (ratings) {
    initRatings();
  }
};

export { rating };
