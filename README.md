# firebase-nextjs-docker

## Description
A Next.js application integrated with Firebase for building web applications.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
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

