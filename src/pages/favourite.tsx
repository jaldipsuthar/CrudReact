import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Button, Typography } from "@mui/joy";
import { remove } from "../redux/slice/cardSlice";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useEffect, useState } from "react";
function Favourite() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.cart);


  const handleRemove = (productId: any) => {
    dispatch(remove(productId));
  };

  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      margin: "1rem",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    }}>
      {products.map((product: any ,index:number) => (
        <Card sx={{ minWidth: 275 }} key={index}>
          <Card
            sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}
            key={product.id}
          >
            <CardContent>
              <Typography level="body3">{product.name}</Typography>

              <Typography level="body2"></Typography>
            </CardContent>
 
              <Button
                variant="solid"
                color="danger"
                size="lg"
                onClick={() => handleRemove(product.id)}
              >
                <ThumbDownAltIcon/>
              </Button>

          </Card>
        </Card>
      ))}
    </div>
  );
}

export default Favourite;
