import React from "react";
import { Alert, Snackbar } from "@mui/material";
import * as Common from './Common';

type Props = {
  text: string;
  level: 'error' | 'warning' | 'info' | 'success'
};

const Feedback: React.FC<Props> = ({ text, level }) => {

  const [open, setOpen] = React.useState(true);
  
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const autoHide = (lev: string) => {
    switch (lev) {
      case 'error': return 10000;
      case 'warning': return 8000;
      case 'info': return 6000;
      case 'success': return 4000;
    }

  };

  return (
    <Snackbar open={open} 
      autoHideDuration={autoHide(level)}       
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}>
      <Alert severity={level}
        iconMapping={{
          error: <Common.Icon name='circle-exclamation' size='lg' />,
          warning: <Common.Icon name='diamond-exclamation' size='lg' />,
          info: <Common.Icon name='circle-exclamation' size='lg' />,
          success: <Common.Icon name='circle-check' size='lg' />,
        }}     
       >
        {text}
        {/* <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false); }} >
          <Common.Icon name='times' size='lg' />
        </IconButton> */}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
