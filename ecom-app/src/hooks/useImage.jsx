import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { mediaApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { getConfig } from "@utils";

const IMAGE_URL = `${getConfig().host}/api/media`;
const TOKEN = getConfig().token;

function bytesToKB(bytes) {
  return bytes / 1024;
}

function bytesToMB(bytes) {
  return bytes / (1024 * 1024);
}

const useImage = ({ productId = "" }) => {
  const [mediaUrls, setMediaUrls] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const queryClient = useQueryClient();

  const { mutateAsync: uploadMedia } = useMutation({
    mutationFn: mediaApi.uploadMediaApi,
  });

  const { data: { data: { data: medias = [] } = {} } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_MEDIA_LIST_BY_PRODUCT_ID, productId],
    queryFn: () => mediaApi.getMediaList(productId),
    enabled: !!productId,
  });

  const { mutateAsync: deleteMedia } = useMutation({
    mutationFn: mediaApi.deleteMediaApi,
  });

  const { mutate: updateSequence } = useMutation({
    mutationFn: mediaApi.updateSequenceMediaApi,
  });

  const onChange = useCallback(
    (e) => {
      setImageIndex(0);
      const urls = [];
      urls.push(...mediaUrls);
      const files = e.target.files;
      [...files].forEach((image) => {
        urls.push({
          url: URL.createObjectURL(image),
          name: image.name,
          size: image.size,
          type: image.type,
          kb: bytesToKB(image.size)?.toFixed(2),
          mb: bytesToMB(image.size)?.toFixed(2),
          file: image,
        });
      });
      setMediaUrls(urls.map((item, i) => ({ ...item, sequence: i + 1 })));
    },
    [mediaUrls]
  );

  const handleDelete = useCallback(
    async (index) => {
      try {
        const urls = [...mediaUrls];
        const obj = urls[index];
        if (obj?.id && !obj.file) {
          await deleteMedia({ id: obj?.id, productId });
          setImageIndex((prev) => (index === 0 ? prev : prev - 1));
          urls.splice(index, 1);
          setMediaUrls(urls);
        } else {
          setImageIndex((prev) => (index === 0 ? prev : prev - 1));
          urls.splice(index, 1);
          setMediaUrls(urls);
        }
      } catch (error) {
        console.log("🚀 ~ useImage ~ error:", error);
      }
    },
    [mediaUrls]
  );

  const handleMediaUpload = useCallback(async () => {
    const itemsToUpload = mediaUrls.filter((t) => !t.id);
    for (let i = 0; i < itemsToUpload.length; i++) {
      try {
        const formdata = new FormData();
        const item = itemsToUpload[i];
        formdata.append("media", item.file);
        formdata.append("sequence", item.sequence);
        formdata.append("productId", productId);
        await uploadMedia(formdata);
        if (itemsToUpload?.length === i + 1) {
          const payload = itemsToUpload
            .filter((t) => t?.id)
            ?.map((it, i) => ({ id: it?.id, sequence: i + 1 }));
          updateSequence({ payload, productId });
          queryClient.invalidateQueries({
            queryKey: [
              CONSTANTS.QUERY_KEYS.GET_MEDIA_LIST_BY_PRODUCT_ID,
              productId,
            ],
          });
        }
      } catch (error) {
        console.log("🚀 ~ handleMediaUpload ~ error:", error);
      }
    }
  }, [mediaUrls]);

  useEffect(() => {
    if (medias?.length > 0) {
      const value = medias.map((item) => ({
        url: `${IMAGE_URL}/${TOKEN}${item.path}`,
        name: item.file_name,
        size: item.size,
        type: item.mime_type,
        kb: bytesToKB(item.size)?.toFixed(2),
        mb: bytesToMB(item.size)?.toFixed(2),
        sequence: item.sequence,
        file: null,
        id: item.id,
      }));
      setMediaUrls(value);
    }
  }, [medias]);

  return useMemo(
    () => ({
      onChange,
      mediaUrls,
      imageIndex,
      setImageIndex,
      handleDelete,
      setMediaUrls,
      handleMediaUpload,
      medias,
      updateSequence,
    }),
    [
      onChange,
      mediaUrls,
      imageIndex,
      setImageIndex,
      handleDelete,
      setMediaUrls,
      handleMediaUpload,
      medias,
      updateSequence,
    ]
  );
};

export default useImage;
