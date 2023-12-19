import * as React from 'react';
import { useCallback, useMemo, useState, useEffect } from 'react';  
import Modal from '@mui/material/Modal';
import CustomerStore from 'src/store/customer.store';
import { Box, Button, Step, StepLabel, Typography, Dialog, DialogContent, DialogTitle, Stepper, Select,  FormControl, InputLabel, MenuItem } from '@mui/material';
import HashLoader from "react-spinners/HashLoader";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EntrantForm from './entrantForm';
import EntrantMoreInfoForm from './moreInfoForm';


const steps = ['Information Personnelle', 'Information Complementaire', 'Resume'];

export default function FormAddCustomer() {
  const {isOpenModalAdd, setIsOpenModalAdd} = CustomerStore();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setIsOpenModalAdd(false);
  const [dataEntrant, setDataEntrant] = useState({});


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
      firstName: '',
      lastName: '',
      middleName: '',
      birthDate: '',
      birthCity: '',
      countryOfBirth: '',
      firstNameSpouseDTO: '',
      lastNameSpouseDTO: '',
      middleNameSpouseDTO: '',
      birthDateSpouseDTO: '',
      birthCitySpouseDTO: '',
      countryOfBirthSpouseDTO: '',
      eligibilityCountry: '',
      entrantPhotograph: '',
      photographSpouseDTO: '',
      phoneNumber: '',
      emailAddress: '',
      gender: '',
      countryOfResidence: '',
      educationLevel: '',
      maritalStatus: '',
      numberOfChildren: 0,
      submit: null
    },
    validationSchema: Yup.object({
      emailAddress: Yup
        .string()
        .email('Veuillez saisir une adresse email valide')
        .max(45)
        .required('Le mail est obligatoire'),
      phoneNumber: Yup
        .string()
        .max(45)
        .required('Le numero de telephone est obligatoire'),
      firstName: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le prenom est obligatoire'),
      middleName: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres'),
        // .required('Le postnom est obligatoire'),
      lastName: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le nom est obligatoire'),
      birthDate: Yup
        .date()
        .required('La date de naissance est obligatoire'),
      birthCity: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('La ville de Naissance est obligatoire'),
      countryOfBirth: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le pays de naissance est obligatoire'),
      entrantPhotograph: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('La photo est obligatoire'),
      gender: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le genre est obligatoire'),
      countryOfResidence: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le pays de residence est obligatoire'),
      spouseDTO: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres'),
      firstNameSpouseDTO: Yup
        .string()
        .max(45)
        .min(2, 'Le prenom doit avoir au moins 2 caracteres')
        .required('Le prenom est obligatoire'),
      lastNameSpouseDTO: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le nom est obligatoire'),
      middleNameSpouseDTO: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres'),
        // .required('Le postnom est obligatoire'),
      genderSpouseDTO: Yup
          .string()
          .max(45)
          .min(2, 'Il faut saisir au moins 2 caracteres')
          .required('Le genre est obligatoire'),
      birthDateSpouseDTO: Yup
          .date()
          .required('La date de naissance est obligatoire'),
      birthCitySpouseDTO: Yup
          .string()
          .max(45)
          .min(2, 'Il faut saisir au moins 2 caracteres')
          .required('La ville de Naissance est obligatoire'),
      countryOfBirthSpouseDTO: Yup
          .string()
          .max(45)
          .min(2, 'Il faut saisir au moins 2 caracteres')
          .required('Le pays de naissance est obligatoire'),
      photographSpouseDTO: Yup
          .string()
          .max(45)
          .min(2, 'Il faut saisir au moins 2 caracteres')
          .required('La photo est obligatoire'),
      numberOfChildren: Yup
        .number()
        .max(30)
        .min(0, 'La valeur minimale est 0')
        .required('Le nombre d\'enfant est obligatoire'),
      educationLevel: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres'),
        // .required('Le niveau scolaire est obligatoire'),
    }),
    onSubmit: async (values, helpers) => {
      console.log("Submit in parent");
      return null;
      try {
        const objectData = JSON.stringify({
          firstName : values.firstName,
          middleName : values.middleName,
          lastName : values.lastName,
          phoneNumber: values.phoneNumber,
          emailAddress: values.emailAddress,
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        return <EntrantForm formData={formik} 
        setDataEntrant={setDataEntrant}
        dataEntrant={dataEntrant}
        handleNext={handleNext} />;
      case 1:
        return <EntrantMoreInfoForm formData={formik} 
        handleNext={handleNext} 
        setDataEntrant={setDataEntrant}
        dataEntrant={dataEntrant}
        handleBack={handleBack} />;
      case 2:
        return <EntrantForm formData={formik} />;
      default:
        return <EntrantForm formData={formik}/>;
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
                <Stepper activeStep={activeStep} 
                  sx={{mt:"1rem"}}>
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
                            Resumer - you&apos;re finished
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
                            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
                            </Box> */}
                        </Box>
                    </React.Fragment>
                )}
            </DialogContent>
      </Dialog>
    </div>
  );
}
