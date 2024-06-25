import mockedPlatforms from '@ui/utils/mock-platforms';
import mockedGenres from '@ui/utils/mock-genres';
import mockedStores from '@ui/utils/mock-stores';

const getAliasByValue = (value, options) => {
  const option = options.find((option) => option.value === value);
  return option ? option.alias : '';
};

const buildUrl = (filters: any) => {
  const urlParts = [];

  if (filters.genre && filters.genre !== 'any') {
    urlParts.push('genre');
    urlParts.push(getAliasByValue(filters.genre, mockedGenres));
  }
  if (filters.platform && filters.platform !== null) {
    urlParts.push('platform');
    urlParts.push(getAliasByValue(filters.platform, mockedPlatforms));
  }
  if (filters.store && filters.store !== null) {
    urlParts.push('store');
    urlParts.push(getAliasByValue(filters.store, mockedStores));
  }

  urlParts.push('size');
  urlParts.push(filters.pageSize === 40 ? 'large' : 'small');

  urlParts.push('page');
  urlParts.push(filters.currentPage.toString());

  return `/games/${urlParts.join('/')}`;
};

export { buildUrl };
