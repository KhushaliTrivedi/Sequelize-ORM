# Sequelize ORM CRUD API

This project demonstrates a basic CRUD (Create, Read, Update, Delete) API using **Sequelize ORM** with **Express.js**. It uses Sequelize transactions for safe and atomic database operations and defines two primary models: `User` and `Post`.

---

## 📦 Features

- Sequelize ORM integration
- PostgreSQL or MySQL compatible
- User & Post model with UUID-based identification
- Full CRUD operations with transaction handling
- Associations between Users and Posts
- Express.js REST API

---

## 🚀 Getting Started

### 1. Clone the repository

\```bash
git clone https://github.com/KhushaliTrivedi/Sequelize-ORM.git
cd Sequelize-ORM
\```

## 🛠 Setup Instructions

### 2. Install dependencies

\```bash
npm install
\```

### 3. Setup `.env`

Create a `.env` file and configure your database:

\```ini
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=postgres # or mysql
\```

### 4. Run Migrations (if defined)

If you're using Sequelize CLI:

\```bash
npx sequelize-cli db:migrate
\```

Otherwise, make sure your `models/index.js` handles sync:

\```js
sequelize.sync({ alter: true });
\```

### 5. Start the server

\```bash
npm start
or
node app.js
\```

Server will run on: [http://localhost:5000](http://localhost:5000)

---

## 🧪 API Endpoints

### Users

| Method | Endpoint       | Description       |
|--------|----------------|-------------------|
| POST   | `/users`       | Create a user     |
| GET    | `/users`       | Get all users     |
| GET    | `/users/:uuid` | Get a single user |
| PUT    | `/users/:uuid` | Update a user     |
| DELETE | `/users/:uuid` | Delete a user     |

