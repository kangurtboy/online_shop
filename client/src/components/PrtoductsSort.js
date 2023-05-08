import React from "react";

const ProductsSort = ({ setSortOrder }) => {
    return (
        <div className="d-flex justify-content-between mt-3">
          <p>Сортировать:</p>
          <select
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ width: "70%", alignItems: "flex-start", height: 30 }}
            >
            <option value="">По умолчанию</option>
            <option value="less">По возрастанию цены</option>
            <option value="more">По убыванию цены</option>
          </select>
        </div>
    );
}

export default ProductsSort;