import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SandBoxPage = () => {
  const [inputstate] = useState({});
  useEffect(() => {
    axios
      .get("/users/getAllUsers")
      .then(({ data }) => {
        for (const key in JSON.parse(JSON.stringify(data))) {
          inputstate[key] = data[key];
        }
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, [inputstate]);

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
