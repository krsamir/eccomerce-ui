import * as React from "react";
import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Editor from "../../Editor";
import { useRef, useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TemplateDialog = ({ form, openTemplates, setOpenTemplates }) => {
  const tempRef = useRef({ getHtmlContent: () => {} });

  const [isOpenedOnce, setIsOpenedOnce] = useState(false);

  const handleClickOpen = () => {
    setOpenTemplates(true);
  };

  const handleClose = () => {
    setOpenTemplates(false);
  };

  const addToDescription = () => {
    form.setValue("description", tempRef?.current?.getHtmlContent());
    handleClose();
  };

  return (
    <React.Fragment>
      <ButtonComponent fullWidth variant="contained" onClick={handleClickOpen}>
        Description Templates
      </ButtonComponent>

      <Dialog
        fullScreen
        open={openTemplates}
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
              Templates
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="inherit" onClick={addToDescription}>
              Add to Description
            </Button>
          </Toolbar>
        </AppBar>
        <>
          <Editor
            ref={tempRef}
            addToDescription={addToDescription}
            isOpenedOnce={isOpenedOnce}
            setIsOpenedOnce={setIsOpenedOnce}
            form={form}
          />
        </>
      </Dialog>
    </React.Fragment>
  );
};
export default TemplateDialog;

const ButtonComponent = styled(Button)`
  margin: 10px 0;
`;
