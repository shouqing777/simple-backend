# Simple Cloud Native Frontend

這是一個基於 React 的前端專案，用於展示簡單的雲原生應用。

## 專案結構

simple-frontend/
├── public/ # 靜態資源目錄
├── src/ # 源代碼目錄
│ ├── components/ # React 組件
│ │ ├── Common/ # 通用組件
│ │ ├── User/ # 用戶相關組件
│ │ └── Order/ # 訂單相關組件
│ ├── services/ # API 服務
│ ├── styles/ # CSS 樣式
│ ├── App.jsx # 主應用組件
│ └── index.jsx # 入口文件
└── README.md

## 功能模組

### 用戶管理

- 用戶列表顯示
- 用戶新增/編輯/刪除
- 用戶詳情查看
- 分頁功能

### 訂單管理

- 訂單列表顯示
- 訂單新增/編輯/刪除
- 訂單詳情查看
- 分頁功能

## 技術棧

- React 18
- React Router v6
- Axios
- CSS Modules

## API 接口

所有 API 請求通過 Gateway (8080) 轉發到對應的微服務：

- 用戶服務 (8081)
- 訂單服務 (8082)

### 用戶接口

- GET /api/users - 獲取用戶列表
- GET /api/users/{id} - 獲取用戶詳情
- POST /api/users - 創建用戶
- PUT /api/users/{id} - 更新用戶
- DELETE /api/users/{id} - 刪除用戶

### 訂單接口

- GET /api/orders - 獲取訂單列表
- GET /api/orders/{id} - 獲取訂單詳情
- POST /api/orders - 創建訂單
- PUT /api/orders/{id} - 更新訂單
- DELETE /api/orders/{id} - 刪除訂單

## 開始使用

1. 安裝依賴

bash
npm install

2. 運行開發服務器

bash
npm start

3. 構建生產版本

## 開發指南

### 添加新組件

1. 在 `src/components` 中創建新的組件目錄
2. 創建組件 JSX 文件
3. 在 `App.jsx` 中添加路由

### 添加新服務

1. 在 `src/services` 中創建新的服務文件
2. 配置 API 端點
3. 在組件中導入並使用

## 注意事項

- 確保後端服務已啟動
- 檢查 API Gateway 配置
- 注意跨域設置
