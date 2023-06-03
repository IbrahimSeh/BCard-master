import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const DownSnackBar = () => {
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick(TransitionDown)}>Down</Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="login error"
        key={transition ? transition.name : ""}
      />
    </div>
  );
};

export default DownSnackBar;
