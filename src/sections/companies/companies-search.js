import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import FetchingData from 'src/utils/fetch-data';
import CompanyStore from 'src/store/company.store';

export const CompaniesSearch = () => {
  const [value, setValue] = useState('')
  const {setCompanies} = CompanyStore();

  const handleClick = async() => {
    value.length == 0 ?
    undefined :
    console.log('');
    const response = await FetchingData(`dvBusinesses/findByEmail?email=${value}`,'GET');
    if(response.status === 200) {
      setCompanies(response.data);
    }

  }
  
  return (
  <Card sx={{ p: 2, display: "flex", gap:2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Rechercher un cybercafe"
      onChange={(e) => setValue(e.target.value)}
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
    <Button variant="contained" 
      disabled = {value.length == 0 ? 'disabled' : false}
      endIcon={<SendIcon />}
      onClick={handleClick}
      >
      Rechercher
    </Button>
    
  </Card>
  )
};
