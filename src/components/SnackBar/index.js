import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackBar({ open, severity, message }) {
  const classes = useStyles();
  const [snack, setSnack] = useState(false);

  useEffect(() => {
    if (open) {
      setSnack(true);
    } else {
      setSnack(false)
    }
  },[open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false)
  };

  return (
    <div className={classes.root}>
      <Snackbar open={snack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}
