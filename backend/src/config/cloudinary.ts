import { v2 as cloudinary } from 'cloudinary';

export function configureCloudinary(): void {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log('✅ Cloudinary configured');
  console.log("Cloudinary env check:", {
    cloudName: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
    apiKey: Boolean(process.env.CLOUDINARY_API_KEY),
    apiSecret: Boolean(process.env.CLOUDINARY_API_SECRET),
  });

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  console.log("✅ Cloudinary configured");
}

export { cloudinary };