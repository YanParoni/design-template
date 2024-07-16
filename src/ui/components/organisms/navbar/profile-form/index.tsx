import React, { useState, useRef, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import CharacterCountInput from "@ui/components/atoms/inputs/char-count-input";
import ErrorMessage from "@ui/components/atoms/error-message";
import { useModalStore } from "client/store";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "client/store";
const ASPECT_RATIO_PROFILE = 1;
const ASPECT_RATIO_HEADER = 3 / 1;

interface ProfileFormProps {
  register: any;
  errors: any;
  usernameValue: string;
  bioValue: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  register,
  errors,
  usernameValue,
  bioValue,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const { user } = useAuthStore();
  const {
    isCropping,
    setSelectedImage,
    localProfileImage,
    localHeaderImage,
    setCroppedAreaPixels,
    selectedImage,
    editMode,
    setEditMode,
    setHasChanges,
    startCropping,
  } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onCropComplete = useCallback(
    (croppedArea:any, croppedAreaPixels:any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels],
  );
  useEffect(() => {
    if (usernameValue !== user?.at || bioValue !== user?.bio) {
      setHasChanges();
    }
  }, [usernameValue, bioValue, user?.at, user?.bio]);

  if (!user) return null;

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        startCropping();
        setHasChanges();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (mode: "profile" | "header") => {
    setEditMode(mode);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex h-full flex-col items-center">
      <div className="relative h-full w-full">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onSelectFile}
          className="hidden"
        />
        {isCropping && selectedImage ? (
          <div className="relative h-full w-full">
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={
                editMode === "profile"
                  ? ASPECT_RATIO_PROFILE
                  : ASPECT_RATIO_HEADER
              }
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          </div>
        ) : (
          <>
            <div className="relative h-48 w-full">
              <img
                src={
                  localHeaderImage || user.headerImage || "/space-invaders.png"
                }
                alt="Header"
                className="h-full w-full bg-accent-theme object-cover"
              />
              <div
                className="absolute inset-0 flex cursor-pointer items-center justify-center"
                onClick={() => handleClick("header")}
              >
                <div className="rounded-full bg-slate-500/20 p-2 backdrop-blur-[3px] hover:bg-slate-400/25">
                  <CameraIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            <div className="relative -mt-12 ml-4 h-24 w-24">
              <img
                src={
                  localProfileImage ||
                  user.profileImage ||
                  "/space-invaders.png"
                }
                alt="Profile"
                className="mx-auto h-24 w-24 rounded-full border-4 border-secondary-bkg bg-accent-theme object-cover"
              />
              <div
                className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-10"
                onClick={() => handleClick("profile")}
              >
                <div className="rounded-full bg-slate-500/20 p-1 backdrop-blur-[1px] hover:bg-slate-400/25">
                  <CameraIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            <div className=" relative w-full px-4 pt-4">
              <CharacterCountInput
                label="@"
                value={usernameValue}
                maxLength={14}
                {...register("at")}
              />
       
       {errors.at && (
                <ErrorMessage message={errors.at.message as string} />
              )}            </div>
            <div className="mt-4 w-full px-4">
              <CharacterCountInput
                label="Bio"
                value={bioValue || ""}
                maxLength={120}
                isTextArea={true}
                {...register("bio")}
              />
              {errors.bio && (
                <ErrorMessage message={errors.bio.message as string} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
