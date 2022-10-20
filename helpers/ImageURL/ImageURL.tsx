export const appendImgUrl = (filename: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_API_URL}${filename}`;
};

export const removeImgUrl = (filename: string) => {
  const modifiedFilename = filename.replace(
    `${process.env.NEXT_PUBLIC_IMAGE_API_URL}`,
    ""
  );
  return modifiedFilename;
};
