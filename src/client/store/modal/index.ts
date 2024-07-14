import { create } from "zustand";
import { ModalStoreState } from "../types";
import getCroppedImg from "@ui/utils/get-cropped-img";

const useModalStore = create<ModalStoreState>((set, get) => ({
  isVisible: false,
  isCropping: false,
  editMode: null,
  selectedImage: null,
  localProfileImage: null,
  localHeaderImage: null,
  croppedAreaPixels: null,
  hasChanges: false,
  passwordModal: false,
  handlePasswordModal: (value) => set({ passwordModal: value }),
  setHasChanges: () => set({ hasChanges: true }),
  openModal: () => set({ isVisible: true }),
  closeModal: () =>
    set({
      isVisible: false,
      isCropping: false,
      editMode: null,
      croppedAreaPixels: null,
    }),
  setEditMode: (mode) => set({ editMode: mode }),
  startCropping: () => set({ isCropping: true }),
  stopCropping: () =>
    set({ isCropping: false, selectedImage: null, croppedAreaPixels: null }),

  setSelectedImage: (image) => set({ selectedImage: image }),

  setCroppedAreaPixels: (area) => set({ croppedAreaPixels: area }),

  saveCroppedImage: async () => {
    const { selectedImage, croppedAreaPixels, editMode } = get();
    if (!selectedImage || !croppedAreaPixels) return;

    const croppedImage = (await getCroppedImg(
      selectedImage,
      croppedAreaPixels,
    )) as string;
    if (editMode === "profile") {
      set({ localProfileImage: croppedImage });
    } else if (editMode === "header") {
      set({ localHeaderImage: croppedImage });
    }

    set({
      isCropping: false,
      selectedImage: null,
      croppedAreaPixels: null,
      editMode: null,
    });
  },

  resetState: () =>
    set({
      isVisible: false,
      isCropping: false,
      editMode: null,
      selectedImage: null,
      localHeaderImage: null,
      localProfileImage: null,
      croppedAreaPixels: null,
      hasChanges: false,
    }),
}));

export default useModalStore;
