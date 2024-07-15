"use client";
import * as React from "react";
import Spinner from "@ui/components/atoms/spinner";

const SkeletonContainer = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
};

export default SkeletonContainer;
