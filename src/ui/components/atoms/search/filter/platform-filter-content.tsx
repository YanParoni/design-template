import React from 'react';
import { PlaystationIcon, AtariIcon, IosIcon, MacIcon, NeogeoIcon, NintendoIcon, WindowsIcon, XboxIcon, AndroidIcon, SegaIcon } from 'utils/platforms';
import { useFilterStore } from 'client/store';
export default function PlatformFilterContent() {
  const platforms = useFilterStore(state => state.platforms);
  const { addPlatform, removePlatform } = useFilterStore();

  const handlePlatform = (newPlatform: string) => {
    if (platforms.includes(newPlatform)) {
      removePlatform(newPlatform);
    } else {
      addPlatform(newPlatform);
    }
  };

  const isPlatformSelected = (platformId: string) => platforms.includes(platformId);

  return (
    <>
      <div className="text-sm text-gray-500  px-4 py-4">Pick the main platform (includes all related versions)</div>
      <div className='grid grid-cols-2  pb-3 gap-y-2 place-content-center	 place-items-center'>

        <WindowsIcon
          className={`w-6 h-6 duration-400 transition hover:ease-in hover:scale-125 ${isPlatformSelected('1') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('1')} />
        <MacIcon
          className={`w-6 h-6 duration-400 transition hover:ease-in hover:scale-125 ${isPlatformSelected('5') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('5')} />
        <PlaystationIcon
          className={`w-6 h-6 hover:scale-125 ${isPlatformSelected('2') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('2')} />
        <XboxIcon
          className={`w-6 h-6 duration-400 transition hover:ease-in hover:scale-125 ${isPlatformSelected('3') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('3')} />
        <NintendoIcon
          className={`w-4 h-4 duration-400 transition hover:ease-in hover:scale-125 ${isPlatformSelected('nintendo') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('nintendo')} />
        <AtariIcon
          className={`w-6 h-6 duration-400 transition hover:ease-in hover:scale-125 ${isPlatformSelected('atari') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('atari')} />
        <IosIcon
          className={`w-6 h-6 duration-400 transition hover:ease-in hover:scale-125 ${isPlatformSelected('4') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('4')} />
        <AndroidIcon
          className={`w-6 h-6 duration-400 transition hover:ease-in hover:scale-125 ${isPlatformSelected('8') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('8')}
        />

        <NeogeoIcon
          className={` w-6 h-6 duration-400 transition hover:ease-in hover:scale-125 ${isPlatformSelected('13') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('13')} />
        <SegaIcon
          className={` w-12 h-12 duration-400 transition hover:ease-in hover:scale-125 ${isPlatformSelected('11') ? 'text-purple-600' : 'text-primary-color'}`}
          onClick={() => handlePlatform('11')}
        />
      </div>
    </>
  );
}
