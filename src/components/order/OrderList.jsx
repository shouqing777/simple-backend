import React, { useState, useEffect } from "react";
import { getOrderList } from "../../services/orderApi";
import Pagination from "../common/Pagination";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrderList();
        console.log("API Response:", data); // 檢查 API 響應
        setOrders(data);
      } catch (err) {
        console.error("API Error:", err); // 檢查錯誤
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error}</div>;

  console.log("Current orders state:", orders); // 檢查當前狀態

  return (
    <div>
      <h2>訂單列表</h2>
      {!orders || orders.length === 0 ? (
        <div>暫無訂單數據</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>用戶ID</th>
              <th>金額</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.userId}</td>
                <td>{order.amount}</td>
                <td>
                  <button>編輯</button>
                  <button>刪除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
