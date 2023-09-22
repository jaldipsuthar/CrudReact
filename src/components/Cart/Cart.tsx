import { Badge } from "@mui/joy";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";

function Cart() {
   
  const products = useSelector((state: any) => state.cart);
  const navigate = useNavigate();
  const openCart =() => {
    navigate("/favourite");
  }
  return (
    <div>
      <Badge badgeContent={products.length}>
        <StorefrontIcon onClick={openCart}/>
      </Badge>
    </div>
  );
}

export default Cart;
