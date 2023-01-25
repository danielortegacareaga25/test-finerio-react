import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import InfiniteScroll from "react-infinite-scroll-component";
import { selectMovements } from "../store/reducers/movements.reducer";
import { useSelector } from "react-redux";
import MoneyIcon from "@mui/icons-material/Money";
import MoneyRoundedIcon from "@mui/icons-material/MoneyRounded";
import { selectCurrentUser } from "../store/reducers/auth.reducer";
import { useGetMovementsMutation } from "../store/api/movements";
import { useEffect } from "react";

export const ListMovements = () => {
  const selectorMovement = useSelector(selectMovements);
  const selectorUser = useSelector(selectCurrentUser);

  const [getMovements, { isLoading }] = useGetMovementsMutation();

  useEffect(() => {
    getMovementsApi();
  }, []);

  const getMovementsApi = () => {
    if (selectorUser?.id && !isLoading && selectorMovement.moreItems) {
      getMovements({
        id: selectorUser.id,
        offSet: selectorMovement.offSet,
        max: selectorMovement.max,
      });
    }
  };

  return (
    <Grid
      item
      width={"100%"}
      sm={12}
      md={5}
      sx={{
        marginTop: "80px",
        padding: "10px 0px",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ marginLeft: "20px" }}>
        Movimientos
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <InfiniteScroll
          dataLength={selectorMovement.movements.length}
          next={getMovementsApi}
          hasMore={selectorMovement.moreItems}
          loader={<h4>Loading...</h4>}
        >
          {selectorMovement.movements.map((movement, idx) => (
            <ListItem key={idx} sx={{ padding: "20px" }}>
              <ListItemAvatar>
                <Avatar>
                  <MoneyRoundedIcon
                    color={movement.type === "CHARGE" ? "warning" : "success"}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={movement.description}
                secondary={`$${movement.amount}`}
              />
            </ListItem>
          ))}
        </InfiniteScroll>
      </List>
    </Grid>
  );
};
