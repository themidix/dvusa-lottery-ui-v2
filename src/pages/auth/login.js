import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import HashLoader from "react-spinners/HashLoader";
import HomeStore from "../../store/global.store";

const override = {
  display: "block",
  margin: "0 2rem",
  borderColor: "#ffffff",
};

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');

  const {
    isSubmitingLoading,
    setIsSubmitingLoading
  } = HomeStore();

  const formik = useFormik({
    initialValues: {
      email: 'monadresse@email.com',
      password: 'monadresse@password.com',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {

      const formData = new FormData();
      formData.append("username", values.email);
      formData.append("password", values.password); 
      
      setIsSubmitingLoading(true);
      
      await auth.signIn(values.email, values.password);
      router.push('/');
      
      setIsSubmitingLoading(false);
      
      // try {
      //     const response = await fetch("http://localhost:8080/login", {
      //       method: 'POST',
      //       body: formData,
      //     });
      //     if (response.ok) {             
      //       const data = await response.json();
      //       localStorage.setItem("token", data.accessToken);
      //       localStorage.setItem("name", data.refreshToken);          
      //       toast.success('Connecté avec succès');
      //       isSubmitingLoading(false);
      //       await auth.signIn(values.email, values.password);
      //       router.push('/');
      //     }else{
      //       toast.error("Nom d'utilisateur ou mot de passe incorrecte, veuillez réessayer");
      //       isSubmitingLoading(false);
      //     }
      // } catch (err) {
      //   isSubmitingLoading(false);
      //   helpers.setStatus({ success: false });
      //   helpers.setErrors({ submit: err.message });
      //   helpers.setSubmitting(false);
      // }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );

  return (
    <>
      <Head>
        <title>
          Connexion | DVUSA LOTTERY
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Connexion
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Vous n&apos;avez pas un compte ?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Enregistrez-vous
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Email"
                value="email"
              />
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
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
                      Connexion en cours
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
                :                
                <Button fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained">
                  Connexion                    
                </Button>
                }
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
