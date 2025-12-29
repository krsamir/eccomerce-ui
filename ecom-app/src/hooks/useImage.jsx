import { useCallback, useMemo, useState } from "react";

function bytesToKB(bytes) {
  return bytes / 1024;
}

function bytesToMB(bytes) {
  return bytes / (1024 * 1024);
}

const useImage = () => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const onChange = useCallback((e) => {
    setImageIndex(0);
    const urls = [];
    const files = e.target.files;
    [...files].forEach((image, index) => {
      console.log("🚀 ~ useImage ~ image:", image);
      urls.push({
        url: URL.createObjectURL(image),
        name: image.name,
        size: image.size,
        type: image.type,
        kb: bytesToKB(image.size)?.toFixed(2),
        mb: bytesToMB(image.size)?.toFixed(2),
        index,
      });
    });
    setImages([...files]);
    setImageUrls(urls);
  }, []);

  const handleDelete = useCallback(
    (index) => {
      const img = [...images];
      const urls = [...imageUrls];
      img.splice(index, 1);
      urls.splice(index, 1);
      setImages(img);
      setImageUrls(urls);
    },
    [images, imageUrls]
  );

  return useMemo(
    () => ({
      onChange,
      images,
      imageUrls,
      imageIndex,
      setImageIndex,
      handleDelete,
    }),
    [onChange, images, imageUrls, imageIndex, setImageIndex, handleDelete]
  );
};

export default useImage;
