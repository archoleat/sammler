import { uniqArray } from '@js/helpers/uniq-array';

const dataMediaQueries = (array, dataSetValue) => {
  const media = Array.from(array).filter((item) => {
    return item.dataset[dataSetValue]?.split(',')[0];
  });

  if (media) {
    const breakpointsArray = [];

    media.forEach((item) => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(',');
      const breakpoint = {
        item,
        value: paramsArray[0],
        type: paramsArray[1]?.trim() ?? 'max',
      };

      breakpointsArray.push(breakpoint);
    });

    let mdQueries = breakpointsArray.map((item) => {
      return `(${item.type}-width: ${item.value}px), ${item.value}, ${item.type}`;
    });

    mdQueries = uniqArray(mdQueries);

    const mdQueriesArray = [];

    if (mdQueries) {
      mdQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(',');
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        const itemsArray = breakpointsArray.filter((item) => {
          return item.value === mediaBreakpoint && item.type === mediaType;
        });

        mdQueriesArray.push({
          itemsArray,
          matchMedia,
        });
      });

      return mdQueriesArray;
    }
  }
};

export { dataMediaQueries };
