import Image from "next/image";
import useDeviceDetect from "@ui/hooks/use-device-detect";
const Logo: React.FC = () => {
  const {isMobile}  = useDeviceDetect()

  const imageURI = isMobile ? "/alt-mobile.svg" : "/playboxd.svg";
  return(
  <div className="relative h-7 w-16 md:h-10 md:w-[16.4rem] cursor-pointer">
    <Image
      alt="logo"
      src={imageURI}
        priority={true}
      quality={100}
      sizes="100%"
      className="object-contain"
      fill
    />
  </div>
)};

export default Logo;
