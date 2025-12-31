import { useCallback, useMemo, useState } from "react";

function bytesToKB(bytes) {
  return bytes / 1024;
}

function bytesToMB(bytes) {
  return bytes / (1024 * 1024);
}

const useImage = () => {
  const [mediaUrls, setMediaUrls] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const onChange = useCallback((e) => {
    setImageIndex(0);
    const urls = [];
    const files = e.target.files;
    [...files].forEach((image, index) => {
      urls.push({
        url: URL.createObjectURL(image),
        name: image.name,
        size: image.size,
        type: image.type,
        kb: bytesToKB(image.size)?.toFixed(2),
        mb: bytesToMB(image.size)?.toFixed(2),
        sequence: index,
        file: image,
      });
    });
    setMediaUrls(urls);
  }, []);

  const handleDelete = useCallback(
    (index) => {
      const urls = [...mediaUrls];
      setImageIndex((prev) => (index === 0 ? prev : prev - 1));
      urls.splice(index, 1);
      setMediaUrls(urls);
    },
    [mediaUrls]
  );

  return useMemo(
    () => ({
      onChange,
      mediaUrls,
      imageIndex,
      setImageIndex,
      handleDelete,
      setMediaUrls,
    }),
    [onChange, mediaUrls, imageIndex, setImageIndex, handleDelete, setMediaUrls]
  );
};

export default useImage;
