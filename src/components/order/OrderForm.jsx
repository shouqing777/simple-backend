import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder, getOrder, updateOrder } from "../../services/orderApi";
import { getUserList } from "../../services/userApi";

const OrderForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    orderNumber: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 獲取用戶列表
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUserList();
        setUsers(response.data || []);
      } catch (err) {
        setError("獲取用戶列表失敗");
      }
    };
    fetchUsers();
  }, []);

  // 如果是編輯模式，獲取訂單詳情
  useEffect(() => {
    if (isEdit) {
      const fetchOrder = async () => {
        try {
          setLoading(true);
          const data = await getOrder(id);
          setFormData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    } else {
      // 新增模式：生成訂單編號
      setFormData((prev) => ({
        ...prev,
        orderNumber: `ORD${Date.now()}`,
      }));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEdit) {
        await updateOrder(id, formData);
      } else {
        await createOrder(formData);
      }
      navigate("/orders");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>載入中...</div>;

  return (
    <div className="form-container">
      <h2>{isEdit ? "編輯訂單" : "新增訂單"}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>訂單編號：</label>
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>選擇用戶：</label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          >
            <option value="">請選擇用戶</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>金額：</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {isEdit ? "更新" : "提交"}
          </button>
          <button type="button" onClick={() => navigate("/orders")}>
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
