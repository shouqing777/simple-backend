import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../../services/userApi";
import { getOrdersByUserId } from "../../services/orderApi";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userData, ordersData] = await Promise.all([
          getUser(id),
          getOrdersByUserId(id),
        ]);
        setUser(userData);
        setOrders(ordersData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error}</div>;
  if (!user) return <div>找不到用戶</div>;

  return (
    <div className="detail-container">
      <h2>用戶詳情</h2>
      <div className="detail-content">
        <div className="detail-item">
          <label>用戶名：</label>
          <span>{user.username}</span>
        </div>
        <div className="detail-item">
          <label>郵箱：</label>
          <span>{user.email}</span>
        </div>
        <div className="detail-item">
          <label>電話：</label>
          <span>{user.phone}</span>
        </div>
        <div className="detail-item">
          <label>地址：</label>
          <span>{user.address}</span>
        </div>
      </div>

      <h3>用戶訂單</h3>
      {orders.length === 0 ? (
        <p>暫無訂單</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>金額</th>
              <th>創建時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.amount}</td>
                <td>{new Date(order.createTime).toLocaleString()}</td>
                <td>
                  <button onClick={() => navigate(`/orders/${order.id}`)}>
                    查看
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="detail-actions">
        <button onClick={() => navigate(`/users/${id}/edit`)}>編輯用戶</button>
        <button onClick={() => navigate("/users")}>返回</button>
      </div>
    </div>
  );
};

export default UserDetail;
