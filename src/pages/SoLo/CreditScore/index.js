// SOLO version

/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// API call functions
// import getCreditScore from "api_calls/soloBackend"
// import getData from "api_calls/soloBackend"


// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";
import CircularProgress from '@mui/material/CircularProgress';

// Material Kit 2 React components
import MKBox from "components/MKBox";
import SoLoMKBox from "components/SoLoMKBox";
import MKTypography from "components/MKTypography";
// import MKInput from "components/MKInput";
// import MKButton from "components/MKButton";


// Material Kit 2 React example components
import DefaultNavbar from "examples/SoLoNavbars/DefaultNavbar";
// import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "soloRoutes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import { Typography } from "@mui/material";

function CreditScore() {
  // const [rememberMe, setRememberMe] = useState(false);
  // const [soloScore] = useState(8.6);
  const [output, setOutput] = useState({ 'score': 'n/a', 'amount': "n/a" });
  const [loading, setLoading] = useState(true);

  // API call to setSoloScore
  const baseLink = "https://solo100.herokuapp.com/score";
  const requestHeaders = new Headers();
  requestHeaders.append("Accept", "application/json");
  requestHeaders.append("Content-Type", "application/json");

  useEffect(async () => {
    // console.log('Data is being fetched')
    const listRequestOptions = {
      method: "GET",
      headers: requestHeaders,
    };
    const res = await fetch(
      `${baseLink}`,
      listRequestOptions
    );
    const data = await res.json();
    // console.log('\x1b[36m%s\x1b[0m', 'data:', '\n', data);
    setOutput(data)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  console.log(output)

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.soulloan.io",
          label: "Connect Wallet",
          color: "info",
        }}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <SoLoMKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="normal" color="white" mt={1}>
                  Your SoLo Score
                </MKTypography>

                {loading ?
                  <MKTypography variant="h3" fontWeight="medium" color="white" mt={1}>ヽ(ヅ)ノ</MKTypography>
                  :
                  <MKTypography variant="h3" fontWeight="medium" color="white" mt={1}>{output.score}</MKTypography>}

              </SoLoMKBox>
              <MKBox pt={4} pb={3} px={3} sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                {loading ? <CircularProgress color="turquoise" /> :
                  <>
                    <MKTypography>
                      You will be able to borrow up to
                    </MKTypography>
                    <MKTypography variant="h4" fontWeight='bold'>
                      £{output.amount}
                    </MKTypography>
                    <MKTypography>
                      with SoLo
                    </MKTypography>
                  </>
                }
                {/* <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput type="email" label="Email" fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="password" label="Password" fullWidth />
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth>
                      sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/sign-up/cover"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox> */}

              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      {/* <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox> */}
    </>
  );
}

export default CreditScore;
