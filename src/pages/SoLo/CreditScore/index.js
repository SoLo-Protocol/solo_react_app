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
// import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

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
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKProgress from "components/MKProgress";


// Material Kit 2 React example components
import DefaultNavbar from "examples/SoLoNavbars/DefaultNavbar";
// import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "soloRoutes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import { Typography } from "@mui/material";


// ----------------absolutely worst practice---------------------


// ----------------absolutely worst practice---------------------


function CreditScore() {
  // const [rememberMe, setRememberMe] = useState(false);
  // const [soloScore] = useState(8.6);
  const [output, setOutput] = useState({ 'score': 'n/a', 'amount': "n/a" });
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [searchParams] = useSearchParams();
  const numTrialTxn = "1068"

  // API call to setSoloScore
  const baseLink = "https://solo100.herokuapp.com";
  // const localAddress = "http://127.0.0.1:5000"
  const requestHeaders = new Headers();
  requestHeaders.append("Accept", "application/json");
  requestHeaders.append("Content-Type", "application/json");



  const sendEmail = (em) => {
    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ email: em }),
    };
    fetch(`${baseLink}/emails`, requestOptions)
  }

  const handleChange = event => {
    setAddress(event.target.value);
    // console.log('value is:', event.target.value);
  };

  const handleEmail = (ad) => {
    console.log(ad)
    sendEmail(ad)
    setAddress("")
    setSubmittedEmail(true)
  }

  useEffect(async () => {
    // console.log('Data is being fetched')
    const listRequestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ id: searchParams.get("id") })
    };
    const res = await fetch(
      `${baseLink}/score`,
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
                  <>
                    <MKTypography pb={2} variant="h3" fontWeight="medium" color="white" mt={1}>{output.score}/1000</MKTypography>
                    <MKProgress value={output.score / 10} color='success' />
                  </>
                }

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
                    {searchParams.get("id") === numTrialTxn ?
                      <MKBox mt={2}>
                        <MKButton href="https://www.soulloan.tech/selectbank" variant="gradient" color="success" fullWidth>
                          Get your real score
                        </MKButton>
                      </MKBox>
                      : <></>}
                    <MKBox mt={4} component="form" role="form">
                      <MKBox mb={2}>
                        {submittedEmail ?
                          <MKInput type="email" label="Email" value="Thank you" disabled='true' fullWidth />

                          :
                          <MKInput type="email" label="Email" onChange={handleChange} fullWidth />
                        }
                      </MKBox>
                      <MKBox mt={0} mb={0}>
                        <MKButton onClick={() => handleEmail(address)} variant="gradient" color="info" fullWidth>
                          stay in the loop
                        </MKButton>
                      </MKBox>
                    </MKBox>
                  </>
                }
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


