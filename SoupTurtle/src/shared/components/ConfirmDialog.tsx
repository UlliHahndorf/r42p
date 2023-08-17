import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useTranslation } from "react-i18next";

type Props = {
    title: string;
    message: string;
    open: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setOpen: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onConfirm: any;
};

const ConfirmDialog = (props: Props) => {
  const { title, message, open, setOpen, onConfirm } = props;

  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="primary"
        >{t('main.confirmOk')}</Button>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
          >{t('main.confirmCancel')}</Button>
          </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;