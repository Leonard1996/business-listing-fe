import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from "@mui/material";
export default function Modal({ title, text, no, yes, pending, handleClose, callback, isOpen, disabled }) {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={handleClose}>
          {no}
        </Button>
        <Button color="error" onClick={callback} autoFocus disabled={disabled}>
          {pending ?? yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
