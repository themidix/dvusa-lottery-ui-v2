
import React from 'react';
import { TextField, FormControl, Stack, InputLabel, Select, MenuItem, Typography, Box, Grid, Button  } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const EntrantForm = ({ formData, dataEntrant, setDataEntrant, handleNext }) => {

  const formik = useFormik({
    initialValues: {
      firstName: dataEntrant.firstName ? dataEntrant.firstName : '',
      lastName:  dataEntrant.lastName ? dataEntrant.lastName : '',
      middleName:  dataEntrant.middleName ? dataEntrant.middleName : '',
      birthDate:  dataEntrant.birthDate ? dataEntrant.birthDate : '',
      birthCity:  dataEntrant.birthCity ? dataEntrant.birthCity : '',
      countryOfBirth:  dataEntrant.countryOfBirth ? dataEntrant.countryOfBirth : '',
      // firstNameSpouseDTO:  dataEntrant.firstName ? dataEntrant.firstName : '',
      // lastNameSpouseDTO:  dataEntrant.firstName ? dataEntrant.firstName : '',
      // middleNameSpouseDTO:  dataEntrant.firstName ? dataEntrant.firstName : '',
      // birthDateSpouseDTO:  dataEntrant.firstName ? dataEntrant.firstName : '',
      // birthCitySpouseDTO:  dataEntrant.firstName ? dataEntrant.firstName : '',
      // countryOfBirthSpouseDTO:  dataEntrant.firstName ? dataEntrant.firstName : '',
      // eligibilityCountry:  dataEntrant.firstName ? dataEntrant.firstName : '',
      // entrantPhotograph:  dataEntrant.firstName ? dataEntrant.firstName : '',
      // photographSpouseDTO:  dataEntrant.firstName ? dataEntrant.firstName : '',
      phoneNumber:  dataEntrant.phoneNumber ? dataEntrant.phoneNumber : '',
      emailAddress:  dataEntrant.emailAddress ? dataEntrant.emailAddress : '',
      gender:  dataEntrant.gender ? dataEntrant.gender : '',
      countryOfResidence:  dataEntrant.countryOfResidence ? dataEntrant.countryOfResidence : '',
      educationLevel:  dataEntrant.educationLevel ? dataEntrant.educationLevel : '',
      maritalStatus:  dataEntrant.maritalStatus ? dataEntrant.maritalStatus : '',
      numberOfChildren: dataEntrant.numberOfChildren ? dataEntrant.numberOfChildren :0,
      // submit: null
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
      // entrantPhotograph: Yup
      //   .string()
      //   .max(45)
      //   .min(2, 'Il faut saisir au moins 2 caracteres')
      //   .required('La photo est obligatoire'),
      gender: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le genre est obligatoire'),
      maritalStatus: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le genre est obligatoire'),
      countryOfResidence: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        .required('Le pays de residence est obligatoire'),
      // spouseDTO: Yup
      //   .string()
      //   .max(45)
      //   .min(2, 'Il faut saisir au moins 2 caracteres'),
      // firstNameSpouseDTO: Yup
      //   .string()
      //   .max(45)
      //   .min(2, 'Le prenom doit avoir au moins 2 caracteres')
      //   .required('Le prenom est obligatoire'),
      // lastNameSpouseDTO: Yup
      //   .string()
      //   .max(45)
      //   .min(2, 'Il faut saisir au moins 2 caracteres')
      //   .required('Le nom est obligatoire'),
      // middleNameSpouseDTO: Yup
      //   .string()
      //   .max(45)
      //   .min(2, 'Il faut saisir au moins 2 caracteres'),
        // .required('Le postnom est obligatoire'),
      // genderSpouseDTO: Yup
      //     .string()
      //     .max(45)
      //     .min(2, 'Il faut saisir au moins 2 caracteres')
      //     .required('Le genre est obligatoire'),
      // birthDateSpouseDTO: Yup
      //     .date()
      //     .required('La date de naissance est obligatoire'),
      // birthCitySpouseDTO: Yup
      //     .string()
      //     .max(45)
      //     .min(2, 'Il faut saisir au moins 2 caracteres')
      //     .required('La ville de Naissance est obligatoire'),
      // countryOfBirthSpouseDTO: Yup
      //     .string()
      //     .max(45)
      //     .min(2, 'Il faut saisir au moins 2 caracteres')
      //     .required('Le pays de naissance est obligatoire'),
      numberOfChildren: Yup
        .number()
        .max(30)
        .min(0, 'La valeur minimale est 0'),
        // .required('Le nombre d\'enfant est obligatoire'),
      educationLevel: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        // .required('Le niveau scolaire est obligatoire')
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
      setDataEntrant((data) => ({ ...data, ...values }));
      console.log(dataEntrant)
      handleNext();
      // return null;
      // try {
      //   const objectData = JSON.stringify({
      //     firstName : values.firstName,
      //     middleName : values.middleName,
      //     lastName : values.lastName,
      //     phoneNumber: values.phoneNumber,
      //     emailAddress: values.emailAddress,
      //   });
      //   setIsSubmitingLoading(true);

      //   const response = await FetchingData('agent','POST', objectData );
      //   if(response.status === 200 || response.status === 201) {
      //     toast.success('Enregistrement effectue avec success');

      //     setTimeout(() => {
      //       setOpen(false);
      //       setIsSubmitingLoading(false);
      //       setIsLoadingData(true);
      //     }, 2000);        
      //   }else{
      //     toast.error('Une erreur s\'est produite, veuillez reéssayer plus tard');
      //     setIsSubmitingLoading(false);
      //   }
      // } catch (error) {
      //   toast.error('Une erreur s\'est produite, veuillez reéssayer plus tard');
      //   setIsSubmitingLoading(false);
      // }
    }
  });

  return (
    <div>
      <Stack spacing={1}>
        <Grid  
          container 
          spacing={2}
          component="form"
          sx={{
            flexGrow: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={formik.handleSubmit}  
          >
            <Grid  container 
              sx={{ marginTop: 0.5,}}
              spacing={2}>              
              <Grid item 
                  xs={6} 
                  sx={{ display: "flex", flexDirection: "column" ,gap: 1}}>                
                <TextField
                  error={!!(formik.touched.firstName && formik.errors.firstName)}
                  fullWidth
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  label="Prenom"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder='Prenom'
                  value={formik.values.firstName}
                />
                <TextField
                  error={!!(formik.touched.middleName && formik.errors.middleName)}
                  fullWidth
                  helperText={formik.touched.middleName && formik.errors.middleName}
                  label="Postnom"
                  name="middleName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder='Postnom'
                  value={formik.values.middleName}
                />
                <TextField
                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Nom de famille"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder='Nom'
                  value={formik.values.lastName}
                />
                <TextField
                  error={!!(formik.touched.emailAddress && formik.errors.emailAddress)}
                  fullWidth
                  helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                  label="Adresse mail"
                  name="emailAddress"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  placeholder='Votre mail'
                  value={formik.values.emailAddress}
                />
                <TextField
                  error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                  fullWidth
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  label="Numero de telephone"
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="tel"
                  placeholder='Votre numero de telephone'
                  value={formik.values.phoneNumber}
                />                
                <TextField
                  error={!!(formik.touched.countryOfBirth && formik.errors.countryOfBirth)}
                  fullWidth
                  helperText={formik.touched.countryOfBirth && formik.errors.countryOfBirth}
                  label="Pays de naissance"
                  name="countryOfBirth"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder='Nom'
                  value={formik.values.countryOfBirth}
                />
              </Grid>
              <Grid item 
                  xs={6} 
                  sx={{ display:"flex", flexDirection:"column", gap:1}}>                                    
                  <TextField
                    error={!!(formik.touched.birthCity && formik.errors.birthCity)}
                    fullWidth
                    helperText={formik.touched.birthCity && formik.errors.birthCity}
                    label="Ville de naissance"
                    name="birthCity"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder='Nom'
                    value={formik.values.birthCity}
                  />
                  <TextField
                    error={!!(formik.touched.birthDate && formik.errors.birthDate)}
                    fullWidth
                    helperText={formik.touched.birthDate && formik.errors.birthDate}
                    id="outlined-number"
                    label="Date de Naissance"
                    name="birthDate"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="Date"
                    value={formik.values.birthDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  
                  <TextField
                    error={!!(formik.touched.countryOfResidence && formik.errors.countryOfResidence)}
                    fullWidth
                    helperText={formik.touched.countryOfResidence && formik.errors.countryOfResidence}
                    label="Pays de residence"
                    name="countryOfResidence"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder='ex: RDC'
                    value={formik.values.countryOfResidence} 
                    
                  />  
                  <TextField
                      labelId="select-gender"
                      id="select-gender"
                      select
                      value={formik.values.gender}
                      onChange={formik.handleChange}                        
                      label="Genre"
                      name='gender'
                      InputLabelProps={{
                        shrink: true,
                      }}                    
                      required
                    >                        
                        <MenuItem  value={'male'}>
                            Homme
                        </MenuItem>
                        <MenuItem  value={'femele'}>
                            Femme
                        </MenuItem>
                  </TextField>
                <TextField
                    labelId="select-state_marital"
                    id="select-state_marital"
                    select
                    value={formik.values.maritalStatus}
                    onChange={formik.handleChange}                        
                    label="Statut Social"
                    name='maritalStatus'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  >                        
                      <MenuItem  value={'single'}>
                          Celibataire
                      </MenuItem>
                      <MenuItem  value={'married'}>
                          Marie(e)
                      </MenuItem>
                </TextField>
                {formik.values.maritalStatus === "married" &&          
                  <TextField
                    error={!!(formik.touched.numberOfChildren && formik.errors.numberOfChildren)}
                    fullWidth
                    helperText={formik.touched.numberOfChildren && formik.errors.numberOfChildren}
                    label="Nombre d'enfants"
                    name="numberOfChildren"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    min={0}
                    defaultValue={0}
                    placeholder="Nombre d'enfants"
                    value={formik.values.numberOfChildren}
                    sx={{ mt:1}}
                  />
                }
                {formik.values.maritalStatus !== "married" &&
                  <TextField
                  error={!!(formik.touched.educationLevel && formik.errors.educationLevel)}
                  fullWidth
                  helperText={formik.touched.educationLevel && formik.errors.educationLevel}
                  label="Titre Academique"
                  name="educationLevel"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder='BAC+5'
                  value={formik.values.educationLevel}
                />
                }  
              </Grid>
            </Grid>      
            <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf:"end",  pt: 2 }}>
                <Button type="submit" 
                sx={{ alignSelf:"flex-end"}} >
                  Suivant
                </Button>
            </Box>
        </Grid>
        <React.Fragment>
        </React.Fragment>
      </Stack>
    </div>
  );
};

export default EntrantForm;
