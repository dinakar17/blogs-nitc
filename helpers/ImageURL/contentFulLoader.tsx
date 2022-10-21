interface ImageProps {
    src: string;
    width: number;
    quality: number;
}

export  const contentfulLoader = ({ src, width, quality}: any) => {
    const params = [`w=${width}`];
  
    if (quality) {
      params.push(`q=${quality}`);
    }
  
    return `${src}?${params.join('&')}`;
};
