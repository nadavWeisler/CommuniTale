import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Review from './Review';
import PrintForm from './PrintForm';
import Dialog from '@mui/material/Dialog';
import { steps } from '../../constants';
import { CircularProgress, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import BookForm from './BookForm';
import { useJsonPost, getPdf } from './apiUtils';

interface BookFormProps {
  showFormDialog: boolean;
  closeFormDialog: () => void;
}

export default function CreateBookDialog(props: BookFormProps) {
  const { showFormDialog } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [postJson, loading, bookData] = useJsonPost();
  const [formJson, setFormJson] = React.useState({});
  const [enableGenerateBook, setEnableGenerateBook] = React.useState(false);
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <BookForm setBookDetails={setFormJson} setEnableGenerateBook={setEnableGenerateBook} />;
      case 1:
        return <Review bookData={bookData} />;
      case 2:
        return <PrintForm />;
      default:
        throw new Error('Unknown step');
    }
  }

  function closeForm() {
    setActiveStep(0);
    props.closeFormDialog();
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 3) {
      setEnableGenerateBook(false);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getNextButtonText() {
    if (activeStep === 0) {
      return 'Generate Book';
    } else if (activeStep === 2) {
      return 'Place Order';
    } else {
      return 'Next';
    }
  }

  function getThankYouMessage() {
    getPdf();
    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Thank you for your order.
        </Typography>
        <Typography variant="subtitle1">
          Your order number is #2001539. We have emailed your order
          confirmation, and will send you an update when your order has
          shipped.
        </Typography>
      </React.Fragment>
    );
  }

  function ifEnableGenerateBook() {
    if (activeStep === 0) {
      return enableGenerateBook
    } else {
      return true;
    }
  }

  React.useEffect(() => {
    if (activeStep === 1) {
      postJson(JSON.stringify(formJson));
    }
  }, [activeStep]); //eslint-disable-line

  return (
    <Dialog open={showFormDialog} onClose={closeForm} fullWidth>
      <DialogTitle>Create Your Own Book</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {
          loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box> :
            activeStep !== steps.length ?
              getStepContent(activeStep) :
              getThankYouMessage()
        }
      </DialogContent>
      {activeStep <= 2 &&
        <DialogActions>
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!ifEnableGenerateBook()}
          >
            {getNextButtonText()}
          </Button>
        </DialogActions>
      }
    </Dialog>
  );
}