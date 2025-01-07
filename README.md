# Triangle: Revolutionize Your Restaurant Experience

## Overview
Triangle is a comprehensive platform designed to streamline ordering and payments for restaurants through QR code menu systems. It provides a seamless and app-like experience for both customers and staff, enabling easy ordering, payment, and management of orders. Perfect for restaurants of all sizes, Triangle ensures an efficient and modern dining experience.
![image](https://github.com/user-attachments/assets/b5be17b2-c124-49fb-b0c8-43b880546329)
---

## Features

### Customer Features:
- **Online Ordering Pages:** App-like experience for browsing, ordering, and payment on mobile devices.
- **QR Code Menus:** Scan unique QR codes for tables, walk-up windows, parking spots, or other locations to access ordering pages.
- **Real-Time Updates:** Orders and payments are processed immediately, keeping customers informed.

### Staff & Management Features:
- **Order Management:** Orders are sent directly to POS and kitchen printers for quick processing.
- **Customizable QR Codes:** Each QR code is mapped to a specific location for easy order tracking.
- **Easy Setup:** Restaurants can create their online ordering pages effortlessly.

---

## Tech Stack

### Frontend
- **Framework:** Next.js
- **UI Components:** ShadCN (shadcn/ui)
- **Library:** React

### Backend
- **Framework:** Spring Boot
- **Language:** Java
- **Database:** Relational Database for robust order and user data storage

---

## Installation

### Prerequisites
- **Node.js:** Install the latest version for running Next.js.
- **Java JDK:** Ensure Java 11 or higher is installed for Spring Boot.
- **Database:** Set up a compatible relational database (e.g., PostgreSQL).

### Steps
#### Frontend
1. Clone the frontend repository:
   ```bash
   git clone <frontend-repo-url>
   ```
2. Navigate to the frontend directory and install dependencies:
   ```bash
   cd triangle-frontend
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### Backend
1. Clone the backend repository:
   ```bash
   git clone <backend-repo-url>
   ```
2. Navigate to the backend directory and build the project:
   ```bash
   cd triangle-backend
   ./mvnw clean install
   ```
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

4. Update the database configuration in the `application.properties` file.

---

## Usage

### Setting Up QR Codes
1. Create an account as a restaurant manager.
2. Use the admin dashboard to set up tables or ordering locations.
3. Generate and print unique QR codes for each location.

### Customer Ordering
1. Customers scan a QR code to access the ordering page.
2. Place orders and make payments directly through the app.

### Order Management
- Staff receives orders directly on their POS or kitchen printers.
- Manage and fulfill orders efficiently.

---

## Deployment

### Frontend
- Deploy the frontend using Vercel, Netlify, or a similar platform:
  ```bash
  npm run build
  npm run start
  ```

### Backend
- Deploy the backend on a server or cloud platform (e.g., AWS, Heroku):
  ```bash
  ./mvnw spring-boot:run
  ```

Ensure the frontend and backend endpoints are correctly configured for communication.

---

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/<feature-name>
   ```
3. Commit your changes and push to your fork.
4. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For inquiries or support, please contact [your email or contact method].




```bash 
cd "C:\Program Files\PostgreSQL\16\bin"
.\pg_ctl -D "C:\Program Files\PostgreSQL\16\data" start
```

