import CONSTANTS from "@ecom/ui/constants";
import { useCategories } from "@hooks";
import { useCallback, useMemo, useState } from "react";

function bytesToKB(bytes) {
  return bytes / 1024;
}

function bytesToMB(bytes) {
  return bytes / (1024 * 1024);
}

const useFileHandler = ({ categoryId }) => {
  const { uploadMedia, deleteMedia } = useCategories({ id: null });

  const [file, setFile] = useState([]);

  const fileChangeHandler = useCallback((e) => {
    const payload = e.target.files;
    const urls = [];
    [...payload].forEach((image) => {
      urls.push({
        url: URL.createObjectURL(image),
        name: image.name,
        size: image.size,
        type: image.type,
        kb: bytesToKB(image.size)?.toFixed(2),
        mb: bytesToMB(image.size)?.toFixed(2),
        file: image,
        key: crypto.randomUUID(),
        id: null,
      });
    });
    setFile(urls);
  }, []);

  const handleUpload = useCallback(async () => {
    if (file?.length === 0) return;
    const [image] = file;
    const formdata = new FormData();
    formdata.append("media", image.file);
    const { data } = await uploadMedia({ id: categoryId, data: formdata });
    const value = [...file];
    value[0].id = data?.data?.[0]?.mediaId;
    setFile(value);
  }, [file]);

  const deleteFile = useCallback(async (items, cb) => {
    if (items?.id) {
      // delete from db
      const { data } = await deleteMedia({ id: items?.id });
      if (data.status === CONSTANTS.STATUS.SUCCESS) {
        setFile([]);
        cb();
      }
      return;
    }
    cb();
    setFile([]);
  }, []);

  return useMemo(
    () => ({ fileChangeHandler, file, handleUpload, deleteFile, setFile }),
    [fileChangeHandler, file, handleUpload, deleteFile, setFile],
  );
};

export default useFileHandler;
