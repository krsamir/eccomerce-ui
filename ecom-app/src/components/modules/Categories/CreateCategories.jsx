import SaveIcon from "@mui/icons-material/Save";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "@emotion/styled";
import { Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSearchParams, useNavigate } from "react-router";
import CONSTANTS from "@ecom/ui/constants";
import { useForm } from "react-hook-form";
import FormBuilder from "@utils/FormBuilder";
import { formSchema } from "./Form.schema";
import { useCategories, useFileHandler } from "@hooks";
import { useGlobalContext } from "@store";
import { useQueryClient } from "@tanstack/react-query";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { getConfig } from "@utils";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;
const LeftButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
const ImageUploadContainer = styled.div`
  margin-top: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UploadWrapper = styled.label`
  border-radius: 6px;
  border: 2px dashed #e2e2e2;
  height: 242px;
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FileInput = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;
const ButtonHandlers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextLabel = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

const DeleteButtonWrapper = styled.div`
  position: relative;
  top: -245px;
  left: 90px;
`;

function bytesToKB(bytes) {
  return bytes / 1024;
}

function bytesToMB(bytes) {
  return bytes / (1024 * 1024);
}

function CreateCategories() {
  const IMAGE_URL = `${getConfig().host}/api/media`;
  const TOKEN = getConfig().token;

  const categoriesRef = useRef(false);
  const rankRef = useRef(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [query, setQuery] = useSearchParams();

  const { createCategory, categoryById, updateCategory } = useCategories({
    id: query?.get("id"),
    isParentCategoryEnabled: true,
  });

  const { state } = useGlobalContext();
  const imageRef = useRef(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      parentId: "null",
      rank: "",
      isFavourite: false,
      isActive: true,
      createdAt: "",
      updatedAt: "",
    },
  });

  const { fileChangeHandler, file, handleUpload, deleteFile, setFile } =
    useFileHandler({
      categoryId: watch("id"),
    });

  useEffect(() => {
    if (categoryById.path) {
      setFile([
        {
          url: `${IMAGE_URL}/${TOKEN}${categoryById.path}`,
          name: categoryById.originalName,
          size: categoryById.size,
          type: categoryById.mimeType,
          kb: bytesToKB(categoryById.size)?.toFixed(2),
          mb: bytesToMB(categoryById.size)?.toFixed(2),
          file: null,
          key: crypto.randomUUID(),
          id: categoryById.mediaId,
        },
      ]);
    }

    if (Object.keys(categoryById)?.length > 0) {
      reset({
        id: categoryById.id,
        name: categoryById.name,
        rank: categoryById.rank,
        parentId:
          categoryById.parentId === null ? "null" : categoryById.parentId,
        rank: categoryById.rank,
        isFavourite: categoryById.isFavourite,
        isActive: categoryById.isActive,
        createdAt: categoryById.createdAt,
        updatedAt: categoryById.updatedAt,
      });
      // if valid object is not required
      if (Object.keys(categoryById)?.length === 0) {
        reset({}, { keepValues: false });
        query.delete("id");
        setQuery(query);
      }
    }
  }, [query, reset, setQuery, setValue, categoryById]);

  const handleNavigation = useCallback(() => {
    navigate(
      `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.CATEGORIES}`,
    );
  }, [navigate]);

  const handleSave = () => {
    handleSubmit((data) => {
      if (!data?.id) {
        const payload = {
          name: data?.name,
          parentId: data?.parentId === "null" ? null : data?.parentId,
          rank: data?.rank,
          isActive: data?.isActive,
          isFavourite: data?.isFavourite,
        };
        createCategory(payload, {
          onSuccess({ data }) {
            if (data.status === CONSTANTS.STATUS.SUCCESS) {
              const id = data?.data?.id;
              query.set("id", id);
              setQuery(query);
              queryClient.invalidateQueries({
                queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_CATEGORIES],
              });
              reset({}, { keepValues: true });
              setTimeout(() => {
                navigate(
                  `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.CATEGORIES}`,
                );
              }, 500);
            }
          },
        });
      } else {
        const value = Object.entries(data);
        const touchedFields = Object.keys(dirtyFields);
        const arr = [];
        value.forEach(([key, value]) => {
          if (touchedFields?.includes(key)) {
            arr.push([key, value]);
          }
        });
        const saveData = Object.fromEntries(arr);

        updateCategory(
          {
            ...saveData,
            parentId: (touchedFields ?? []).includes("parentId")
              ? saveData?.parentId === "null"
                ? null
                : saveData?.parentId
              : undefined,
            id: watch("id"),
          },
          {
            onSuccess(res) {
              if (res.data.status === CONSTANTS.STATUS.SUCCESS) {
                queryClient.invalidateQueries({
                  queryKey: [
                    CONSTANTS.QUERY_KEYS.GET_CATEGORY_BY_ID,
                    String(watch("id")),
                  ],
                });
                queryClient.invalidateQueries({
                  queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_CATEGORIES],
                });
              }
            },
          },
        );
      }
    })();
  };

  const parentCategories = useMemo(
    () => state.categories.filter(({ parentId }) => parentId === null),
    [state.categories],
  );

  if (!categoriesRef.current && parentCategories?.length > 0) {
    const arr = parentCategories.map((category) => ({
      name: category?.name,
      value: category?.id,
    }));
    arr.unshift({ name: "SELF", value: "null" });

    formSchema[
      formSchema.findIndex(({ name }) => name === "parentId") ?? 1
    ].dropDownOption = arr;

    categoriesRef.current = true;
  }
  if (!categoriesRef.current && parentCategories?.length === 0) {
    const arr = [];
    arr.push({ name: "SELF", value: "null" });
    formSchema[
      formSchema.findIndex(({ name }) => name === "parentId") ?? 1
    ].dropDownOption = arr;

    categoriesRef.current = true;
  }

  if (!rankRef.current && parentCategories?.length > 0) {
    formSchema[
      formSchema.findIndex(({ name }) => name === "rank") ?? 2
    ].dropDownOption = Array.from({ length: parentCategories?.length + 1 })
      .map((v, i) => ({
        name: i + 1,
        value: i + 1,
      }))
      .reverse();
    rankRef.current = true;
  }
  if (!rankRef.current && parentCategories?.length === 0) {
    formSchema[
      formSchema.findIndex(({ name }) => name === "rank") ?? 2
    ].dropDownOption = Array.from({ length: 1 }).map((v, i) => ({
      name: i + 1,
      value: i + 1,
    }));
    rankRef.current = true;
  }

  formSchema[
    formSchema.findIndex(({ name }) => name === "isFavourite") ?? 3
  ].disabled = watch("parentId") !== "null";

  return (
    <>
      <ButtonContainer>
        <LeftButtonContainer>
          <Button variant="contained" onClick={handleNavigation}>
            <ArrowBackIcon sx={{ marginRight: "5px" }} />
            Back
          </Button>
        </LeftButtonContainer>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!(Object.keys(dirtyFields)?.length > 0)}
        >
          <SaveIcon sx={{ marginRight: "5px" }} />
          {watch("id") ? "Update" : "Create"}
        </Button>
      </ButtonContainer>
      <FormBuilder
        data={formSchema}
        controller={control}
        errors={errors}
        setValue={setValue}
      />
      {query?.get("id")?.length > 0 && (
        <>
          <ImageUploadContainer>
            <UploadWrapper htmlFor="file-upload">
              <CameraAltIcon />
              <FileInput
                id="file-upload"
                type="file"
                onChange={fileChangeHandler}
                multiple={false}
                ref={imageRef}
              />
            </UploadWrapper>

            {file.map(({ url, key, name, mb, ...rest }) => (
              <ImageContainer key={key}>
                <Image src={url} />
                <TextLabel>{name}</TextLabel>
                <TextLabel>
                  {mb} {mb && "MB"}
                </TextLabel>
                <DeleteButtonWrapper>
                  <IconButton
                    onClick={() =>
                      deleteFile({ url, key, name, mb, ...rest }, () => {
                        // clearing value from image element
                        imageRef.current.value = null;
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </DeleteButtonWrapper>
              </ImageContainer>
            ))}
          </ImageUploadContainer>
          <ButtonHandlers>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!file?.length > 0}
              sx={{ width: 200 }}
            >
              Upload
            </Button>
          </ButtonHandlers>
        </>
      )}
    </>
  );
}

export default CreateCategories;
