import React from "react";
import Image from "next/image";

interface UserProfileImageProps{
  profileImage: string | undefined;
}

const UserProfileImage = ({ profileImage }:UserProfileImageProps ) => {
  return profileImage ? (
    <div className="relative h-6 w-6 md:h-8 md:w-8">
      <Image
        src={profileImage}
        alt='User Photo Profile'
        priority
        quality={100}
        sizes="100vw"
        className="object-cover rounded-full"
        fill
      />
    </div>
  ) : (
    <div className="relative h-6 w-6 rounded-full bg-white md:h-8 md:w-8">
      <Image
        src={"/space-invaders.png"}
        className="object-fill"
        alt="User profile"
        quality={100}
        width={28}
        height={28}
        sizes={"28px"}
      />
    </div>
  );
};

export default UserProfileImage;
