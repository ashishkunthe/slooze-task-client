# 🍽️ Slooze Frontend — Food Ordering App

This is the frontend for the Slooze Take-Home Assignment, built using **React**, **Vite**, **TypeScript**, and **TailwindCSS**. It connects to the backend API and handles user authentication, role-based UI access, and the full food ordering flow.

---

## ⚙️ Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Axios (for API requests)
- JWT Auth via localStorage
- Role & Region-based UI rendering

---

## 🧪 Features

- Register/Login with roles: `admin`, `manager`, `member`
- Restaurant list fetched based on region
- Menu viewing and item selection per restaurant
- Quantity-based cart functionality
- Select payment method (Cash, Card, UPI)
- Place order with cart items
- Checkout, cancel, and update payment method (admin/manager only)
- Member-restricted access to orders page (Access Denied UI)
- Navigation support (Back buttons to restaurants)

---

## 🔐 Role-Based UI Access

| Role    | Can View Restaurants | Can View Menus | Can View Orders | Can Checkout/Cancel/Update Payment |
| ------- | -------------------- | -------------- | --------------- | ---------------------------------- |
| Admin   | ✅ Yes               | ✅ Yes         | ✅ Yes          | ✅ Yes                             |
| Manager | ✅ Yes               | ✅ Yes         | ✅ Yes (region) | ✅ Yes (region only)               |
| Member  | ✅ Yes               | ✅ Yes         | ❌ No           | ❌ No                              |

---

## 🧰 Setup & Run

```bash
git clone https://github.com/ashishkunthe/slooze-task-client.git
cd slooze-task-client
npm install
npm run dev
```

🌐 Environment Variable
Create a .env file in the root:
VITE_BACKEND_URL=http://localhost:5000/api

Folder Structure
src/
├── pages/
│ ├── Login.tsx
│ ├── Register.tsx
│ ├── Restaurants.tsx
│ ├── Menu.tsx
│ └── Orders.tsx
├── components/
│ └── ProtectedRoute.tsx
├── App.tsx
├── main.tsx
🔗 Backend Repository
You can find the backend code here:
👉 https://github.com/ashishkunthe/slooze-task-server

Author
Made with 💙 by Ashish Kunthe
