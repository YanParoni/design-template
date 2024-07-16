import Image from "next/image";
const Logo: React.FC = () => (
  <div className="relative h-10 w-[18rem] cursor-pointer">
    <Image
      alt="logo"
      src="/playboxd.svg"
      priority
      quality={100}
      sizes="100vw"
      className="object-cover"
      fill
    />
  </div>
);

export default Logo;
