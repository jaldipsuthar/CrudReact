import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Button, CardOverflow, Typography, Modal, Box } from "@mui/joy"; // Import Modal component
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/slice/cardSlice";

import CloseIcon from "@mui/icons-material/Close";
import { IProduct } from "../models/home.model";
import PaginationComponent from "../components/pagination/pagination";
import ModelComponent from "../components/model/model";
import CardComponent from "../components/Card/Card";
// you can crete type or  interface in model
// type Product = {
//   index: number;
//   name: string;
// }
function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentItems, setCurrentItems] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [selectedSpell, setSelectedSpell] = useState<any>(null);
  const itemsPerPage = 50;
  const [isLoading, setIsLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState<IProduct[]>([]);

  const inputValue = useSelector((state: any) => state.input?.inputValue);
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://www.dnd5eapi.co/api/spells");
      setProducts(res.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredItems(currentItems);
  }, [currentItems]);

  const filterItems = () => {
    if (!inputValue) {
      setFilteredItems(currentItems);
    } else {
      const filtered = currentItems.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  // let timer:any ="";
  // useEffect(() => {
  //   if (timer) clearTimeout(timer);
  //   timer = setTimeout(() => {
  //     timer = null;
  //     filterItems();
  //   }, 1000);

  // }, [inputValue]);
  useEffect(() => {
    filterItems();
  }, [inputValue]);

  const fetchProductsName = async () => {
    try {
      if (selectedProduct) {
        const res = await axios.get(
          `https://www.dnd5eapi.co/api/spells/${selectedProduct.index}`
        );
        setSelectedSpell(res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductsName();
  }, [selectedProduct]);

  const handleAdd = (product: any) => {
    dispatch(add(product));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const list = products.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(list);
  }, [currentPage, products]);
  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (product: IProduct | null) => {
    setSelectedProduct(product);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ModalContent = () => {
    if (!selectedProduct) return null;

    return (
      <div className="modal_container">
        <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
          <CloseIcon
            onClick={() => setIsModalOpen(false)}
            style={{ cursor: "pointer" }}
          />
          <CardContent>
            <Typography level="body3">{selectedSpell?.name}</Typography>
            <Typography level="body3">{selectedSpell?.duration}</Typography>
            {/* <Typography level="body3">{selectedSpell?.higher_level}</Typography> */}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton count={10} />
      ) : (
        <>
          <CardComponent
            filteredItems={filteredItems}
            openModal={openModal}
            handleAdd={handleAdd}
          />

          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
          />
          <ModelComponent
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            ModalContent={ModalContent}
          />
        </>
      )}
    </div>
  );
}

export default Home;
