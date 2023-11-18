import { useCallback, useMemo, useState, useEffect } from 'react';  
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Dialog, DialogContent, DialogTitle, TextField, Select,  FormControl, InputLabel, MenuItem } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import HashLoader from "react-spinners/HashLoader";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CompanyStore from 'src/store/company.store';
import FetchingData from 'src/utils/fetch-data';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { CirclesWithBar } from  'react-loader-spinner'
import AgentStore from 'src/store/agent.store';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika Visser',
    phone: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894'
  }
];

const override = {
  display: "block",
  margin: "0 2rem",
  borderColor: "#ffffff",
};

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const queryClient = new QueryClient();

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [open, setOpen] = useState(false);
  const [isSubmitingLoading, setIsSubmitingLoading] = useState(false);
  const [isLoadingBusinesse, setIsLoadingBusinesse] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const { companies, setCompanies } = CompanyStore();
  const { agents, setAgents } = AgentStore();
  
  useEffect(()=>{    
    setIsLoadingBusinesse(true);
    async function fetchData() {      
      const response = await FetchingData('dvBusinesses','GET');
      if(response.status === 200) {
        const { content, numberOfElements , totalPages, totalElements  } = await response.data;
        setCompanies(content);
        setIsLoadingBusinesse(false);
      }
    }
    fetchData();
  }, [setCompanies , setIsLoadingBusinesse]);

  useEffect(()=>{    
    setIsLoadingData(true);
    async function fetchData() {      
      const response = await FetchingData('agent','GET');
      if(response.status === 200) {
        // const { content, numberOfElements , totalPages, totalElements  } = await response.data;
        setAgents(response.data);
        setIsLoadingData(false);
      }
    }
    fetchData();
  }, []);

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

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>
          Officers | DV USA LOTTERY
        </title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">
                    Agents
                  </Typography>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <Button
                      color="inherit"
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <ArrowUpOnSquareIcon />
                        </SvgIcon>
                      )}
                    >
                      Import
                    </Button>
                    <Button
                      color="inherit"
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <ArrowDownOnSquareIcon />
                        </SvgIcon>
                      )}
                    >
                      Export
                    </Button>
                  </Stack>
                </Stack>
                <div>
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    onClick={handleClickOpen}
                  >
                    Ajouter un agent
                  </Button>
                </div>
              </Stack>
              <CustomersSearch />
              {isLoadingData ? 
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: 'center', mt:'4rem' }}>              
                  <CirclesWithBar
                  height="100"
                  width="100"
                  color="#483FD0"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  outerCircleColor=""
                  innerCircleColor=""
                  barColor=""
                  ariaLabel='circles-with-bar-loading'
                />
                </Box>
              :
              <CustomersTable
                count={agents?.length}
                items={agents}
                onDeselectAll={customersSelection.handleDeselectAll}
                onDeselectOne={customersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={customersSelection.handleSelectAll}
                onSelectOne={customersSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={customersSelection.selected}
              />
              }
            </Stack>
          </Container>

          <Dialog open={open}
          fullWidth={true} 
          maxWidth={'md'}
          onClose={handleClose} 
          >
            <DialogTitle sx={{ backgroundColor: '#1C2536', color:'white'}}>Créer un agent</DialogTitle>
            <DialogContent>
              <form
                  noValidate
                  onSubmit={formik.handleSubmit}                
                  aria-describedby="alert-dialog-slide-description"
                >
                  <Stack spacing={1}>
                    <TextField
                      error={!!(formik.touched.first_name && formik.errors.first_name)}
                      fullWidth
                      helperText={formik.touched.first_name && formik.errors.first_name}
                      label="Prenom"
                      name="first_name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      placeholder='Prenom'
                      value={formik.values.first_name}
                      sx={{ mt:1}}
                    />
                    <TextField
                      error={!!(formik.touched.middle_name && formik.errors.middle_name)}
                      fullWidth
                      helperText={formik.touched.middle_name && formik.errors.middle_name}
                      label="Prenom"
                      name="middle_name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      placeholder='Postnom'
                      value={formik.values.middle_name}
                      sx={{ mt:1}}
                    />
                    <TextField
                      error={!!(formik.touched.last_name && formik.errors.last_name)}
                      fullWidth
                      helperText={formik.touched.last_name && formik.errors.last_name}
                      label="Nom de famillle"
                      name="last_name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      placeholder='Nom'
                      value={formik.values.last_name}
                      sx={{ mt:1}}
                    />
                    <TextField
                      error={!!(formik.touched.agent_email && formik.errors.agent_email)}
                      fullWidth
                      helperText={formik.touched.agent_email && formik.errors.agent_email}
                      label="Adresse mail"
                      name="agent_email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      placeholder='Votre mail'
                      value={formik.values.agent_email}
                    />
                    <TextField
                      error={!!(formik.touched.agent_phone_number && formik.errors.agent_phone_number)}
                      fullWidth
                      helperText={formik.touched.agent_phone_number && formik.errors.agent_phone_number}
                      label="Numero de telephone"
                      name="agent_phone_number"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="tel"
                      placeholder='Votre numero de telephone'
                      value={formik.values.agent_phone_number}
                    />
                    <FormControl x={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="select-cybercafe">Cybercafe</InputLabel>
                      {isLoadingBusinesse ? " Chargement......"
                        :
                        <Select
                          labelId="select-cybercafe"
                          id="demo-simple-select-standard"
                          value={formik.values.dv_business_id}
                          onChange={formik.handleChange}                        
                          label="Cybercafe"
                          name='dv_business_id'
                        >                        
                          {companies?.map( (company, index) => {
                            return (
                              <MenuItem  value={company.dvBusinessId} 
                                key={index}>
                                {company.businessName}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      }
                    </FormControl>
                  </Stack>
                  {formik.errors.submit && (
                    <Typography
                      color="error"
                      sx={{ mt: 3 }}
                      variant="body2"
                    >
                      {formik.errors.submit}
                    </Typography>
                  )}
                  
                  {isSubmitingLoading ? 
                  <>
                    <Box
                    component="div"
                    variant="contained"
                    disabled={isSubmitingLoading}
                    sx={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', justifyContent: 'center', mt: 3  }}
                      >
                        <Button
                          fullWidth
                          // size="large"
                          variant="contained"                      
                          disabled={isSubmitingLoading}
                        >
                          Enregistrement en cours
                          <HashLoader
                            color="#fff"
                            loading={isSubmitingLoading}
                            cssOverride={override}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </Button>
                    </Box>                
                  </>
                  :  
                  <Box
                  component="div"
                  variant="contained"
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 3, gap: 2  }}
                    >          
                    <Button 
                      size="large"
                      sx={{ mt: 3 }}
                      type="submit"
                      variant="contained">
                      Créer                  
                    </Button>
                    <Button 
                      size="large"
                      sx={{ mt: 3 }}  
                      variant="contained" 
                      onClick={handleClose}>Annuler</Button>
                  </Box>    
                  }
                </form>
            </DialogContent>
          </Dialog>
        </Box>
      </QueryClientProvider>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
