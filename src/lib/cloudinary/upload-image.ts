import { cloudinary } from "./cloudinary.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadImage = async (file: File, folder: string): Promise<any> => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    const response = new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: folder },
          async (error, result) => {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          }
        )
        .end(bytes);
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Image upload failed!");
  }
};
