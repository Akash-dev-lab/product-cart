import { useEffect, useState } from 'react';

function GetImageSource(image) {
    const [imageSrc, setImageSrc] = useState(image.thumbnail); // Default to thumbnail

    useEffect(() => {
        const updateImageSource = () => {
            const width = window.innerWidth;

            if (width >= 1024) {
                setImageSrc(image.desktop); // Desktop size
            } else if (width >= 768) {
                setImageSrc(image.tablet); // Tablet size
            } else if (width >= 480) {
                setImageSrc(image.mobile); // Mobile size
            } else {
                setImageSrc(image.thumbnail); // Thumbnail size (default)
            }
        };

        updateImageSource(); // Set initial image source
        window.addEventListener('resize', updateImageSource); // Update on resize

        return () => window.removeEventListener('resize', updateImageSource); // Cleanup listener
    }, [image]);

    return imageSrc;
}

export default GetImageSource;
