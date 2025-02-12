import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

//configuratuion of cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null;

        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        fs.unlinkSync(localFilePath);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}