import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";

const UserProfileImage = ({ profileImage }) => {
  if (profileImage) {
    return (
      <img
        src={profileImage}
        className="h-6 w-6 rounded-full object-cover md:h-7 md:w-7"
        alt="User profile"
      />
    );
  } else {
    return <UserIcon className="h-6 w-6 p-1 text-inherit md:h-7 md:w-7" />;
  }
};

export default UserProfileImage;
