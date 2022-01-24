import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function ResetPasswordModal({ handleClose, open }) {
  const [text, setText] = React.useState("Send reset email");

  const emailRef = React.useRef(null);
  const handlePasswordReset = async () => {
    setText("Sending email...");
    try {
      await axios.post(process.env.REACT_APP_API + "/profile/forgot-password", { email: emailRef.current.value });
      setTimeout(() => {
        setText("Send reset email");
        handleClose();
      }, 1000);
    } catch (error) {
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Password reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, type your email below and check your inbox after a couple of seconds
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            color="warning"
            inputRef={emailRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning">
            Cancel
          </Button>
          <Button onClick={handlePasswordReset} color="warning">
            {text}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
