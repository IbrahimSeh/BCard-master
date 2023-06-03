import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";

const GridItemComponent = ({ inputKey, inputValue, onChange }) => {
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

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    onChange(ev.target.id, ev.target.value);
  };

  const getType = (inputKey) => {
    switch (inputKey) {
      case "email":
        return "email";
      case "password":
        return "password";
      default:
        return "";
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
  return (
    <Fragment>
      <TextField
        autoComplete={"given-" + inputKey}
        name={inputKey}
        required={checkIfRequired(inputKey)}
        fullWidth
        type={getType(inputKey)}
        id={inputKey}
        label={inputKey}
        autoFocus
        value={
          inputState[inputKey] == ""
            ? inputValue + inputState[inputKey]
            : inputState[inputKey]
        }
        onChange={handleInputChange}
      />
    </Fragment>
  );
};

GridItemComponent.propTypes = {
  inputKey: PropTypes.string.isRequired,
  passDataFromChildToParent: PropTypes.func,
};

export default GridItemComponent;
//export default memo(GridItemComponent, (a, b) => true);
