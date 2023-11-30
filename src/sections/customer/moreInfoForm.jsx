
import React from 'react';
import { TextField, FormControl, Stack, InputLabel, Select, MenuItem, Typography, Box, Grid, 
  Accordion,
  AccordionDetails,
  AccordionSummary, 
} from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';


const EntrantMoreInfoForm = ({ formData, setFormData }) => {

  const [arrayChild, setArrayChild] = useState([0]);
  let arrayChildTemp = [];

  for (let index = 0; index < formData.values.numberOfChildren; index++) {
    arrayChildTemp.push(formData.values);
  };
  // useEffect(()=>{
  //   // if(formData.values.numberOfChildren < arrayChild.indexOf(-1)){
  //   //   setArrayChild(arrayChild.pop());
  //   // }else {
  //   //   for (let index = 0; index < formData.values.numberOfChildren; index++) {
  //   //     setArrayChild([...arrayChild, formData.values.numberOfChildren]);
  //   //   };
  //   // }
  //   // console.log(arrayChild);
  // }, [formData.values.numberOfChildren]);

  const ChildrenDTOComponent = (numberChild) =>{
   for (let index = 0; index < numberChild; index++) {
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
          <Typography>
            Contenu du panneau 1. Vous pouvez mettre ici tout le contenu que
            vous souhaitez afficher lorsque le panneau est déplié.
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
   }
  }

  return (
    <div>
      <Stack spacing={1}>
        <Grid  container 
          spacing={2}>
          <Grid item 
              xs={6}>                
            {formData.values.maritalStatus === "married" &&
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
              value={formData.values.educationLevel}              
            />
            } 
            {formData.values.maritalStatus === "married" && 
              <Box sx={{ mt: 1}}>
                <Typography variant='text'>
                  Les informations de {formData.values.gender === "male" ? "l'epouse" : "l'epoux"}  : 
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
                </Box>
              </Box>}
          </Grid>
          <Grid item 
              xs={6} 
              sx={{ display:"flex", flexDirection:"column", gap:1}}>
               {formData.values.numberOfChildren > 0 &&
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
                            error={!!(formData.touched.firstNameSpouseDTO && formData.errors.firstNameSpouseDTO)}
                            fullWidth
                            helperText={formData.touched.firstNameSpouseDTO && formData.errors.firstNameSpouseDTO}
                            label="Prenom"
                            name={`firstNameChild${index+1}`}
                            onBlur={formData.handleBlur}
                            onChange={formData.handleChange}
                            type="text"
                            placeholder='Prenom'
                            required
                            value={formData.values.firstNameSpouseDTO}
                          />
                          <TextField
                            error={!!(formData.touched.middleNameSpouseDTO && formData.errors.middleNameSpouseDTO)}
                            fullWidth
                            helperText={formData.touched.middleNameSpouseDTO && formData.errors.middleNameSpouseDTO}
                            label="Postnom"
                            name={`middleNameChild${index+1}`}
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
                            name={`lastNameChild${index+1}`}
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
                            error={!!(formData.touched.birthDateSpouseDTO && formData.errors.birthDateSpouseDTO)}
                            fullWidth
                            helperText={formData.touched.birthDateSpouseDTO && formData.errors.birthDateSpouseDTO}
                            id="outlined-number"
                            label="Date de Naissance"
                            name={`birthDateChild${index+1}`}
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
                            name={`birthCityChild${index+1}`}
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
                            name={`countryOfBirthChild${index+1}`}
                            onBlur={formData.handleBlur}
                            onChange={formData.handleChange}
                            type="text"
                            placeholder='ex: RDC'
                            value={formData.values.countryOfBirthSpouseDTO}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  )
                })
               }
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default EntrantMoreInfoForm;
