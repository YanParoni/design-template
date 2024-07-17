import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFilterStore, usePaginationStore } from "client/store";
import LayoutSelector from "@ui/components/atoms/filters/layout-selector";
import Dropdown from "@ui/components/molecules/dropdown";
import mockedGenres from "@ui/utils/mock-genres";
import mockedPlatforms from "@ui/utils/mock-platforms";
import mockedStores from "@ui/utils/mock-stores";
import SearchInput from "@ui/components/atoms/inputs/search-input";
import useDeviceDetect from "@ui/hooks/use-device-detect";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { getAliasByValue } from "@ui/components/atoms/filters/links";

const FiltersAndVisualization: React.FC = () => {
  const {
    genre,
    platform,
    store,
    search,
    setGenre,
    setPlatform,
    setStore,
    setSearch,
    resetFilters,
  } = useFilterStore();
  const { currentPage, pageSize, setCurrentPage, setPageSize } =
    usePaginationStore();
  
  const cleanSearch = decodeURIComponent(search).trim();
  const [searchTerm, setSearchTerm] = useState(cleanSearch);
  
  const router = useRouter();
  const { isMobile } = useDeviceDetect();
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleSearch = () => {
    resetFilters();
    setCurrentPage(1);
    setPageSize(40);
    setSearch(searchTerm);
  };

  useEffect(() => {
    const parts = [
      "games",
      "genre",
      genre ? getAliasByValue(genre, mockedGenres) : "any",
      "platform",
      platform ? getAliasByValue(platform, mockedPlatforms) : "any-platform",
      "store",
      store ? getAliasByValue(store, mockedStores) : "any-store",
      "size",
      pageSize === 40 ? "large" : "small",
      "page",
      currentPage.toString(),
    ];

    if (search) {
      parts.push("search", cleanSearch);
    }

    router.replace(`/${parts.join("/")}`);
  }, [genre, platform, store, currentPage, pageSize, cleanSearch, router]);

  const renderFilters = () => (
    <div className="flex flex-col gap-2 pt-2">
      <div className="w-full">
        <SearchInput
          onChange={(evt) => setSearchTerm(evt.target.value)}
          onClick={handleSearch}
          search={cleanSearch}
          searchTerm={searchTerm}
          setSearch={setSearch}
        />
      </div>
      <div className="flex flex-row">
        <Dropdown
          label="GENRES"
          options={mockedGenres}
          onSelect={(value) => setGenre(value)}
          selectedValue={genre}
        />
        <Dropdown
          label="PLATFORMS"
          options={mockedPlatforms}
          onSelect={(value) => setPlatform(parseInt(value))}
          selectedValue={platform}
        />
        <Dropdown
          label="STORES"
          options={mockedStores}
          onSelect={(value) => setStore(parseInt(value))}
          selectedValue={store}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full border-b border-b-tertiary-bkg pt-2">
      <div className="flex flex-row justify-between">
        <p className="inline-block pt-2 align-baseline font-montserrat text-[13px] font-semibold text-description">
          GAMES
        </p>
        {isMobile && (
          <button
            className="flex items-end pt-1"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-description" />
          </button>
        )}
        {!isMobile && (
          <div className="flex items-center justify-between pb-1">
            <SearchInput
              onChange={(evt) => setSearchTerm(evt.target.value)}
              onClick={handleSearch}
              search={cleanSearch}
              searchTerm={searchTerm}
              setSearch={setSearch}
            />
            <Dropdown
              label="GENRES"
              options={mockedGenres}
              onSelect={(value) => setGenre(value)}
              selectedValue={genre}
            />
            <Dropdown
              label="PLATFORMS"
              options={mockedPlatforms}
              onSelect={(value) => setPlatform(parseInt(value))}
              selectedValue={platform}
            />
            <Dropdown
              label="STORES"
              options={mockedStores}
              onSelect={(value) => setStore(parseInt(value))}
              selectedValue={store}
            />
            <LayoutSelector />
          </div>
        )}
      </div>
      <div>
        {filtersVisible && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            {renderFilters()}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FiltersAndVisualization;
