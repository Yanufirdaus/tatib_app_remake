import { v2 as cloudinary } from 'cloudinary';

export class CloudinaryService {
  static async deleteFile(url: string | null): Promise<void> {
    if (!url) return;

    try {
      const urlParts = url.split("/");
      const uploadIndex = urlParts.indexOf("upload");
      if (uploadIndex !== -1) {
        // Cloudinary public ID is after version (e.g., /v123456789/folder/public_id.ext)
        // Usually, it's the parts after the version part.
        const publicIdWithExt = urlParts.slice(uploadIndex + 2).join("/");
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
        
        await cloudinary.uploader.destroy(publicId);
        console.log(`[Cloudinary] Deleted file: ${publicId}`);
      }
    } catch (err) {
      console.error(`[Cloudinary] Failed to delete file: ${url}`, err);
      // We don't throw here to avoid failing a transaction if a file is already gone
    }
  }

  static async deleteMultipleFiles(urls: (string | null)[]): Promise<void> {
    const validUrls = urls.filter(url => !!url);
    await Promise.all(validUrls.map(url => this.deleteFile(url)));
  }
}
