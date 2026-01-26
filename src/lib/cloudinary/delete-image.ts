import { cloudinary } from "./cloudinary.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteImage = async (publicId: string): Promise<any> => {
  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Image delete failed!");
  }
};
