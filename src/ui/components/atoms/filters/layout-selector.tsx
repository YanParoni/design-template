'use client';
import React, { useState, useEffect } from 'react';
import { usePaginationStore } from 'client/store';

const layoutOptions = {
  GRID: 'GRID',
  LIST: 'LIST',
};

const LayoutSelector: React.FC = () => {
  const [layout, setLayout] = useState(layoutOptions.GRID);
  const { pageSize, setPageSize } = usePaginationStore();

  useEffect(() => {
    setLayout(pageSize === 12 ? layoutOptions.LIST : layoutOptions.GRID);
  }, [pageSize]);

  const togglePageSize = () => {
    if (pageSize === 40) {
      setPageSize(12);
    } else {
      setPageSize(40);
    }
  };

  return (
    <div className="flex items-center gap-1">
          <svg
        onClick={() => { setLayout(layoutOptions.GRID); togglePageSize(); }}
        className={`cursor-pointer  ${layout === layoutOptions.GRID ? 'fill-comp-description stroke-comp-description' : 'fill-comp-muted stroke-comp-muted'} hover:fill-comp-description hover:stroke-comp-description`}
        height="21"
        viewBox="0 0 21 21"
        width="21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m9.5.5h4c.5522847 0 1 .44771525 1 1v4c0 .55228475-.4477153 1-1 1h-4c-.55228475 0-1-.44771525-1-1v-4c0-.55228475.44771525-1 1-1zm-8 0h4c.55228475 0 1 .44771525 1 1v4c0 .55228475-.44771525 1-1 1h-4c-.55228475 0-1-.44771525-1-1v-4c0-.55228475.44771525-1 1-1zm8 8h4c.5522847 0 1 .44771525 1 1v4c0 .5522847-.4477153 1-1 1h-4c-.55228475 0-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1zm-8 0h4c.55228475 0 1 .44771525 1 1v4c0 .5522847-.44771525 1-1 1h-4c-.55228475 0-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1z"
          transform="translate(3 3)"
        />
      </svg>
      <div
        onClick={() => { setLayout(layoutOptions.LIST); togglePageSize(); }}
        className={`h-[15px] w-[13px] cursor-pointer rounded-[1px] ${layout === layoutOptions.LIST ? 'bg-comp-description' : 'bg-comp-muted'} hover:bg-comp-description`}
      ></div>
  
    </div>
  );
};

export default LayoutSelector;
