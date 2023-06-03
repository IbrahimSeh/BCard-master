import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SandBoxPage = () => {
  const [inputstate, setinputstate] = useState(null);
  useEffect(() => {
    axios
      .get("/users/getAllUsers")
      .then(({ data }) => {
        setinputstate(data);
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, []);

  if (!inputstate) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Typography variant="h5" color="initial">
        CRM SYSTEM
      </Typography>
      <Typography component="div">
        <Box fontWeight="fontWeightMedium" display="inline">
          name of user and his status :
        </Box>
      </Typography>
      <List>
        {inputstate.users.map((item) => (
          <ListItem disablePadding key={Math.random() + Date.now()}>
            <ListItemText primary={item.firstName + " " + item.biz} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default SandBoxPage;
// #### For Information about a user

// ```http
//   GET /api/users/userInfo
