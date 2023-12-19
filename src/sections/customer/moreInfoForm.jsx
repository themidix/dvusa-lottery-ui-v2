
import React from 'react';
import { TextField, FormControl, Stack, InputLabel, Select, MenuItem, Typography, Box, Grid, 
  Accordion,
  AccordionDetails,
  AccordionSummary, 
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';


const EntrantMoreInfoForm = ({ formData, dataEntrant, setDataEntrant, handleNext, handleBack }) => {

  const [arrayChild, setArrayChild] = useState([0]);
  let arrayChildTemp = [];

  for (let index = 0; index < dataEntrant.numberOfChildren; index++) {
    arrayChildTemp.push(formData.values);
  };

  const formik = useFormik({
    initialValues: {
      firstNameSpouseDTO:  dataEntrant.firstNameSpouseDTO ? dataEntrant.firstNameSpouseDTO : '',
      lastNameSpouseDTO:  dataEntrant.lastNameSpouseDTO ? dataEntrant.lastNameSpouseDTO : '',
      middleNameSpouseDTO:  dataEntrant.middleNameSpouseDTO ? dataEntrant.middleNameSpouseDTO : '',
      birthDateSpouseDTO:  dataEntrant.birthDateSpouseDTO ? dataEntrant.birthDateSpouseDTO : '',
      birthCitySpouseDTO:  dataEntrant.birthCitySpouseDTO ? dataEntrant.birthCitySpouseDTO : '',
      countryOfBirthSpouseDTO:  dataEntrant.countryOfBirthSpouseDTO ? dataEntrant.countryOfBirthSpouseDTO : '',
      eligibilityCountry:  dataEntrant.eligibilityCountry ? dataEntrant.eligibilityCountry : '',
      entrantPhotograph:  dataEntrant.entrantPhotograph ? dataEntrant.entrantPhotograph : '',
      photographSpouseDTO:  dataEntrant.photographSpouseDTO ? dataEntrant.photographSpouseDTO : '',
      educationLevel:  dataEntrant.educationLevel ? dataEntrant.educationLevel : '',
    },
    validationSchema: Yup.object({
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
      educationLevel: Yup
        .string()
        .max(45)
        .min(2, 'Il faut saisir au moins 2 caracteres')
        // .required('Le niveau scolaire est obligatoire')
    }),
    onSubmit: async (values, helpers) => {
      setDataEntrant((data) => ({ ...data, ...values }));
      handleNext();
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
            spacing={2}>
            <Grid item 
                xs={6}>
              <FormControl variant="standard" 
                            fullWidth>
                <InputLabel htmlFor="entrantPhotograph" 
                            sx={{  paddingLeft:2 }}>Photo du candidat</InputLabel>
                <TextField
                sx={{marginBottom:2,  marginTop: "4%" }}
                  error={!!(formData.touched.entrantPhotograph && formData.errors.entrantPhotograph)}
                  fullWidth
                  helperText={formData.touched.entrantPhotograph && formData.errors.entrantPhotograph}
                  // label="Photo du candidat"
                  name="entrantPhotograph"
                  onBlur={formData.handleBlur}
                  onChange={formData.handleChange}
                  type="file"
                  value={formData.values.entrantPhotograph}              
                />   
              </FormControl>             
              {dataEntrant.maritalStatus === "married" &&
                <TextField
                error={!!(formData.touched.educationLevel && formData.errors.educationLevel)}
                fullWidth
                helperText={formData.touched.educationLevel && formData.errors.educationLevel}
                label="Titre Academique"
                name="educationLevel"
                onBlur={formData.handleBlur}
                onChange={formData.handleChange}
                type="text"
                placeholder='BAC+5'
                value={dataEntrant.educationLevel}              
              />
              } 
              {dataEntrant.maritalStatus === "married" && 
                <Box sx={{ mt: 1}}>
                  <Typography variant='text'>
                    Les informations de {dataEntrant.gender === "male" ? "l'epouse" : "l'epoux"}  : 
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" ,gap: 1}}>
                    <TextField
                      error={!!(formData.touched.firstNameSpouseDTO && formData.errors.firstNameSpouseDTO)}
                      fullWidth
                      helperText={formData.touched.firstNameSpouseDTO && formData.errors.firstNameSpouseDTO}
                      label="Prenom"
                      name="firstNameSpouseDTO"
                      onBlur={formData.handleBlur}
                      onChange={formData.handleChange}
                      type="text"
                      placeholder='Prenom'
                      value={formData.values.firstNameSpouseDTO}
                    />
                    <TextField
                      error={!!(formData.touched.middleNameSpouseDTO && formData.errors.middleNameSpouseDTO)}
                      fullWidth
                      helperText={formData.touched.middleNameSpouseDTO && formData.errors.middleNameSpouseDTO}
                      label="Postnom"
                      name="middleNameSpouseDTO"
                      onBlur={formData.handleBlur}
                      onChange={formData.handleChange}
                      type="text"
                      placeholder='Postnom'
                      value={formData.values.middleNameSpouseDTO}
                    />
                    <TextField
                      error={!!(formData.touched.lastNameSpouseDTO && formData.errors.lastNameSpouseDTO)}
                      fullWidth
                      helperText={formData.touched.lastNameSpouseDTO && formData.errors.lastNameSpouseDTO}
                      label="Nom"
                      name="lastNameSpouseDTO"
                      onBlur={formData.handleBlur}
                      onChange={formData.handleChange}
                      type="text"
                      placeholder='Nom'
                      value={formData.values.lastNameSpouseDTO}
                    />
                    <TextField
                        labelId="select-gender"
                        id="select-gender"
                        select
                        value={formData.values.genderSpouseDTO}
                        onChange={formData.handleChange}                        
                        label="Genre"
                        name='genderSpouseDTO'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ width: "100%"}}
                      >                        
                          <MenuItem  value={'MALE'}>
                              Homme
                          </MenuItem>
                          <MenuItem  value={'FEMELE'}>
                              Femme
                          </MenuItem>
                    </TextField>
                    <TextField
                      error={!!(formData.touched.birthDateSpouseDTO && formData.errors.birthDateSpouseDTO)}
                      fullWidth
                      helperText={formData.touched.birthDateSpouseDTO && formData.errors.birthDateSpouseDTO}
                      id="outlined-number"
                      label="Date de Naissance"
                      name="birthDateSpouseDTO"
                      onBlur={formData.handleBlur}
                      onChange={formData.handleChange}
                      type="Date"
                      value={formData.values.birthDateSpouseDTO}
                      sx={{ mt:1}}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      error={!!(formData.touched.birthCitySpouseDTO && formData.errors.birthCitySpouseDTO)}
                      fullWidth
                      helperText={formData.touched.birthCitySpouseDTO && formData.errors.birthCitySpouseDTO}
                      label="Ville de naissance"
                      name="birthCitySpouseDTO"
                      onBlur={formData.handleBlur}
                      onChange={formData.handleChange}
                      type="text"
                      placeholder='ex: RDC'
                      value={formData.values.birthCitySpouseDTO}
                    />
                    <TextField
                      error={!!(formData.touched.countryOfBirthSpouseDTO && formData.errors.countryOfBirthSpouseDTO)}
                      fullWidth
                      helperText={formData.touched.countryOfBirthSpouseDTO && formData.errors.countryOfBirthSpouseDTO}
                      label="Pays de naissance"
                      name="countryOfBirthSpouseDTO"
                      onBlur={formData.handleBlur}
                      onChange={formData.handleChange}
                      type="text"
                      placeholder='ex: RDC'
                      value={formData.values.countryOfBirthSpouseDTO}
                    />
                    <FormControl variant="standard" 
                                  fullWidth>
                      <InputLabel htmlFor="photographSpouseDTO" 
                                  sx={{  paddingLeft:2 }}>Photo de {dataEntrant.gender === "male" ? "l'epouse" : "l'epoux"}</InputLabel>
                      <TextField
                      sx={{marginBottom:2,  marginTop: "4%" }}
                        error={!!(formData.touched.photographSpouseDTO && formData.errors.photographSpouseDTO)}
                        fullWidth
                        helperText={formData.touched.photographSpouseDTO && formData.errors.photographSpouseDTO}
                        name="photographSpouseDTO"
                        onBlur={formData.handleBlur}
                        onChange={formData.handleChange}
                        type="file"
                        value={formData.values.photographSpouseDTO}              
                      />   
                    </FormControl> 
                  </Box>
                </Box>}
            </Grid>
            <Grid item 
                xs={6} 
                sx={{ display:"flex", flexDirection:"column", gap:1}}>
                {dataEntrant.numberOfChildren > 0 &&
                  arrayChildTemp.map((child, index)=>{
                    return(
                      <Accordion key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Enfant {index+1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>                       
                          <Box sx={{ display: "flex", flexDirection: "column" ,gap: 1}}>
                            <TextField
                              // error={!!(formData.touched.firstNameSpouseDTO && formData.errors.firstNameSpouseDTO)}
                              fullWidth
                              // helperText={formData.touched.firstNameSpouseDTO && formData.errors.firstNameSpouseDTO}
                              label="Prenom"
                              name={`firstNameChild${index+1}`}
                              onBlur={formData.handleBlur}
                              onChange={formData.handleChange}
                              type="text"
                              placeholder='Prenom'
                              required
                              // value={formData.values.firstNameSpouseDTO}
                            />
                            <TextField
                              // error={!!(formData.touched.middleNameSpouseDTO && formData.errors.middleNameSpouseDTO)}
                              fullWidth
                              // helperText={formData.touched.middleNameSpouseDTO && formData.errors.middleNameSpouseDTO}
                              label="Postnom"
                              name={`middleNameChild${index+1}`}
                              onBlur={formData.handleBlur}
                              onChange={formData.handleChange}
                              type="text"
                              placeholder='Postnom'
                              // value={formData.values.middleNameSpouseDTO}
                            />
                            <TextField
                              // error={!!(formData.touched.lastNameSpouseDTO && formData.errors.lastNameSpouseDTO)}
                              fullWidth
                              // helperText={formData.touched.lastNameSpouseDTO && formData.errors.lastNameSpouseDTO}
                              label="Nom"
                              name={`lastNameChild${index+1}`}
                              onBlur={formData.handleBlur}
                              onChange={formData.handleChange}
                              type="text"
                              placeholder='Nom'
                              // value={formData.values.lastNameSpouseDTO}
                            />
                            <TextField
                                labelId="select-gender"
                                id="select-gender"
                                select
                                // value={formData.values.genderSpouseDTO}
                                onChange={formData.handleChange}                        
                                label="Genre"
                                name={`genderChild${index+1}`}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                sx={{ width: "100%"}}
                              >                        
                                  <MenuItem  value={'MALE'}>
                                      Homme
                                  </MenuItem>
                                  <MenuItem  value={'FEMELE'}>
                                      Femme
                                  </MenuItem>
                            </TextField>
                            <TextField
                              // error={!!(formData.touched.birthDateSpouseDTO && formData.errors.birthDateSpouseDTO)}
                              fullWidth
                              // helperText={formData.touched.birthDateSpouseDTO && formData.errors.birthDateSpouseDTO}
                              id="outlined-number"
                              label="Date de Naissance"
                              name={`birthDateChild${index+1}`}
                              onBlur={formData.handleBlur}
                              onChange={formData.handleChange}
                              type="Date"
                              // value={formData.values.birthDateSpouseDTO}
                              sx={{ mt:1}}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              // error={!!(formData.touched.birthCitySpouseDTO && formData.errors.birthCitySpouseDTO)}
                              fullWidth
                              // helperText={formData.touched.birthCitySpouseDTO && formData.errors.birthCitySpouseDTO}
                              label="Ville de naissance"
                              name={`birthCityChild${index+1}`}
                              onBlur={formData.handleBlur}
                              onChange={formData.handleChange}
                              type="text"
                              placeholder='ex: RDC'
                              // value={formData.values.birthCitySpouseDTO}
                            />
                            <TextField
                              // error={!!(formData.touched.countryOfBirthSpouseDTO && formData.errors.countryOfBirthSpouseDTO)}
                              fullWidth
                              // helperText={formData.touched.countryOfBirthSpouseDTO && formData.errors.countryOfBirthSpouseDTO}
                              label="Pays de naissance"
                              name={`countryOfBirthChild${index+1}`}
                              onBlur={formData.handleBlur}
                              onChange={formData.handleChange}
                              type="text"
                              placeholder='ex: RDC'
                              // value={formData.values.countryOfBirthSpouseDTO}
                            />
                            <FormControl variant="standard" 
                                          fullWidth>
                              <InputLabel htmlFor={`photographChild${index+1}`} 
                                          sx={{  paddingLeft:2 }}>Photo de l&apos;enfant {`${index+1}`}</InputLabel>
                              <TextField
                              sx={{marginBottom:2,  marginTop: "4%" }}
                                // error={!!(formData.touched.photographSpouseDTO && formData.errors.photographSpouseDTO)}
                                fullWidth
                                // helperText={formData.touched.photographSpouseDTO && formData.errors.photographSpouseDTO}
                                name={`photographChild${index+1}`}
                                onBlur={formData.handleBlur}
                                onChange={formData.handleChange}
                                type="file"
                                // value={formData.values.photographSpouseDTO}              
                              />   
                            </FormControl> 
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    )
                  })
                }
            </Grid>            
          </Grid>
          <Grid
            container
            justifyContent="space-evenly"
            alignSelf="end"
            alignItems="center"
            sx={{ width: "35%" }}
          >
            <Grid item 
            xs={2} 
            mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleBack();
                }}
              >
                Précedent
              </Button>
            </Grid>
            <Grid item 
            xs={2} 
            mt={2}>
              <Button type="submit" 
              variant="contained" 
              color="primary">
                Suivant
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default EntrantMoreInfoForm;
