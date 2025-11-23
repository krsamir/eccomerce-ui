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
import { useRef } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TemplateDialog = () => {
  const tempRef = useRef(null);

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonComponent fullWidth variant="contained" onClick={handleClickOpen}>
        Description Templates
      </ButtonComponent>

      <Dialog
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
              Templates
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="inherit" onClick={handleClose}>
              Add to Description
            </Button>
          </Toolbar>
        </AppBar>
        <>
          <Editor ref={tempRef} />
        </>
      </Dialog>
    </React.Fragment>
  );
};
export default TemplateDialog;

const ButtonComponent = styled(Button)`
  margin: 10px 0;
`;
