# Subscription CRUD App

This is a React application for managing subscriptions. It allows admin to create, read, update, and delete subscriptions.

## Features

- **Create** new subscriptions with client details, start and end dates, and password.
- **View** a list of existing subscriptions with basic client information.
- **Edit** existing subscriptions (details, dates, password).
- **Delete** subscriptions.

## Getting Started

### Clone the repository:

```bash
git clone https://github.com/Cruz-Rider/subscription-crud-app.git
```

### Install dependencies:

```bash
npm install
```

### Run the development server:

```bash
npm start
```

This will start the development server for the frontend and open the application in your browser (usually at http://localhost:3000).

### Run the backend service:

```bash
cd server
npm start
```

## Usage

### Seed the Databse for Admin using adminSeeder:

```bash
cd server
npm run seed_admin
```

### Create a new subscription:

1. Visit the application in your browser.
2. Click on Admin (As of now only Admin Login is available)
3. Fill the Login credentials as:
     email: hello@wel.com
     pass: PaSsWoRd
4. Now you can Add new Client from the Client Master after filling all the details.

### View existing subscriptions:

- The application will display a list of existing subscriptions with basic client information.

### Edit a subscription:

1. Click the "Edit" button for the desired subscription.
2. Edit the details, dates, or password as needed.
3. Click the "Save Changes" button to update the subscription.

### Delete a subscription:

1. Click the "Delete" button for the desired subscription.
2. Confirm the deletion in the popup window.

## Technology Stack

- ReactJS
- Node.js (Express.js)
- MySQL
- Bootstrap

## License

This project is licensed under the MIT License (see LICENSE file for details).
