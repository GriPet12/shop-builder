# NestJS Business Card Site Builder (with Auth)

This project is a backend service built with **NestJS** that allows **authenticated users** to create and manage their own single-page "business card" websites.

The primary goal of the service is to provide a platform where any user can quickly generate pages for their products or services, upload photos, and receive orders directly to their email.

## 🚀 Project Description

The service provides a secure API for creating, updating, and deleting "business card sites." Each user only has access to the sites they have created.

The service implements:
1.  **Authentication**: User registration and login using JWT (JSON Web Tokens).
2.  **Site Management**: Full CRUD for sites, linked to a specific user.
3.  **File Uploads**: Ability to upload photos for sites directly to the server.
4.  **Order Form**: A public form on each site that sends order details to the site owner's email (or a pre-configured email).

## ✨ Key Features

* **User Authentication**:
    * Registration (Email/Password).
    * Login and receiving an `access_token`.
* **Privacy**: All site management endpoints (`/sites`) are protected (require a JWT token). A user cannot see or edit another user's sites.
* **Business Card Site Creation**:
    * Title, Price, Description 1, Description 2.
    * Choice of one of three design templates.
* **Photo Uploads**: Uploading images (using `multipart/form-data`) when creating or updating a site.
* **Order Form**: Collection of minimal information (Name, Phone, Address, Quantity, Comment) and sending it via Email.

## 🛠 Tech Stack

* **Backend**: [NestJS](https://nestjs.com/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Authentication**: [Passport.js](https://www.passportjs.org/) (with `JwtStrategy` and `LocalStrategy`)
* **File Uploads**: [Multer](https://github.com/expressjs/multer) (for handling `multipart/form-data`)
* **Email**: [Nodemailer](https://nodemailer.com/) (or `@nestjs-modules/mailer`)
* **Database**: [MongoDB](https://www.mongodb.com/)
* **ODM**: [Mongoose](https://mongoosejs.com/) (via `@nestjs/mongoose`)

## 📦 Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the project root and fill in the required fields.

    ```.env
    # MongoDB Connection String
    # Example for local instance:
    MONGODB_URI=mongodb://localhost:27017/your_db_name
    # Example for Atlas:
    # MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/your_db_name?retryWrites=true&w=majority

    # Secret key for JWT
    JWT_SECRET=YOUR_VERY_STRONG_SECRET_KEY_HERE

    # Email (SMTP) settings
    EMAIL_HOST=smtp.example.com
    EMAIL_PORT=587
    EMAIL_USER=your-email@example.com
    EMAIL_PASS=your-email-password

    # Email to which orders will be sent (can be made dynamic)
    ORDER_RECIIPENT_EMAIL=admin@your-domain.com
    ```

4.  **Run the project in development mode:**
    ```bash
    npm run start:dev
    ```
    The server will be available at `http://localhost:3000`.

## 📖 API Endpoints

(🔒 = Requires `Bearer` authentication token)

### Authentication (`/auth`)

| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user (email, password). |
| `POST` | `/auth/login` | Log in a user, returns an `access_token`. |
| `GET` | `/auth/profile` | 🔒 Get the profile of the current user. |

### Site Management (`/sites`)

| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/sites` | 🔒 Create a new site. Data is sent as `multipart/form-data`. |
| `GET` | `/sites` | 🔒 Get a list of the user's **own** sites. |
| `GET` | `/sites/public/:id` | **(Public)** Get site data for client-side display. |
| `PATCH` | `/sites/:id` | 🔒 Update the user's **own** site (also `multipart/form-data`). |
| `DELETE` | `/sites/:id` | 🔒 Delete the user's **own** site. |

### Ordering (`/order`)

| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/order/:siteId` | **(Public)** Submit the order form for a specific site. |

---

### Example Request: Create Site (🔒 `POST /sites`)

This request must be sent as `multipart/form-data`, not `application/json`, as it includes files.

**Form Fields:**

* `title` (text): "Product Name"
* `price` (text): "1500 UAH"
* `description1` (text): "Main product description..."
* `description2` (text): "Additional text..."
* `designTemplate` (text): "template_1"
* `photos` (file): [File 1.jpg]
* `photos` (file): [File 2.jpg]

### Example Request: Place Order (Public `POST /order/:siteId`)

This request is sent as `application/json`.

```json
{
  "name": "Ivan Petrenko",
  "phone": "+380991234567",
  "address": "Kyiv, Khreshchatyk St, 1",
  "quantity": 2,
  "notes": "Please call before delivery."
}
