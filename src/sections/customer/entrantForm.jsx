
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
              xs={6} 
              sx={{ display: "flex", flexDirection: "column" ,gap: 1}}>                
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
            />
          </Grid>
          <Grid item 
              xs={6} 
              sx={{ display:"flex", flexDirection:"column", gap:1}}>
              <TextField
                error={!!(formData.touched.birthDate && formData.errors.birthDate)}
                fullWidth
                helperText={formData.touched.birthDate && formData.errors.birthDate}
                id="outlined-number"
                label="Date de Naissance"
                name="birthDate"
                onBlur={formData.handleBlur}
                onChange={formData.handleChange}
                type="Date"
                value={formData.values.birthDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              
            <TextField
                labelId="select-gender"
                id="select-gender"
                select
                value={formData.values.gender}
                onChange={formData.handleChange}                        
                label="Genre"
                name='gender'
                InputLabelProps={{
                  shrink: true,
                }}
              >                        
                  <MenuItem  value={'male'}>
                      Homme
                  </MenuItem>
                  <MenuItem  value={'femele'}>
                      Femme
                  </MenuItem>
            </TextField>
            <TextField
              error={!!(formData.touched.countryOfResidence && formData.errors.countryOfResidence)}
              fullWidth
              helperText={formData.touched.countryOfResidence && formData.errors.countryOfResidence}
              label="Pays de residence"
              name="countryOfResidence"
              onBlur={formData.handleBlur}
              onChange={formData.handleChange}
              type="text"
              placeholder='ex: RDC'
              value={formData.values.countryOfResidence} 
              
            />
            <TextField
                labelId="select-state_marital"
                id="select-state_marital"
                select
                value={formData.values.maritalStatus}
                onChange={formData.handleChange}                        
                label="Statut Social"
                name='maritalStatus'
                InputLabelProps={{
                  shrink: true,
                }}
              >                        
                  <MenuItem  value={'single'}>
                      Celibataire
                  </MenuItem>
                  <MenuItem  value={'married'}>
                      Marie(e)
                  </MenuItem>
            </TextField>
            {formData.values.maritalStatus === "married" &&          
              <TextField
                error={!!(formData.touched.numberOfChildren && formData.errors.numberOfChildren)}
                fullWidth
                helperText={formData.touched.numberOfChildren && formData.errors.numberOfChildren}
                label="Nombre d'enfants"
                name="numberOfChildren"
                onBlur={formData.handleBlur}
                onChange={formData.handleChange}
                type="number"
                min={0}
                defaultValue={0}
                placeholder="Nombre d'enfants"
                value={formData.values.numberOfChildren}
                sx={{ mt:1}}
              />
            }
            {formData.values.maritalStatus !== "married" &&
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
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default EntrantForm;
