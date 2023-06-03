import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import validateRegisterSchema from "../validation/signupValidation";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import GridItemComponent from "../components/Form/GridItemComponent";
import CRComponent from "../components/Form/CRComponent";
import SubmitComponent from "../components/Form/SubmitComponent";
import CheckboxComponent from "../components/Form/CheckboxComponent";

const SignUpPage = () => {
  const [inputstate] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
  });
  let checkBoxState = false;

  const [checked, setChecked] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [btnDisable, setbtnDisable] = useState(true);
  const navigate = useNavigate();
  let joiResponse;

  const handleBtnSubmitClick = async (ev) => {
    setChecked(checkBoxState);
    try {
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        console.log("return from joiResponse");
        return;
      }

      await axios.post("/users/register", {
        firstName: inputstate.firstName,
        middleName: inputstate.middleName,
        lastName: inputstate.lastName,
        phone: inputstate.phone,
        email: inputstate.email,
        password: inputstate.password,
        imageUrl: inputstate.imageUrl,
        imageAlt: inputstate.imageAlt,
        state: inputstate.state,
        country: inputstate.country,
        city: inputstate.city,
        street: inputstate.street,
        houseNumber: inputstate.houseNumber,
        zipCode: inputstate.zipCode,
        biz: checked,
      });
      toast.success("A new user has been created");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the user has been not created");
    }
  };

  const handleBtnCancelClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleBtnResetClick = () => {
    window.location.reload();
  };

  const updateState = (key, value) => {
    inputstate[key] = value;
    joiResponse = validateRegisterSchema(inputstate);
    if (!joiResponse) {
      setbtnDisable(false);
    }
  };
  const updatecheckBoxState = (value) => {
    checkBoxState = value;
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#945a61" }}>
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          REGISTER
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {Object.entries(inputstate).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={Math.random() + Date.now()}>
                <GridItemComponent
                  inputKey={key}
                  inputValue={value}
                  onChange={updateState}
                />
                {inputsErrorsState && inputsErrorsState[key] && (
                  <Alert severity="warning">
                    {inputsErrorsState[key].map((item) => (
                      <div key={`${key}-errors` + item}>
                        {item.includes("pattern:")
                          ? item.split("pattern:")[0] + "pattern"
                          : item}
                      </div>
                    ))}
                  </Alert>
                )}
              </Grid>
            ))}

            <CheckboxComponent
              passCheckBoxFromChildToParent={updatecheckBoxState}
            />
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>
          <SubmitComponent
            onClick={handleBtnSubmitClick}
            disablebtn={btnDisable}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="http://localhost:3000/login"
                variant="body2"
                underline="hover"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUpPage;
