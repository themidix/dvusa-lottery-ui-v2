import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import {  useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import HashLoader from "react-spinners/HashLoader";
import FetchingData from 'src/utils/fetch-data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListCybercafe from 'src/components/list';
import { useEffect } from 'react';
import CompanyStore from 'src/store/company.store';
import { CirclesWithBar } from  'react-loader-spinner'

const companiesList = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    logo: '/assets/logos/logo-dropbox.png',
    title: 'Dropbox',
    downloads: '594'
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    logo: '/assets/logos/logo-medium.png',
    title: 'Medium Corporation',
    downloads: '625'
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2019',
    description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    logo: '/assets/logos/logo-slack.png',
    title: 'Slack',
    downloads: '857'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
    logo: '/assets/logos/logo-lyft.png',
    title: 'Lyft',
    downloads: '406'
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2019',
    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    logo: '/assets/logos/logo-github.png',
    title: 'GitHub',
    downloads: '835'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
    logo: '/assets/logos/logo-lyft.png',
    title: 'Lyft',
    downloads: '406'
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2019',
    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    logo: '/assets/logos/logo-github.png',
    title: 'GitHub',
    downloads: '835'
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    logo: '/assets/logos/logo-squarespace.png',
    title: 'Squarespace',
    downloads: '835'
  }
];

const override = {
  display: "block",
  margin: "0 2rem",
  borderColor: "#ffffff",
};


const Page = () => {
  const { companies , setCompanies } = CompanyStore();
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState(companies);
  const [companyCheck, setCompanyCheck] = useState('');
  const [dataLoading, setDataLoading] = useState(false);
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


  useEffect(()=>{    
    setDataLoading(true);
    async function fetchData() {      
      const response = await FetchingData('dvBusinesses','GET');
      if(response.status === 200) {
        const { content, numberOfElements , totalPages, totalElements  } = await response.data;
        setCompanies(response.data);
        setDataLoading(false);
      }
    }
    fetchData();
  }, [setCompanies, newData]);  

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
        Cybercafe | DV USA LOTTERY
      </title>
    </Head>    
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <ToastContainer />
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
                Cybercafe
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
                Ajouter un Cybercafe
              </Button>
            </div>
          </Stack>
          <CompaniesSearch InputChangeValue={(e)=>setCompanyCheck(e)}  />
          <Grid
            container
            spacing={3}
          >
            {dataLoading ? 
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
            <ListCybercafe />
            }
           
          </Grid>
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={3}
              size="small"
            />
          </Box> */}
        </Stack>
      </Container>
    </Box>
    
    <Dialog open={open} 
        onClose={handleClose}        
        fullWidth={true} 
        maxWidth={'md'}
        >
          <DialogTitle
           sx={{ backgroundColor: '#1C2536', color:'white'}}
          >Enregistrement d&apos;un nouvel Cybercafe</DialogTitle>
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
                        size="large"
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
                    size="large"
                    sx={{ mt: 3 }}  
                    variant="contained" 
                    onClick={handleClose}>Annuler</Button>
                </Box>    
                }
              </form>
          </DialogContent>
    </Dialog>
  </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
