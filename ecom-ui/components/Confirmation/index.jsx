import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function ConfirmationDialog({
  open,
  setOpen,
  title,
  context,
  cancelLabel,
  submitLabel,
  onSubmit,
}) {
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    onSubmit()
    handleClose()
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>{context}</DialogContentText>
          <DialogActions>
            <Button onClick={handleClose}>{cancelLabel}</Button>
            <Button type="submit" onClick={handleSubmit}>
              {submitLabel}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
