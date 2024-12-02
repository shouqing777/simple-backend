import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserList, deleteUser } from "../../services/userApi";
import Pagination from "../common/Pagination";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUserList();
      setUsers(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "獲取用戶列表失敗");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("確定要刪除此用戶嗎？")) {
      try {
        await deleteUser(userId);
        // 重新獲取用戶列表
        fetchUsers();
      } catch (err) {
        console.error("Delete Error:", err);
        alert("刪除失敗：" + err.message);
      }
    }
  };

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error}</div>;

  return (
    <div>
      <h2>用戶列表</h2>
      <div className="table-actions">
        <button onClick={() => navigate("/users/new")}>新增用戶</button>
      </div>
      {users.length === 0 ? (
        <p>暫無數據</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>用戶名</th>
              <th>郵箱</th>
              <th>電話</th>
              <th>地址</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(user.id)}
                  >
                    編輯
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
