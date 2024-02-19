const rating = () => {
  const ratings = document.querySelectorAll('.rating');

  const initRatings = () => {
    let ratingActive;
    let ratingValue;

    const initRatingVars = (rating) => {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
    };

    const setRatingActiveWidth = (index = ratingValue.innerHTML) => {
      const ratingActiveWidth = index / 0.05;

      ratingActive.style.width = `${ratingActiveWidth}%`;
    };

    const setRatingValue = async (rating) => {
      const ratingSendingClassMod = 'rating--sending';

      if (!rating.classList.contains(ratingSendingClassMod)) {
        rating.classList.add(ratingSendingClassMod);

        const response = await fetch('rating.json', {
          method: 'GET',
        });

        if (response.ok) {
          const result = await response.json();
          const newRating = result.newRating;

          ratingValue.innerHTML = newRating;
          setRatingActiveWidth();
          rating.classList.remove(ratingSendingClassMod);
        } else {
          alert('Error');
          rating.classList.remove(ratingSendingClassMod);
        }
      }
    };

    const setRating = (rating) => {
      const ratingStars = rating.querySelectorAll('.rating__star');

      for (let index = 0; index < ratingStars.length; index++) {
        const ratingStar = ratingStars[index];

        ratingStar.addEventListener('mouseenter', () => {
          initRatingVars(rating);
          setRatingActiveWidth(ratingStar.value);
        });
        ratingStar.addEventListener('mouseleave', () => {
          setRatingActiveWidth();
        });
        ratingStar.addEventListener('click', () => {
          initRatingVars(rating);

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
      initRatingVars(rating);
      setRatingActiveWidth();

      if (rating.classList.contains('rating--set')) {
        setRating(rating);
      }
    };

    ratings.forEach((rating) => {
      return initRating(rating);
    });
  };

  if (ratings) {
    initRatings();
  }
};

export { rating };
