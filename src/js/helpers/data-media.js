import { uniqArray } from '@js/helpers/uniq-array';

const dataMediaQueries = (array, dataSetValue) => {
  const media = [...array].filter((item) => item.dataset[dataSetValue]?.split(',')[0]);

  if (media) {
    const breakpointsArray = [];

    for (const item of media) {
      const parameters = item.dataset[dataSetValue];
      const parametersArray = parameters.split(',');
      const breakpoint = {
        item,
        value: parametersArray[0],
        type: parametersArray[1]?.trim() ?? 'max',
      };

      breakpointsArray.push(breakpoint);
    }

    let mdQueries = breakpointsArray.map((item) => `(${item.type}-width: ${item.value}px), ${item.value}, ${item.type}`);

    mdQueries = uniqArray(mdQueries);

    const mdQueriesArray = [];

    if (mdQueries) {
      for (const breakpoint of mdQueries) {
        const parametersArray = breakpoint.split(',');
        const mediaBreakpoint = parametersArray[1];
        const mediaType = parametersArray[2];
        const matchMedia = window.matchMedia(parametersArray[0]);
        const itemsArray = breakpointsArray.filter((item) => item.value === mediaBreakpoint && item.type === mediaType);

        mdQueriesArray.push({
          itemsArray,
          matchMedia,
        });
      }

      return mdQueriesArray;
    }
  }
};

export { dataMediaQueries };
