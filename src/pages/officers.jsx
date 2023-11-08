import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import HashLoader from "react-spinners/HashLoader";
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [open, setOpen] = useState(false);
  const [isSubmitingLoading, setIsSubmitingLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      businessName: '',
      businessAddress: '',
      businessEmail: '',
      businessPhoneNumber: '',
      submit: null
    },
    validationSchema: Yup.object({
      businessEmail: Yup
        .string()
        .email('Veuillez saisir une adresse email valide')
        .max(255)
        .required('Le mail est obligatoire'),
      businessAddress: Yup
        .string()
        .max(255)
        .required('L\'adresse est obligatoire')
        .min(10, 'Il faut saisir au moins 10 caracteres'),
      businessPhoneNumber: Yup
        .string()
        .max(255)
        .required('Le numero de telephone est obligatoire'),
      businessName: Yup
        .string()
        .max(255)
        .min(5, 'Il faut saisir au moins 5 caracteres')
        .required('Le nom du cybercafe est obligatoire'),
    }),
    onSubmit: async (values, helpers) => {

      const objectData = JSON.stringify({
        businessName : values.businessName,
        businessAddress: values.businessAddress,
        businessPhoneNumber: values.businessPhoneNumber,
        businessEmail: values.businessEmail
      });
      setIsSubmitingLoading(true);
      const response = await FetchingData('dvBusinesses','POST', objectData );
      if(response.status === 200 || response.status === 201) {
        toast.success('Enregistrement effectue avec success');
        setTimeout(() => {
          setOpen(false);
          setIsSubmitingLoading(false);
          setNewData(response.data);
        }, 2500);        
      }else{
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
                  Officers
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
            <CustomersTable
              count={data.length}
              items={customers}
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
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.businessName && formik.errors.businessName)}
                    fullWidth
                    helperText={formik.touched.businessName && formik.errors.businessName}
                    label="Nom du Cybercafe"
                    name="businessName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder='Nom du Cybercafe'
                    value={formik.values.businessName}
                    sx={{ mt:1}}
                  />
                   <TextField
                    error={!!(formik.touched.businessEmail && formik.errors.businessEmail)}
                    fullWidth
                    helperText={formik.touched.businessEmail && formik.errors.businessEmail}
                    label="Adresse mail"
                    name="businessEmail"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    placeholder='Votre mail'
                    value={formik.values.businessEmail}
                  />
                   <TextField
                    error={!!(formik.touched.businessPhoneNumber && formik.errors.businessPhoneNumber)}
                    fullWidth
                    helperText={formik.touched.businessPhoneNumber && formik.errors.businessPhoneNumber}
                    label="Numero de telephone"
                    name="businessPhoneNumber"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="tel"
                    placeholder='Votre numero de telephone'
                    value={formik.values.businessPhoneNumber}
                  />
                  <TextField
                    error={!!(formik.touched.businessAddress && formik.errors.businessAddress)}
                    fullWidth
                    helperText={formik.touched.businessAddress && formik.errors.businessAddress}
                    label="Adresse"
                    name="businessAddress"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder='Votre adresse'
                    type="text"
                    value={formik.values.businessAddress}
                  />
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
                    // fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained">
                    Créer                  
                  </Button>
                  <Button 
                  // fullWidth
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
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
