import React, { useEffect, useRef, useState } from "react";
import s from './LoadableImage.module.css'

const LoadableImage = (props) => {
    const {src, alt ='', onLoad = () => {}} = props;
    const [isLoaded, setIsLoaded] = useState(false)
    const imageRef = useRef(null);

    useEffect(() => {
        setIsLoaded(false)
        if (imageRef.current) {
            
            imageRef.current.onload = () => setIsLoaded(true);
        }
    }, [src])

    return (<div className={isLoaded ? `${s.menuItemImage} ${s.menuItemImageLoaded}` : s.menuItemImage}>
        <img 
            ref={imageRef}
            className={isLoaded ? `${s.image} ${s.imageLoaded}` : s.image} 
            src={src} 
            alt={alt} />
    </div>)
}

export default LoadableImage;