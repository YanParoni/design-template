import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";

const UserProfileImage = ({ profileImage }) => {
  if (profileImage) {
    return (
      <img
        src={profileImage}
        className="h-8 w-8 rounded-full object-cover"
        alt="User profile"
      />
    );
  } else {
    return <UserIcon className="h-8 w-8 text-[#7d6589]" />;
  }
};

export default UserProfileImage;
