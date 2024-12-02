import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../../services/orderApi";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrder(id);
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error}</div>;
  if (!order) return <div>找不到訂單</div>;

  return (
    <div className="detail-container">
      <h2>訂單詳情</h2>
      <div className="detail-content">
        <div className="detail-item">
          <label>訂單編號：</label>
          <span>{order.orderNumber}</span>
        </div>
        <div className="detail-item">
          <label>用戶ID：</label>
          <span>{order.userId}</span>
        </div>
        <div className="detail-item">
          <label>金額：</label>
          <span>{order.amount}</span>
        </div>
        <div className="detail-item">
          <label>創建時間：</label>
          <span>{new Date(order.createTime).toLocaleString()}</span>
        </div>
      </div>
      <div className="detail-actions">
        <button onClick={() => navigate(`/orders/${id}/edit`)}>編輯</button>
        <button onClick={() => navigate("/orders")}>返回</button>
      </div>
    </div>
  );
};

export default OrderDetail;
