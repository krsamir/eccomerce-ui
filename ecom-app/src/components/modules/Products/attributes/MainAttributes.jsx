import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import styled from "@emotion/styled";
import AsyncSelect from "react-select/async";
import { hsnsApi } from "@api";
import { useBarcodeScan } from "@hooks";
import { useGlobalContext } from "@store";
import TemplateDialog from "./Template";

function MainAttributes({ form }) {
  const handlerRef = useRef(false);

  const [lastOptions, setLastOptions] = useState([]);
  const [openTemplates, setOpenTemplates] = React.useState(false);

  const { state: { units } = {} } = useGlobalContext();

  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = form;

  const promiseOptions = (query) =>
    new Promise((resolve, reject) => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
      handlerRef.current = setTimeout(async () => {
        if (query?.length > 2) {
          try {
            const { data: { data = [] } = {} } =
              await hsnsApi.getHsnsByNameAndCode(query);
            if (Array.isArray(data)) {
              setLastOptions(data);
            }
            resolve(data);
          } catch (error) {
            reject(error);
          }
        }
      }, 500);
    });

  const handleBarcodeScan = (code) => {
    const sanitizedCode = code?.replace("CapsLock", "");
    setValue("barcode", sanitizedCode);
  };

  useBarcodeScan(handleBarcodeScan);

  return (
    <>
      <Wrapper>
        <Title>Product Attributes</Title>
      </Wrapper>
      <Wrapper>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Name cannot be empty.",
          }}
          render={({ field }) => (
            <TextField
              placeholder="NAME"
              {...field}
              variant="filled"
              autoComplete="off"
              fullWidth
              error={Boolean(errors?.name)}
              helperText={errors?.name?.message}
            />
          )}
        />
      </Wrapper>
      <Wrapper>
        <Controller
          name="hsnId"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              cacheOptions
              defaultOptions={lastOptions}
              loadOptions={promiseOptions}
              placeholder="Search HSN"
              onChange={(value) => setValue("hsnId", value.value)}
            />
          )}
        />
      </Wrapper>
      <Wrapper>
        <Controller
          name="hindiName"
          control={control}
          render={({ field }) => (
            <TextField
              placeholder="हिंदी नाम"
              {...field}
              variant="filled"
              autoComplete="off"
              fullWidth
            />
          )}
        />
      </Wrapper>
      <Wrapper>
        <Controller
          name="uuid"
          control={control}
          render={({ field }) => (
            <TextField
              placeholder="UUID"
              {...field}
              variant="filled"
              autoComplete="off"
              fullWidth
            />
          )}
        />
      </Wrapper>
      <Wrapper>
        <Controller
          name="barcode"
          control={control}
          render={({ field }) => (
            <TextField
              placeholder="BARCODE"
              {...field}
              variant="filled"
              autoComplete="off"
              fullWidth
            />
          )}
        />
      </Wrapper>
      <Wrapper>
        <Container>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="UNIT"
                sx={{ mr: "10px" }}
                {...field}
                variant="filled"
                autoComplete="off"
                fullWidth
              />
            )}
          />
          <Controller
            name="unitType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">UNIT TYPE</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...field}
                  variant="filled"
                >
                  {units.map(({ id, name }) => (
                    <MenuItem value={id}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Container>
      </Wrapper>

      <Wrapper>
        <DescriptionContainer onClick={() => setOpenTemplates(true)}>
          {watch("description") ? (
            <div
              dangerouslySetInnerHTML={{ __html: watch("description") }}
            ></div>
          ) : (
            <GrayText>DESCRIPTION</GrayText>
          )}
        </DescriptionContainer>
        <TemplateDialog
          form={form}
          openTemplates={openTemplates}
          setOpenTemplates={setOpenTemplates}
        />
      </Wrapper>

      <Wrapper>
        <Container>
          <CheckBoxWrapper>
            <Label>Is Active ?</Label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  onChange={field.onChange}
                  checked={field.value}
                />
              )}
            />
          </CheckBoxWrapper>
          <CheckBoxWrapper>
            <Label>Is Deleted ?</Label>
            <Controller
              name="isDeleted"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  onChange={field.onChange}
                  checked={field.value}
                />
              )}
            />
          </CheckBoxWrapper>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 10px 10px 10px 0;
  width: 600px;
  :last-child {
    padding-bottom: 20px;
    border-bottom: 2px inset #ededed;
  }
  :first-of-type {
    border-bottom: 2px inset #ededed;
    margin-bottom: 10px;
  }
`;

const Title = styled.span`
  font-size: 22px;
`;

const Label = styled.span`
  margin-right: 6px;
  font-weight: 500;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.06);
  width: 600px;
  height: 310px;
  border-radius: 4px;
  overflow-y: auto;
  padding: 25px 12px 12px 8px;
`;

const GrayText = styled.span`
  color: rgb(152, 152, 152);
`;
export default MainAttributes;
