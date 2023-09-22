import React from 'react'
import { IProduct } from '../../models/home.model'
import { Button, Card, CardContent, CardOverflow, Typography } from '@mui/joy'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
function CardComponent({filteredItems ,openModal,handleAdd}:any) {
  return (
    <div
    style={{
      display: "flex",
      gap: "1rem",
      margin: "1rem",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    }}
  >
          {filteredItems.map((product: IProduct, index: number) => (
              <Card sx={{ minWidth: 155 }} key={index}>
                <Card
                  sx={{ width: 150, maxWidth: "100%", boxShadow: "lg" }}
                  key={product.index}
                >
                  <CardContent>
                    <Typography level="body3">{product.name}</Typography>
                  </CardContent>
                  <CardOverflow>
                    <Button
                      aria-label="Like"
                      variant="outlined"
                      color="neutral"
                      onClick={() => handleAdd(product)}
                    >
                      {" "}
                      <ThumbUpIcon />
                    </Button>
                    <Button
                      aria-label="Like"
                      variant="outlined"
                      color="neutral"
                      onClick={() => openModal(product)}
                    >
                      View
                    </Button>
                  </CardOverflow>
                </Card>
              </Card>
            ))}
    </div>
  )
}

export default CardComponent
