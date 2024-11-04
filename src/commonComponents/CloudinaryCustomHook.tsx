// useCloudinaryUploader.ts

import { useState } from 'react';
import axios from 'axios';

const useCloudinaryUploader = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // Single image URL
    const [loading, setLoading] = useState(false);

    const cloudName = 'dtqmhztoy'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'MernEats'; // Replace with your upload preset

    // Function to handle multiple image uploads
    const handleMultipleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
        const files = e.target.files ? Array.from(e.target.files) : [];

        if (files.length > 0) {
            setLoading(true);
            const uploadedUrls = await uploadImagesToCloudinary(files);
            setImageUrls(uploadedUrls);
            field.onChange(uploadedUrls); // Update the form field with array of URLs
            setLoading(false);
        } else {
            setImageUrls([]);
            field.onChange(null);
        }
    };

    // Function to handle single image upload
    const handleSingleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            setLoading(true);
            const uploadedUrl = await uploadSingleImageToCloudinary(file);
            setImageUrl(uploadedUrl);
            field.onChange(uploadedUrl); // Update the form field with single URL
            setLoading(false);
        } else {
            setImageUrl(null);
            field.onChange(null);
        }
    };

    // Helper function to upload multiple images
    const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
        const urls: string[] = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);

            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
                urls.push(response.data.secure_url);
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
        return urls;
    };

    // Helper function to upload a single image
    const uploadSingleImageToCloudinary = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Upload failed:', error);
            return null;
        }
    };

    return { handleMultipleFileChange, handleSingleFileChange, imageUrls, imageUrl, loading };
};

export default useCloudinaryUploader;
