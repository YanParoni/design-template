import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import Button from "../../../atoms/buttons/button";
import { useModalStore, useAuthStore, useAlertStore } from "client/store";
import { useUpdateUserDetails } from "@ui/queries/user";
import ConfirmationModal from "@ui/components/molecules/modal/confirmation-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileFormSchema } from "@ui/validators/profile-form-schema";
import ProfileForm from "@ui/components/organisms/navbar/profile-form";
import { convertBlobToBase64 } from "@ui/utils/convert-blob-to-base64";

const ProfileModal: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    isVisible,
    isCropping,
    stopCropping,
    saveCroppedImage,
    resetState,
    hasChanges,
    localHeaderImage,
    localProfileImage,
  } = useModalStore();

  const { user } = useAuthStore();
  const { showAlert } = useAlertStore();
  const { mutate: updateUserDetails } = useUpdateUserDetails();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(profileFormSchema),
    mode: "onChange",
  });
  if (!user) return null;
  console.log(user)
  const usernameValue = watch("at", user.at || "");
  const bioValue = watch("bio", user.bio || "");

  const makeRequest = async (updateData: any) => {
    try {
      updateUserDetails(updateData);
      showAlert("Profile updated successfully", "success");
      resetState();
    } catch (error) {
      showAlert("Something went wrong.Try again later.", "error");
    }
  };

  const handleSaveClick = async (data: any) => {
    const updateData = await transformData(
      data,
      user,
      localHeaderImage,
      localProfileImage,
    );
    await makeRequest(updateData);
  };

  const handleCloseClick = () => {
    if (hasChanges) return setShowConfirmation(true);
    resetState();
  };

  const handleDiscardChanges = () => {
    setShowConfirmation(false);
    resetState();
  };

  const transformData = async (
    data: any,
    user: any,
    localHeaderImage: string | null,
    localProfileImage: string | null,
  ) => {
    let base64HeaderImage;
    let base64ProfileImage;

    if (localHeaderImage) {
      const response = await fetch(localHeaderImage);
      const blob = await response.blob();
      base64HeaderImage = await convertBlobToBase64(blob);
    }

    if (localProfileImage) {
      const response = await fetch(localProfileImage);

      const blob = await response.blob();
      base64ProfileImage = await convertBlobToBase64(blob);
    }
    return {
      at: data.at !== user.username ? data.at : undefined,
      bio: data.bio !== user.bio ? data.bio : undefined,
      header: base64HeaderImage,
      avatar: base64ProfileImage,
    };
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-modal-backdrop bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-full w-full overflow-y-hidden rounded-[6px] bg-secondary-bkg shadow-light md:h-[500px] md:w-[583px]"
            style={{ padding: "14px 0px 12px" }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="mb-1 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                {isCropping ? (
                  <ArrowLeftIcon
                    className="h-5 w-5 scale-110 cursor-pointer fill-description stroke-description hover:fill-tertiary-bkg hover:stroke-white"
                    onClick={stopCropping}
                  />
                ) : (
                  <XMarkIcon
                    className="h-5 w-5 scale-110 cursor-pointer fill-description stroke-description hover:fill-tertiary-bkg hover:stroke-white"
                    onClick={handleCloseClick}
                  />
                )}
                <h2 className="text-start font-montserrat text-xl text-white">
                  {isCropping ? "Edit Media" : "Edit Profile"}
                </h2>
              </div>
              <div className="w-20">
                <Button
                  label={isCropping ? "Apply" : "Save"}
                  onClick={
                    isCropping
                      ? saveCroppedImage
                      : handleSubmit(handleSaveClick)
                  }
                  variant="primary"
                  pill
                />
              </div>
            </div>
            <ProfileForm
              bioValue={bioValue || ""}
              errors={errors}
              register={register}
              usernameValue={usernameValue}
            />
          </motion.div>
          {showConfirmation && (
            <ConfirmationModal
              onConfirm={handleDiscardChanges}
              onCancel={() => setShowConfirmation(false)}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
