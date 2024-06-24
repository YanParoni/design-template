import Link from 'next/link';
import mockedPlatforms from '@ui/utils/mock-platforms';
import mockedGenres from '@ui/utils/mock-genres';
import mockedStores from '@ui/utils/mock-stores';

const getAliasByValue = (value, options) => {
  const option = options.find((option) => option.value === value);
  return option ? option.alias : '';
};

const buildUrl = (genre, platform, store) => {
  const genreAlias = getAliasByValue(genre, mockedGenres);
  const platformAlias = getAliasByValue(platform, mockedPlatforms);
  const storeAlias = getAliasByValue(store, mockedStores);

  let url = '/games';
  if (genreAlias) url += `/genre/${genreAlias}`;
  if (platformAlias) url += `/platform/${platformAlias}`;
  if (storeAlias) url += `/store/${storeAlias}`;

  return url;
};

const GenresLink = ({ genre }) => (
  <Link href={`/games/genre/${genre}`}>
    <a>{genre}</a>
  </Link>
);

const PlatformsLink = ({ platform }) => {
  const alias = getAliasByValue(platform, mockedPlatforms);
  return (
    <Link href={`/games/platform/${alias}`}>
      <a>{mockedPlatforms.find((p) => p.value === platform).label}</a>
    </Link>
  );
};

const StoresLink = ({ store }) => (
  <Link href={`/games/store/${store}`}>
    <a>{store}</a>
  </Link>
);

export { GenresLink, PlatformsLink, StoresLink, buildUrl };
