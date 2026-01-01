import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { mediaApi } from "@api";

function bytesToKB(bytes) {
  return bytes / 1024;
}

function bytesToMB(bytes) {
  return bytes / (1024 * 1024);
}

const useImage = ({ productId = "" }) => {
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

  const { mutateAsync: uploadMedia } = useMutation({
    mutationFn: mediaApi.uploadMediaApi,
  });

  const handleMediaUpload = async () => {
    for (let i = 0; i < mediaUrls.length; i++) {
      try {
        const formdata = new FormData();
        const item = mediaUrls[i];
        formdata.append("media", item.file);
        formdata.append("sequence", item.sequence);
        formdata.append("productId", productId);
        await uploadMedia(formdata);
      } catch (error) {
        console.log("🚀 ~ handleMediaUpload ~ error:", error);
      }
    }
  };

  return useMemo(
    () => ({
      onChange,
      mediaUrls,
      imageIndex,
      setImageIndex,
      handleDelete,
      setMediaUrls,
      handleMediaUpload,
    }),
    [
      onChange,
      mediaUrls,
      imageIndex,
      setImageIndex,
      handleDelete,
      setMediaUrls,
      handleMediaUpload,
    ]
  );
};

export default useImage;
