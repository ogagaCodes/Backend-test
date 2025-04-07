# Project Instructions

This document provides a comprehensive guide on how to run the project locally and using Docker.

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v16 or later)
- **Yarn** (latest version)
- **Docker** and **Docker Compose**

## Running the Project Locally

Follow these steps to run the project locally:

1. **Install Dependencies**  
   Navigate to the project root and install dependencies using Yarn:
   ```bash
   yarn install
   ```

2. **Configure Environment Variables**  
   Create a `.env` file in the project root with the following content:
   ```properties
   AWS_REGION=local-env
   AWS_ACCESS_KEY_ID=fakeMyKeyId
   AWS_SECRET_ACCESS_KEY=fakeSecretAccessKey
   DYNAMODB_ENDPOINT=http://localhost:8000
   IS_LOCAL=true
   ORDERS_TABLE=orders-dev
   PORT=3040
   ```

3. **Start the Application**  
   Run the application using Yarn:
   ```bash
   yarn run start
   ```
   The application will be available at `http://localhost:3040`.

4. **Verify the Application**  
   Use a browser or a tool like Postman to test the API endpoints.

## Running the Project with Docker

To run the project using Docker, follow these steps:

1. **Start Docker Compose**  
   From the project root, run:
   ```bash
   docker compose up --build
   ```
   This will:
   - Start a local DynamoDB instance on port `8000`.
   - Build and run the application container on port `3040`.

2. **Verify the Application**  
   Access the application at `http://localhost:3040`.  
   Check the logs to ensure everything is running correctly:
   ```bash
   docker compose logs -f
   ```

3. **Stop and Clean Up**  
   To stop and remove all containers, run:
   ```bash
   docker compose down
   ```

## Testing the Project

The project uses **Jest** for testing. Follow these steps to run tests:

1. **Run All Tests**  
   ```bash
   yarn test
   ```

2. **Run Tests in Watch Mode**  
   ```bash
   yarn test:watch
   ```

3. **Run Integration Tests**  
   If integration tests require Docker (e.g., a running DynamoDB container), ensure Docker is running and execute:
   ```bash
   yarn test:int
   ```

## Additional Notes

- **Environment Configuration**: Ensure your `.env` file is properly set up and excluded from version control.
- **Local vs. Cloud**: When running locally, the app uses a local DynamoDB instance with dummy AWS credentials. For production, configure real AWS credentials and set `IS_LOCAL=false`.
- **Domain-Driven Design (DDD)**: The project follows DDD principles with a clear separation of domain, application, infrastructure, and interface layers.

- **Api Documentation**: 
  https://documenter.getpostman.com/view/6034175/2sB2cVdgnC

For any issues, refer to the project documentation or contact the maintainer.
