
## Database Design Document
[Google Drive Link](https://drive.google.com/drive/folders/16TOXhJAwr5uJLY-xD1pATAXVJUo9TfcM?usp=sharing)

### 1. Project Overview
- **Project Name**: Inventory Management System
- **Objective**: This document aims to describe the details of the database related to Products, Customers, Orders, Order Items, and Shipments information.
- **Stakeholders**: Pi R Square.
- **Database Type**: SQL

---

### 2. Data Structure Design

#### 2.1 Entities and Attributes
- ฟิลด์สำคัญในแต่ละตาราง

- **Entity 1: Products**
  - `id` (Primary Key, String): Unique product identifier
  - `name` (String, Required): Product Name
  - `description` (String, Optional): Detail description of the product
  - `price` (Decimal, Required): Price of the product
  - `category` (String, Required): Category of the product
  - `quantity_in_stock` (Integer, Required): Number of items available in stock

- **Entity 2: Customers**
  - `id` (Primary Key, Integer): Unique customer identifier
  - `name` (String, Required): Customer’s full name
  - `email` (Unique, String, Optional): Customer’s email address
  - `address` (String, Required): Customer’s address
  - `phone` (String, Required): Customer’s phone number

- **Entity 3: Orders**
  - `id` (Primary Key, Integer): Unique order identifier
  - `date` (DateTime, Required): The date and time the order was placed
  - `customer_id` (Foreign Key{Customers}, Integer, Required): References the customer who placed the order
  - `status` (ENUM: {Pending, Shipped, Delivered}, Required): Current status of the order

- **Entity 4: Order_Items**
  - `product_id` (Foreign Key{Products}, Required): References the product in the order
  - `order_id` (Foreign Key{Orders}, Required): References the related order
  - `quantity` (Integer, Required): Number of units ordered for the product

- **Entity 5: Shipments**
  - `id` (Primary Key, Integer): Unique shipment identifier
  - `order_id` (Foreign Key{Orders}, Required): References the related order
  - `date` (DateTime, Required): The date and time the shipment was made
  - `status` (Enum: {Processing, Shipped, Delivered}, Required): Current status of the shipment

#### 2.2 Relationships
- ความสัมพันธ์ระหว่างตารางต่างๆ
- **Customers** (One) -> **Orders** (Many)
- **Products** (One) -> **Order_Items** (Many)
- **Orders** (One) -> **Order_Items** (Many)
- **Orders** (One) -> **Shipments** (One)

#### 2.3 ER Diagram

[ER Diagram](https://drive.google.com/file/d/1ZDTWaH-l4xkamBg2O2NwInEEBR0Joi8v/view?usp=sharing)

- เหตุผลของการออกแบบ ER Diagram ดังรูป
1. พิจารณาจาก User Experience เป็นหลัก เช่น User ต้องการฟังก์ชันอะไรบ้าง?, ต้องการอะไรจาก User บ้าง(เป็นข้อมูลที่เราต้องการเพื่อนำไปวิเคราะห์ต่อ) เป็นต้น จึงประกอบไปด้วยตาราง Products, Customers, Orders, Order_Items และ Shipments
2. ในตารางต่างๆก็จะประกอบไปด้วยข้อมูลที่ต้องการจาก User หรือเพื่อเป็น User Experience
3. หลังจากนั้นก็จะพิจารณาความสัมพันธ์ระหว่างตารางต่างๆ โดยพิจารณาจากความหมายระหว่างตาราง เช่น ตารางระหว่าง Orders กับ Customers ลูกค้า 1 คน สามารถมีได้หลาย Order ขั้นต่ำ 1 Order และ 1 Order สามารถมีได้ 1 Customer ขั้นต่ำ 1 Customer
4. แต่จาก ER Diagram จะมี Relationship ที่มีความพิเศษอยู่หนึ่ง นั่นคือ ตารางระหว่าง Products กับ Order_Items ที่มีความสัมพันธ์แบบ Many to Many จำเป็นต้องมีตารางกลาง Order_Items เนื่องจาก ลดความซับซ้อนของข้อมูล, มีความยืดหยุ่นรองรับการปรับเปลี่ยนในอนาคต, ค้นหาข้อมูลสะดวก เป็นต้น โดยจะมีลักษณะดังนี้ 
Products(One) -> Order_Items(Many) และ Orders (One) -> Order_Items (Many)
5. สำหรับเหตุผลที่ Products กับ Order_Items ต้องมีความสัมพันธ์แบบ One to Many เนื่องจาก 1 Product สามารถมีได้หลาย Order_Item และ 1 Order_Items จะมีเพียง 1 Product. &&  สำหรับ Orders กับ Order_Items ต้องมีความสัมพันธ์แบบ One to Many เนื่องจาก 1 Order สามารถมีได้หลาย Order_Item และ 1 Order_Item จะมีเพียง 1 Order.

### 3. Table Details
- ตารางต่างๆ ที่ควรจะมีในฐานข้อมูล

#### Table: Products
| Field Name         | Data Type    |  Constraints        |  Description                        |
|--------------------|--------------|---------------------|-------------------------------------|
| `id`               | VARCHAR(255) | PRIMARY KEY         | Unique product identifier           |
| `name`             | VARCHAR(100) | NOT NULL            | Product Name                        |
| `description`      | TEXT         | NULL                | Detail description of the product   |
| `price`            | DECIMAL(10,2)| NOT NULL            | Price of the product                |
| `category`         | VARCHAR(100) | NOT NULL            | Category of product                 |
| `quantity_in_stock`| INTEGER      | NOT NULL            | Number of items available in stock  |
|--------------------|--------------|---------------------|-------------------------------------|

#### Table: Customers
| Field Name | Data Type     | Constraints         | Description                     |
|------------|---------------|---------------------|---------------------------------|
| `id`       | SERIAL        | PRIMARY KEY         | Unique customer identifier      |
| `name`     | VARCHAR(255)  | NOT NULL            | Customer’s full name            |
| `email`    | VARCHAR(255)  | UNIQUE              | Customer’s email address        |
| `address`  | TEXT          | NOT NULL            | Customer’s address              |
| `phone`    | VARCHAR(15)   | NOT NULL            | Customer’s phone number         |
|------------|---------------|---------------------|---------------------------------|


#### Table: Orders
| Field Name     | Data Type          | Constraints                             | Description                                  |
|----------------|--------------------|-----------------------------------------|----------------------------------------------|
| `id`           | SERIAL             | PRIMARY KEY                             | Unique order identifier                      |
| `date`         | TIMESTAMP          | NOT NULL                                | The date and time the order was placed       |
| `customer_id`  | INTEGER            | FOREIGN KEY(REF: Customers.id) NOT NULL | References the customer who placed the order |
| `status`       | ENUM("Pending",    | NOT NULL                                | Current status of the order                  |
|                | "Shipped", "Delivered")|                                     |                                              |
|----------------|--------------------|-----------------------------------------|----------------------------------------------|

#### Table: Order_Items
| Field Name  | Data Type     | Constraints                            | Description                             |
|-------------|---------------|----------------------------------------|-----------------------------------------|
| `product_id`| VARCHAR(255)  | FOREIGN KEY(REF: Products.id) NOT NULL | References the product in the order     |
| `order_id`  | INTEGER       | FOREIGN KEY(REF: Orders.id) NOT NULL   | References the related order            |
| `quantity`  | INTEGER       | NOT NULL                               | Number of units ordered for the product |
|-------------|---------------|----------------------------------------|-----------------------------------------|

#### Table: Shipments
| Field Name     | Data Type         | Constraints                          | Description                             |
|----------------|-------------------|--------------------------------------|-----------------------------------------|
| `id`           | SERIAL            | PRIMARY KEY                          | Unique shipment identifier              |
| `order_id`     | INTEGER           | FOREIGN KEY(REF: Orders.id) NOT NULL | References the related order            |
| `date`         | TIMESTAMP         | NOT NULL                             | The date and time the shipment was made |
| `status`       | ENUM("Processing",| NOT NULL                             | Current status of the shipment          |
|                | "Shipped", "Delivered")|                                 |                                         |
|----------------|-------------------|--------------------------------------|-----------------------------------------|

