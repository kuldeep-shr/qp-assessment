# 🛒 Grocery Design API 🥦🍎🍞

Welcome to the Grocery Design API! This API provides endpoints to manage grocery-related resources including products, categories, carts, and orders.

## 🚀 Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/kuldeep-shr/qp-assessment.git
   ```
2. run, &nbsp; `npm i` for Install dependencies
3. run,&nbsp; `npm run sample-data` to create the table with some sample data
4. run,&nbsp; `npm run dev ` for development environment
5. run,&nbsp; `npm run build` for build the typescript
6. run,&nbsp; `npm start` for starting the api endpoints
   <br />

---

## 🗂️ Folder Structure

- questionPro 📁
  - .dockerignore
  - .env
  - .gitignore
  - Dockerfile
  - README.md
  - global.d.ts
  - grocery_design.db
  - package-lock.json
  - package.json
  - src 📁
    - app.ts
    - booking 📁
      - controller 📁
        - bookingController.ts
      - model 📁
        - Booking.ts
      - service 📁
        - BookingService.ts
        - types.d.ts
    - database 📁
      - connection.ts
      - dummyData.json
      - sampleData.ts
    - inventory 📁
      - controller 📁
        - inventoryController.ts
      - model 📁
        - Inventory.ts
      - service 📁
        - InventoryService.ts
        - types.d.ts
    - middleware 📁
      - commonMiddlewares.ts
      - common_middleware.d.ts
    - products 📁
      - controller 📁
        - productController.ts
      - model 📁
        - Product.ts
      - service 📁
        - ProductService.ts
        - types.d.ts
    - routes 📁
      - routes.ts
    - users 📁
      - controller 📁
        - types.d.ts
        - userController.ts
      - model 📁
        - User.ts
      - services 📁
        - UserService.ts
        - types.d.ts
    - utils 📁
      - apiResponse.ts
      - operation.ts
      - types.d.ts
    - validation 📁
      - Booking.ts
      - Inventory.ts
      - Product.ts
      - User.ts
  - tsconfig.json

<br />

## 🐳 For Docker Quick Start

Install the docker, configure it and run according to your PORT.

 <br />

# 🔧 **Technologies Used** <br />

**TypeScript:** for compilation errors and for better environment. <br />
**Node.js:** JavaScript runtime for building the server-side application. <br />
**Express.js:** Web application framework for Node.js. <br />
**Sqlite:** RDBMS database for storing data. <br />
**Sequelize ORM**: SQL modeling tool for Node.js. <br />
**JWT:** JSON Web Tokens for user authentication and authorization.
**Docker:** For containerize the application for scaling

<br />

---

## For API Collection, Hit this Button👇 and fork it

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/30468072-86497d55-1638-4738-be20-2f16db59c9c8?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D30468072-86497d55-1638-4738-be20-2f16db59c9c8%26entityType%3Dcollection%26workspaceId%3Df23107e9-d20e-43ac-9da2-1d9a23d50e0f)
