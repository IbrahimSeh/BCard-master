import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import ROUTES from "../../routes/ROUTES";
import validateCardSchema from "../../validation/CreateCardValidation";
import SubmitComponent from "../Form/SubmitComponent";
import CRComponent from "../Form/CRComponent";
import GridItemComponent from "../Form/GridItemComponent";

const CreateCard = () => {
  const [inputState] = useState({
    title: "",
    subTitle: "",
    description: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
  });

  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  const [btnDisable, setbtnDisable] = useState(true);
  let joiResponse;

  const handleBtnSubmitClick = async (ev) => {
    try {
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        console.log("return from joiResponse");
        return;
      }

      await axios.post("/cards/", {
        title: inputState.title,
        subTitle: inputState.subTitle,
        description: inputState.description,
        state: inputState.state,
        country: inputState.country,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        email: inputState.email,
        zipCode: inputState.zipCode,
        phone: inputState.phone,
        web: inputState.web,
        url: inputState.url,
        alt: inputState.alt,
      });

      toast.success("A new card has been created");
      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error("the card has been not created");
    }
  };

  const handleBtnCancelClick = () => {
    navigate(ROUTES.MYCARDS);
  };

  const handleBtnResetClick = () => {
    window.location.reload();
  };

  const updateState = (key, value) => {
    inputState[key] = value;
    joiResponse = validateCardSchema(inputState);
    if (!joiResponse) {
      setbtnDisable(false);
    }
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
        <Typography component="h1" variant="h5">
          CREATE CARD
        </Typography>

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {Object.entries(inputState).map(([key, value]) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={Math.floor(Math.random() * 100) + Date.now()}
              >
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
            <CRComponent
              cancelBtn={handleBtnCancelClick}
              resetBtn={handleBtnResetClick}
            />
          </Grid>

          <SubmitComponent
            onClick={handleBtnSubmitClick}
            disablebtn={btnDisable}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCard;
