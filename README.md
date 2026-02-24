# 🌍 Gaza Aid News API

Backend Web Application that automatically collects and provides the latest aid-related news in Gaza using **Web Scraping**, with a structured and secure RESTful API.

---

## 📌 Project Overview

This project:

- 🔎 Scrapes aid-related news from:
  https://www.motqdmon.com/search/label/المساعدات
- 📰 Extracts:
  - Title  
  - Link  
  - Publication date  
- 🗄 Stores data in MongoDB  
- 🚫 Prevents duplicate records  
- ⚡ Provides a powerful REST API for retrieving and interacting with news  

---

## 🚀 Features

- 🤖 Automatic Web Scraping  
- 🗄 MongoDB Storage  
- 🚫 Duplicate Prevention  
- 🔍 Arabic Text Search Support  
- ↕ Sorting (ASC / DESC)  
- 📄 Cursor-Based Pagination  
- ❤️ Independent Like System  
- ✅ Input Validation using Joi  
- 🛡 Rate Limiting  
- 📝 Structured Logging  
- ⚠ JSON Error Handling  

---

## 🛠 Technologies Used

- Node.js  
- Express.js  
- MongoDB  
- Joi  
- Nodemon  
- Web Scraping  

---

## 📁 Project Structure
```
Gaza_Aid_News/
│
├── controllers/
│ └── news.js
│
├── services/
│ └── new_service.js
│
├── models/
│ └── index.js
│
├── routes/
│ └── news.js
│
├── validators/
│ └── validation.js
│
├── middleware/
│ ├── logger.js
│ └── rateLimiter.js
│
├── index.js
├── package.json
└── README.md
```

### 📂 Folder Responsibilities

- **controllers/** → Handle requests & responses  
- **services/** → Business logic & processing  
- **models/** → Database operations  
- **routes/** → API route definitions  
- **validators/** → Joi validation schemas  
- **middleware/** → Logger & Rate Limiting  
- **index.js** → Application entry point  

---

# 🌐 API Documentation

## 🔗 Base URL : ``` http://localhost:5000/api/v1 ```

---

## 📰 Get News

### Endpoint
``` GET /news ```


### 🔎 Supported Query Parameters

| Parameter | Description |
|------------|-------------|
| search     | Search by news title (Arabic supported) |
| order      | asc / desc |
| sortBy     | date, title, likes_count, createdAt |
| limit      | Number of results |
| lastId     | Cursor for pagination |

---

### 📌 Example Requests

Get latest news:
`` GET /news ```


Search:

``` GET /news?search=المساعدات
```

Sort ascending:
```
GET /news?order=asc
```

Limit results:
```
GET /news?limit=5
```

Pagination:
```
GET /news?limit=5&lastId=6978ad38d9b195243f86bb5f
```

---

## ❤️ Add Like

### Endpoint

```
POST /news/:id/like
```

### Example

```
POST /news/6978ad38d9b195243f86bb5f/like
```

---

## 📦 Response Structure

```json
{
  "data": [
    {
      "_id": "6978ad38d9b195243f86bb5f",
      "title": "News Title",
      "link": "News Link",
      "date": "December 10, 2025",
      "likes_count": 0,
      "app_likes": 2,
      "total_likes": 2,
      "createdAt": "2026-01-27T12:19:04.467Z"
    }
  ],
  "nextCursor": "6978ad38d9b195243f86bb5f"
}

---

⚙ Installation & Running
1️⃣ Install Dependencies
``` npm install ```
2️⃣ Start Server
``` npm start ```
3️⃣ Test API
``` http://localhost:5000/api/v1/news ```
