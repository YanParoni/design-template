import React from "react";
import Image from "next/image";

const UserProfileImage = ({ profileImage }) => {
  return profileImage ? (
    <div className="relative h-6 w-6 md:h-7 md:w-7">
      <Image
        src={profileImage}
        className="rounded-full object-fill"
        alt="User profile"
        quality={100}
        width={28}
        height={28}
        sizes={'28px'}
      />
    </div>
  ) : (
    <div className="rounded-full relative bg-white h-6 w-6 md:h-7 md:w-7">
      <Image
        src={'/space-invaders.png'}
        className=" object-fill"
        alt="User profile"
        quality={100}
        width={28}
        height={28}
        sizes={'28px'}
      />
    </div>  );
};

export default UserProfileImage;
