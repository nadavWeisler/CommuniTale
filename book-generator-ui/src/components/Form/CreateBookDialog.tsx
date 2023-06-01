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
import { DialogContent, DialogTitle } from '@mui/material';
import BookForm from './BookForm';
import { useJsonPost } from './apiUtils';

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <BookForm />;
    case 1:
      return <Review />;
    case 2:
      return <PrintForm />;
    default:
      throw new Error('Unknown step');
  }
}

interface BookFormProps {
  showFormDialog: boolean;
  closeFormDialog: () => void;
}

export default function CreateBookDialog(props: BookFormProps) {
  const { showFormDialog } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [postJson, loading] = useJsonPost();
  function closeForm() {
    setActiveStep(0);
    props.closeFormDialog();
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  React.useEffect(() => {
    if (activeStep === 1) {
      postJson(JSON.stringify({ book: "book"}));
    }}, [activeStep]); //eslint-disable-line

  return (
    <Dialog open={showFormDialog} onClose={closeForm}>
      <DialogTitle>Create Your Own Book</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
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
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
}