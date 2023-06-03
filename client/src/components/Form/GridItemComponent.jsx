import { Alert, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import validateRegisterSchema from "../../validation/signupValidation";

const GridItemComponent = ({ inputKey, inputValue, onChange, onBlur }) => {
  console.log("GridItemComponent");
  const [inputState, setInputState] = useState({
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
    zip: "",
    title: "",
    subTitle: "",
    description: "",
    zipCode: "",
    web: "",
    url: "",
    alt: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  let joiResponse;
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    onChange(ev.target.id, ev.target.value);
  };

  const handelBlurChange = () => {
    joiResponse = validateRegisterSchema(inputState);
    setInputsErrorsState(joiResponse);

    console.log("joiResponse = ", joiResponse);
    if (!joiResponse) {
      onBlur(false);
    }
  };

  const getType = (inputKey) => {
    switch (inputKey) {
      case "email":
        return "email";
      case "password":
        return "password";
      default:
        return;
    }
  };

  const checkIfRequired = (inputKey) => {
    switch (inputKey) {
      case "imgUrl":
        return false;
      case "imgAlt":
        return false;
      case "imageUrl":
        return false;
      case "imageAlt":
        return false;
      case "middleName":
        return false;
      case "state":
        return false;
      case "zip":
        return false;
      case "zipCode":
        return false;
      case "web":
        return false;
      case "url":
        return false;
      case "alt":
        return false;
      default:
        return true;
    }
  };

  // const getValue = () => {
  //   if (inputState[inputKey] == "") {
  //     return inputValue;
  //   } else {
  //     return inputState[inputKey];
  //   }
  // };

  return (
    <Fragment>
      <TextField
        autoComplete={"given-" + inputKey}
        name={inputKey}
        required={checkIfRequired(inputKey)}
        fullWidth
        autoFocus={inputKey == "firstName" ? true : false}
        helperText=""
        type={getType(inputKey)}
        id={inputKey}
        label={inputKey}
        value={inputState[inputKey] == "" ? inputValue : inputState[inputKey]}
        onChange={handleInputChange}
        onBlur={handelBlurChange}
      />
      {inputsErrorsState && inputsErrorsState[inputKey] && (
        <Alert severity="warning">
          {inputsErrorsState[inputKey].map((item) => (
            <div key={`${inputKey}-errors` + item}>
              {item.includes("pattern:")
                ? item.split("pattern:")[0] + "pattern"
                : item}
            </div>
          ))}
        </Alert>
      )}
    </Fragment>
  );
};

GridItemComponent.propTypes = {
  inputKey: PropTypes.string.isRequired,
  passDataFromChildToParent: PropTypes.func,
};

export default GridItemComponent;
