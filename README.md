# firebase-nextjs-docker

## Description
**firebase-nextjs-docker** is a web application built using Next.js and Firebase, designed to provide a seamless and interactive user experience. This project leverages the power of server-side rendering and static site generation offered by Next.js, combined with Firebase's robust backend services for authentication, real-time database, and cloud storage.

Key features include:
- **Firebase Authentication**: Secure user authentication using various providers, including Google.
- **Firestore Database Integration**: Efficient data storage and retrieval with Firestore, enabling real-time updates.
- **Responsive Design**: A modern and responsive user interface built with Tailwind CSS, ensuring a great experience on both desktop and mobile devices.
- **Dockerized Application**: Easily deployable using Docker, allowing for consistent environments across development and production.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Darshan2605/firebase-nextjs-docker.git
   cd firebase-nextjs-docker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration.

## Usage
To run the application in development mode:
```bash
npm run dev
```

To build the application for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Environment Variables
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Features
- Firebase authentication
- Firestore database integration
- Responsive design with Tailwind CSS





## Dockerizing the Application

**Replace env variables in firebaseConfig.ts file with actual values**:
   

To Dockerize the application, follow these steps:

1. **Build the Docker Image**:
   Navigate to the root directory of the project and run the following command:
   ```bash
   docker build -t firebase-nextjs-docker .
   ```

2. **Run the Docker Container**:
   After building the image, you can run the container with the following command:
   ```bash
   docker run -p 3000:3000 firebase-nextjs-docker
   ```

3. **Stopping the Container**:
   To stop a running container, first list all containers:
   ```bash
   docker ps -a
   ```
   Then stop the container using its ID or name:
   ```bash
   docker stop <container_id_or_name>
   ```

4. **Removing the Container**:
   If you need to remove a stopped container, use:
   ```bash
   docker rm <container_id_or_name>
   ```

5. **Removing the Image**:
   To remove the Docker image, use:
   ```bash
   docker rmi <image_id_or_name>
   ```

