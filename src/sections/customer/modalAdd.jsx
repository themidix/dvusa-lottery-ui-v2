import * as React from 'react';
import { useCallback, useMemo, useState, useEffect } from 'react';  
import Modal from '@mui/material/Modal';
import CustomerStore from 'src/store/customer.store';
import { Box, Button, Step, StepLabel, Typography, Dialog, DialogContent, DialogTitle, Stepper, Select,  FormControl, InputLabel, MenuItem } from '@mui/material';
import HashLoader from "react-spinners/HashLoader";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EntrantForm from './entrantForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const steps = ['Information Personnelle', 'Information Complementaire', 'Resume'];


export default function FormAddCustomer() {
  const {isOpenModalAdd, setIsOpenModalAdd} = CustomerStore();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setIsOpenModalAdd(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    birthCity: '',
    countryOfBirth: '',
    eligibilityCountry: '',
    entrantPhotograph: '',
    phoneNumber: '',
    emailAddress: '',
    gender: '',
    countryOfResidence: '',
    educationLevel: '',
    maritalStatus: '',
  });
  
  const formik = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      agent_email: '',
      agent_phone_number: '',
      dv_business_id: '',
      submit: null
    },
    validationSchema: Yup.object({
      agent_email: Yup
        .string()
        .email('Veuillez saisir une adresse email valide')
        .max(45)
        .required('Le mail est obligatoire'),
      agent_phone_number: Yup
        .string()
        .max(45)
        .required('Le numero de telephone est obligatoire'),
      first_name: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le prenom est obligatoire'),
      middle_name: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le postnom est obligatoire'),
      last_name: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le nom est obligatoire'),
      dv_business_id: Yup
        .number()
        .max(45)
        .min(1)
        .required('Le choix du cybercafe est obligatoire'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const objectData = JSON.stringify({
          firstName : values.first_name,
          middleName : values.middle_name,
          lastName : values.last_name,
          agentPhoneNumber: values.agent_phone_number,
          // dvBusiness: values.dv_business_id,
          // user_id: localStorage.getItem('user_id'),
          agentEmail: values.agent_email,
        });
        setIsSubmitingLoading(true);

        const response = await FetchingData('agent','POST', objectData );
        if(response.status === 200 || response.status === 201) {
          toast.success('Enregistrement effectue avec success');

          setTimeout(() => {
            setOpen(false);
            setIsSubmitingLoading(false);
            setIsLoadingData(true);
          }, 2000);        
        }else{
          toast.error('Une erreur s\'est produite, veuillez reéssayer plus tard');
          setIsSubmitingLoading(false);
        }
      } catch (error) {
        toast.error('Une erreur s\'est produite, veuillez reéssayer plus tard');
        setIsSubmitingLoading(false);
      }
    }
  });
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <EntrantForm formData={formik}/>;
      case 1:
        return <EntrantForm formData={formData} 
                    setFormData={setFormData} />;
      case 2:
        return <EntrantForm formData={formData} />;
      default:
        return 'Étape inconnue';
    }
  };

  return (
    <div>      
      <Dialog open={isOpenModalAdd}
        fullWidth={true} 
        maxWidth={'md'}
        onClose={handleClose} 
        >
            <DialogTitle sx={{ backgroundColor: '#1C2536', color:'white'}}>Créer un entrant</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} sx={{mt:"1rem"}}>
                    {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} 
                            {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reinitialiser</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                >
                                Precedent
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                                </Button>
                            </Box>
                        </Box>
                    </React.Fragment>
                )}
            </DialogContent>
      </Dialog>
    </div>
  );
}
