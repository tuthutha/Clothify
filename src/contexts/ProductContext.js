import React, { createContext, useState, useEffect } from 'react';
import { PATH } from '../constants/';
import { STATUS_CODE } from '../constants/status';
import _ from 'lodash';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${PATH.baseUrl}/${PATH.products}`);

        if (response.status === STATUS_CODE.success) {
          const data = await response.json();

          const productList = data.map((product) => {
            return {
              ...product,
              category: _.startCase(product.category),
            };
          });
          setProducts(productList);
        }
      } catch (error) {
        return error;
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <ProductContext.Provider value={{ products }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};

export default ProductProvider;
