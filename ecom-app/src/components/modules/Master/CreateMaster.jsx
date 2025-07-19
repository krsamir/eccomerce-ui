import SaveIcon from "@mui/icons-material/Save";
import React, { useCallback, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router";
import CONSTANTS from "@ecom/ui/constants";
import { useForm } from "react-hook-form";
import FormBuilder from "@utils/FormBuilder";
import { formSchema } from "./Form.schema";
import { useMaster } from "@hooks";
import { convertISOToLocal } from "@utils";
import { useGlobalContext } from "@store";

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
  const location = useLocation();

  const query = useMemo(() => new URLSearchParams(location.search), [location]);

  const { user } = useMaster({ enabled: false, id: query?.get("id") });
  const { state } = useGlobalContext();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
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
      created_at: "",
      updated_at: "",
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
      setValue("isActive", user.isActive === 1);
      setValue("isDeleted", user.isDeleted === 1);
      setValue("token", user.token ? user.token : "N/A");
      setValue("validTill", user.validTill ? user.validTill : "N/A");
      setValue("lastLogin", convertISOToLocal(user.lastLogin));
      setValue("invalidLogins", user.invalidLogins);
      setValue("created_at", convertISOToLocal(user.createdAt));
      setValue("updated_at", convertISOToLocal(user.updatedAt));
    }
  }, [user]);

  const handleNavigation = useCallback(() => {
    navigate(
      `/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MASTER}`
    );
  }, []);

  const handleSave = () => {
    handleSubmit((data) => {
      console.log("🚀 ~ handleSubmit ~ data:", data);
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
  return (
    <Container>
      <ButtonContainer>
        <LeftButtonContainer>
          <Button variant="contained" onClick={handleNavigation}>
            <ArrowBackIcon sx={{ marginRight: "5px" }} />
            Back
          </Button>
        </LeftButtonContainer>
        <Button variant="contained" onClick={handleSave}>
          <SaveIcon sx={{ marginRight: "5px" }} />
          {watch("id") ? "Update" : "Create"}
        </Button>
      </ButtonContainer>
      <FormBuilder data={formSchema} controller={control} errors={errors} />
    </Container>
  );
}

export default CreateMaster;
