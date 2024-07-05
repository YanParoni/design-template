import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useFilterStore, usePaginationStore } from "client/store";
import mockedPlatforms from "@ui/utils/mock-platforms";
import mockedGenres from "@ui/utils/mock-genres";
import mockedStores from "@ui/utils/mock-stores";
import { buildUrl } from "@ui/components/atoms/filters/links";

const useUrlSync = () => {
  const router = useRouter();
  const pathname = usePathname();
  const filterStore = useFilterStore();
  const paginationStore = usePaginationStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramsArray = pathname.split("/").slice(2);
    const params: Record<string, string> = {};

    for (let i = 0; i < paramsArray.length; i += 2) {
      params[paramsArray[i]] = paramsArray[i + 1];
    }

    const { genre, platform, store, size, page, search } = params;

    if (genre) {
      const genreObj = mockedGenres.find((g) => g.alias === genre);
      if (genreObj) filterStore.setGenre(genreObj.value);
    } else {
      filterStore.setGenre(null);
    }

    if (platform) {
      const platformObj = mockedPlatforms.find((p) => p.alias === platform);
      if (platformObj) filterStore.setPlatform(platformObj.value);
    } else {
      filterStore.setPlatform(null);
    }

    if (store) {
      const storeObj = mockedStores.find((s) => s.alias === store);
      if (storeObj) filterStore.setStore(storeObj.value);
    } else {
      filterStore.setStore(null);
    }

    if (size) {
      paginationStore.setPageSize(size === "large" ? 40 : 15);
    }

    if (page) {
      paginationStore.setCurrentPage(Number(page));
    } else {
      paginationStore.setCurrentPage(1);
    }

    if (search) {
      filterStore.setSearch(search);
    }

    setLoading(false);
  }, []);

  const filters = useMemo(
    () => ({
      genre: filterStore.genre,
      platform: filterStore.platform,
      store: filterStore.store,
      pageSize: paginationStore.pageSize,
      currentPage: paginationStore.currentPage,
      search: filterStore.search,
    }),
    [
      filterStore.genre,
      filterStore.platform,
      filterStore.store,
      paginationStore.pageSize,
      paginationStore.currentPage,
      filterStore.search,
    ],
  );

  useEffect(() => {
    if (!loading) {
      const newUrl = buildUrl(filters);
      if (newUrl !== pathname) {
        router.replace(newUrl);
      }
    }
  }, []);

  return loading;
};

export default useUrlSync;
