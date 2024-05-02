
import { v2 as cloudinary} from "cloudinary";

import fs from "fs";
// fs file system(read,open,setting of file etc.) ko manage karta hai.

          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) => {
     try {
        if(!localFilePath) return null;
        
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })

        console.log("File has been uploaded on cloudinary",response.url);
        return response;

     } catch (error) {
        fs.unlinkSync(localFilePath)   // remove the locally file saved as temporary as upload operation got failed
        return null;
     }
}
 
export { uploadOnCloudinary }