import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  radius?: 'default' | 'circle';
}

// Image component
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  onClick,
  radius = 'default',
}) => {
  // Default styles for the image
  const defaultStyle: React.CSSProperties = {
    maxWidth: '100%',
    objectFit: 'cover',
    borderRadius: radius === 'circle' ? '50%' : '7.5px',
  };

  // Combine default styles with any additional styles passed in
  const combinedStyle: React.CSSProperties = {
    ...defaultStyle,
    ...style,
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={combinedStyle}
      onClick={onClick}
    />
  );
};

export default Image;
