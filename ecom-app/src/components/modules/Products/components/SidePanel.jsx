import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import styled from "@emotion/styled";
import { APP_CONSTANTS } from "@ecom/ui/constants/appConstants";

const { FILTER_TYPES } = APP_CONSTANTS;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function SidePanel({
  units,
  filters,
  setFilters,
  getByFilters,
}) {
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    [FILTER_TYPES.TEXT_FILTER]: [],
    [FILTER_TYPES.BOOLEAN_FILTER]: [],
    [FILTER_TYPES.EXACT_MATCH]: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFilters({
      [FILTER_TYPES.TEXT_FILTER]: [],
      [FILTER_TYPES.BOOLEAN_FILTER]: [],
      [FILTER_TYPES.EXACT_MATCH]: [],
    });
    setFilters({});
    setOpen(false);
  };

  const TEXT_FILTER = ["name", "barcode", "hindiName", "unit", "uuid"];
  const BOOLEAN_FILTER = ["isActive", "isDeleted"];
  const EXACT_MATCH = ["unitType"];

  function camelToWords(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleFiterChange = (e) => {
    const {
      target: { name, value },
    } = e;
    const val = { ...filters };
    val[name] = value;
    setFilters(val);
  };

  const handleFilters = (item, type) => {
    const value = { ...selectedFilters };
    const filts = { ...filters };
    const index = value[type].indexOf(item);
    if (index > -1) {
      value[type].splice(index, 1);
      filts[`${type}.${item}`] = undefined;
    } else {
      value[type].push(item);
      filts[`${type}.${item}`] =
        type !== FILTER_TYPES.BOOLEAN_FILTER ? "" : true;
    }
    setSelectedFilters(value);
    setFilters(filts);
  };

  return (
    <React.Fragment>
      <ButtonComponent variant="contained" onClick={handleClickOpen}>
        Filters
      </ButtonComponent>
      <DialogComponent
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Filters
            </Typography>
            <ButtonComponent color="inherit" onClick={handleClose}>
              Close
            </ButtonComponent>
          </Toolbar>
        </AppBar>
        <Container>
          <Wrapper>
            {TEXT_FILTER.map((item) => (
              <Tags
                className={
                  selectedFilters[FILTER_TYPES.TEXT_FILTER].some(
                    (val) => val === item
                  ) && "selected"
                }
                key={item}
                onClick={() => handleFilters(item, FILTER_TYPES.TEXT_FILTER)}
              >
                {camelToWords(item)}
              </Tags>
            ))}
          </Wrapper>
          <VerticalContainer>
            {selectedFilters[FILTER_TYPES.TEXT_FILTER].map((item) => (
              <Input
                type="text"
                key={item}
                placeholder={camelToWords(item)}
                name={`${FILTER_TYPES.TEXT_FILTER}.${item}`}
                onChange={handleFiterChange}
              />
            ))}
          </VerticalContainer>
          <Wrapper>
            {EXACT_MATCH.map((item) => (
              <Tags
                className={
                  selectedFilters[FILTER_TYPES.EXACT_MATCH].some(
                    (val) => val === item
                  ) && "selected"
                }
                key={item}
                onClick={() => handleFilters(item, FILTER_TYPES.EXACT_MATCH)}
              >
                {camelToWords(item)}
              </Tags>
            ))}
          </Wrapper>
          {selectedFilters[FILTER_TYPES.EXACT_MATCH].some(
            (item) => item === "unitType"
          ) && (
            <VerticalContainer>
              <Select
                name={`${FILTER_TYPES.EXACT_MATCH}.${"unitType"}`}
                onChange={handleFiterChange}
              >
                {units.map(({ id, name }) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </VerticalContainer>
          )}
          <Wrapper>
            {BOOLEAN_FILTER.map((item) => (
              <Tags
                className={
                  selectedFilters[FILTER_TYPES.BOOLEAN_FILTER].some(
                    (val) => val === item
                  ) && "selected"
                }
                key={item}
                onClick={() => handleFilters(item, FILTER_TYPES.BOOLEAN_FILTER)}
              >
                {camelToWords(item)}
              </Tags>
            ))}
          </Wrapper>
          <ButtonComponent
            variant="contained"
            className="last-btn"
            onClick={() => getByFilters()}
          >
            Apply
          </ButtonComponent>
          <ButtonComponent
            variant="contained"
            className="last-btn"
            onClick={() => {
              setSelectedFilters({
                [FILTER_TYPES.TEXT_FILTER]: [],
                [FILTER_TYPES.BOOLEAN_FILTER]: [],
                [FILTER_TYPES.EXACT_MATCH]: [],
              });
              getByFilters("clear");
            }}
          >
            Clear
          </ButtonComponent>
        </Container>
      </DialogComponent>
    </React.Fragment>
  );
}

const DialogComponent = styled(Dialog)`
  &.MuiDialog-root {
    width: 450px !important;
    left: auto !important;
  }
`;

const ButtonComponent = styled(Button)`
  margin-left: 10px;
  &.last-btn {
    margin: 20px 0 0 10px;
  }
`;

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0 0 20px;
  flex-wrap: wrap;
`;
const Tags = styled.span`
  background-color: #e2e2e2;
  margin: 4px;
  padding: 5px 10px;
  border-radius: 12px;
  &.selected {
    background-color: rgba(101, 169, 113, 0.918);
  }
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 10px;
`;
