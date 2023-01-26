import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useGetMeMutation } from "../store/api/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../store/reducers/auth.reducer";
import { ListMovements } from "../components/ListMovements";

export const Movements = () => {
  const [getMe, { isError }] = useGetMeMutation();
  const dispatch = useDispatch();
  const selectorUser = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const exit = () => {
    navigate("/");
    dispatch(logOut());
  };

  useEffect(() => {
    if (!isLoading && !selectorUser?.id && !isError) {
      setIsLoading(true);
      getMe({});
    }
    if (selectorUser?.id) {
      setIsLoading(false);
    }
  }, [getMe, isLoading, selectorUser, isError]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="start"
      alignItems="center"
      spacing={1}
      sx={{ height: "100vh" }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Button
            sx={{ marginRight: "20px", border: "none" }}
            onClick={exit}
            variant="contained"
            startIcon={<ExitToAppIcon sx={{ transform: "rotate(180deg)" }} />}
          ></Button>
          <PersonIcon sx={{ marginRight: "40px" }} />
          <Typography variant="h6" noWrap component="div">
            {selectorUser?.email ?? ""}
          </Typography>
        </Toolbar>
      </AppBar>
      {selectorUser?.id && !isLoading ? <ListMovements /> : <></>}
    </Grid>
  );
};
