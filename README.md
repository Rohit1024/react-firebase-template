# react-firebase-template
### Installation Steps: 
- clone this repo using :
   ```
   git clone https://github.com/Rohit1024/react-template.git
   ```
- Navigate to the Project using :
   ```
   cd react-template
   ```
- To Open Vs code in the given location run :
   ```
   code .
   ```
   This will open vs code at the given location.
- Open New Terminal inside your Vs code by going to the Terminal option in the Vs code.
- Install Dependencies using running following command in Vs code terminal :
  ```
  npm install
  ```
- Open the `src/config/firebase.ts` file and replace your firebaseConfig from your Firebae console with the blank firebaseConfig already there.
   ```
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';
   import { getStorage } from 'firebase/storage';

   const firebaseConfig = { // 👈 Replace this 
    };

   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const db = getFirestore(app);
   const storage = getStorage(app);

   export { auth, db, storage };
   ```
- Run the Application with the command in vs code termainal:
   ```
   npm run dev
   ```
- You will get application urlin the vs code termainal go to that url there our application.
