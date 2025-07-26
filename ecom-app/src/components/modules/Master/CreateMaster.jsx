import SaveIcon from "@mui/icons-material/Save";
import React, { useCallback, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSearchParams, useNavigate } from "react-router";
import CONSTANTS from "@ecom/ui/constants";
import { useForm } from "react-hook-form";
import FormBuilder from "@utils/FormBuilder";
import { formSchema } from "./Form.schema";
import { useMaster } from "@hooks";
import { convertISOToLocal } from "@utils";
import { useGlobalContext } from "@store";
import { useQueryClient } from "@tanstack/react-query";

const Container = styled.div``;

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
function CreateMaster() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [query, setQuery] = useSearchParams();

  const { user, checkUserName, createUser, updateUser } = useMaster({
    enabled: false,
    id: query?.get("id"),
  });

  const { state } = useGlobalContext();
  console.log("🚀 ~ CreateMaster ~ state:", state.entities);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      id: "",
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      roles: "",
      mobile: "",
      lastLogin: "",
      token: "",
      validTill: "",
      isActive: "",
      isDeleted: "",
      invalidLogins: 0,
      createdAt: "",
      updatedAt: "",
      createdByUser: "",
      createdBy: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("userName", user.userName);
      setValue("email", user.email);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("mobile", user.mobile);
      setValue("roles", user.role?.id ?? "");
      setValue("isActive", user.isActive);
      setValue("isDeleted", user.isDeleted);
      setValue("token", user.token ? user.token : "N/A");
      setValue("validTill", user.validTill ? user.validTill : "N/A");
      setValue("lastLogin", convertISOToLocal(user.lastLogin));
      setValue("invalidLogins", user.invalidLogins);
      setValue("createdAt", convertISOToLocal(user.createdAt));
      setValue("updatedAt", convertISOToLocal(user.updatedAt));
      setValue("createdBy", user.createdBy);
      setValue("createdByUser", user.createdByUser);

      // if valid object is not required
      if (Object.keys(user)?.length === 0) {
        reset({}, { keepValues: false });
        query.delete("id");
        setQuery(query);
      }
    }
  }, [query, reset, setQuery, setValue, user]);

  const handleNavigation = useCallback(() => {
    navigate(
      `/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MASTER}`
    );
  }, [navigate]);

  const handleSave = () => {
    handleSubmit((data) => {
      if (!data?.id) {
        createUser(data, {
          onSuccess({ data }) {
            if (data.status === CONSTANTS.STATUS.SUCCESS) {
              const userId = data?.data?.id;
              query.set("id", userId);
              setQuery(query);
              reset({}, { keepValues: true });
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
        updateUser(
          { ...saveData, id: watch("id") },
          {
            onSuccess(res) {
              if (res.data.status === CONSTANTS.STATUS.SUCCESS) {
                // reset({}, { keepValues: true });
                queryClient.invalidateQueries({
                  queryKey: [CONSTANTS.QUERY_KEYS.GET_USER_BY_ID, watch("id")],
                });
              }
            },
          }
        );
      }
    })();
  };

  formSchema[
    formSchema.findIndex(({ name }) => name === "roles") ?? 6
  ].dropDownOption = useMemo(
    () =>
      (state?.roles ?? []).map((role) => ({
        name: role?.name,
        value: role?.id,
      })),
    [state]
  );

  formSchema[
    formSchema.findIndex(({ name }) => name === "userName") ?? 1
  ].blurHandler = useCallback(() => {
    if (watch("userName")?.length > 0) {
      checkUserName(
        { type: "userName", value: watch("userName") },
        {
          onSuccess({ data }) {
            if (
              data?.status === CONSTANTS.STATUS.SUCCESS &&
              data?.data?.isExisting
            ) {
              setError("userName", {
                message: `${watch("userName")} Already Exists.`,
              });
            } else {
              clearErrors("userName");
            }
          },
        }
      );
    }
  }, [checkUserName, clearErrors, setError, watch]);

  formSchema[
    formSchema.findIndex(({ name }) => name === "email") ?? 2
  ].blurHandler = useCallback(() => {
    if (watch("email")?.length > 0) {
      checkUserName(
        { type: "email", value: watch("email") },
        {
          onSuccess({ data }) {
            if (
              data?.status === CONSTANTS.STATUS.SUCCESS &&
              data?.data?.isExisting
            ) {
              setError("email", {
                message: `${watch("email")} Already Exists.`,
              });
            } else {
              clearErrors("email");
            }
          },
        }
      );
    }
  }, [checkUserName, clearErrors, setError, watch]);

  return (
    <Container>
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
      <FormBuilder data={formSchema} controller={control} errors={errors} />
    </Container>
  );
}

export default CreateMaster;
