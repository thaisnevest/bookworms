import cloudinary from '../config/cloudinary';

async function uploadImage(filePath: string): Promise<string>{
  const uploadResult = await cloudinary.uploader.upload(filePath);
  return uploadResult.secure_url;
}

export default uploadImage;