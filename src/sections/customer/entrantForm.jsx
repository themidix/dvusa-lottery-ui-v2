
import React from 'react';
import { TextField, FormControl, Stack, InputLabel, Select, MenuItem, Typography, Box, Grid  } from '@mui/material';
import * as Yup from 'yup';

const EntrantForm = ({ formData, setFormData }) => {

  return (
    <div>
      <Stack spacing={1}>
        <Grid  container 
          spacing={2}>
          <Grid item 
              xs={6}>                
            <TextField
              error={!!(formData.touched.firstName && formData.errors.firstName)}
              fullWidth
              helperText={formData.touched.firstName && formData.errors.firstName}
              label="Prenom"
              name="firstName"
              onBlur={formData.handleBlur}
              onChange={formData.handleChange}
              type="text"
              placeholder='Prenom'
              value={formData.values.firstName}
              sx={{ mt:1}}
            />
            <TextField
              error={!!(formData.touched.middleName && formData.errors.middleName)}
              fullWidth
              helperText={formData.touched.middleName && formData.errors.middleName}
              label="Postnom"
              name="middleName"
              onBlur={formData.handleBlur}
              onChange={formData.handleChange}
              type="text"
              placeholder='Postnom'
              value={formData.values.middleName}
              sx={{ mt:1}}
            />
            <TextField
              error={!!(formData.touched.lastName && formData.errors.lastName)}
              fullWidth
              helperText={formData.touched.lastName && formData.errors.lastName}
              label="Nom de famille"
              name="lastName"
              onBlur={formData.handleBlur}
              onChange={formData.handleChange}
              type="text"
              placeholder='Nom'
              value={formData.values.lastName}
              sx={{ mt:1}}
            />
            <TextField
              error={!!(formData.touched.emailAddress && formData.errors.emailAddress)}
              fullWidth
              helperText={formData.touched.emailAddress && formData.errors.emailAddress}
              label="Adresse mail"
              name="emailAddress"
              onBlur={formData.handleBlur}
              onChange={formData.handleChange}
              type="email"
              placeholder='Votre mail'
              value={formData.values.emailAddress}
              sx={{ mt:1}}
            />
            <TextField
              error={!!(formData.touched.phoneNumber && formData.errors.phoneNumber)}
              fullWidth
              helperText={formData.touched.phoneNumber && formData.errors.phoneNumber}
              label="Numero de telephone"
              name="phoneNumber"
              onBlur={formData.handleBlur}
              onChange={formData.handleChange}
              type="tel"
              placeholder='Votre numero de telephone'
              value={formData.values.phoneNumber} 
              sx={{ mt:1}}
            />
          </Grid>
          <Grid item 
              xs={6} 
              sx={{ display:"flex", flexDirection:"column", gap:1}}>
              <TextField
                // error={!!(formData.touched.phoneNumber && formData.errors.phoneNumber)}
                fullWidth
                // helperText={formData.touched.phoneNumber && formData.errors.phoneNumber}
                id="outlined-number"
                label="Date de Naissance"
                name="birthDate"
                onBlur={formData.handleBlur}
                onChange={formData.handleChange}
                type="Date"
                value={formData.values.birthDate}
                sx={{ mt:1}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            <FormControl sx={{ width:'100%', }}>
              <InputLabel id="select-gender">Genre</InputLabel>
              <Select
                  labelId="select-gender"
                  id="select-gender"
                  value={formData.values.gender}
                  onChange={formData.handleChange}                        
                  label="Genre"
                  name='gender'
                >                        
                    <MenuItem  value={'MALE'}>
                        Homme
                    </MenuItem>
                    <MenuItem  value={'FEMELE'}>
                        Femme
                    </MenuItem>
              </Select>
            </FormControl>
            <TextField
              error={!!(formData.touched.countryOfResidence && formData.errors.countryOfResidence)}
              fullWidth
              helperText={formData.touched.countryOfResidence && formData.errors.countryOfResidence}
              label="Pays de residence"
              name="countryOfResidence"
              onBlur={formData.handleBlur}
              onChange={formData.handleChange}
              type="tel"
              placeholder='ex: RDC'
              value={formData.values.countryOfResidence} 
              
            />
            <TextField
              error={!!(formData.touched.educationLevel && formData.errors.educationLevel)}
              fullWidth
              helperText={formData.touched.educationLevel && formData.errors.educationLevel}
              label="Titre Academique"
              name="educationLevel"
              onBlur={formData.handleBlur}
              onChange={formData.handleChange}
              type="tel"
              placeholder='ex: RDC'
              value={formData.values.educationLevel} 
              
            />            
            <FormControl sx={{ width:'100%', }}>
              <InputLabel id="select-state_marital">Statut Social</InputLabel>
              <Select
                  labelId="select-state_marital"
                  id="select-state_marital"
                  value={formData.values.maritalStatus}
                  onChange={formData.handleChange}                        
                  label="Statut Social"
                  name='maritalStatus'
                >                        
                    <MenuItem  value={'celibataire'}>
                        Celibataire
                    </MenuItem>
                    <MenuItem  value={'couple'}>
                        Marie(e)
                    </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default EntrantForm;
