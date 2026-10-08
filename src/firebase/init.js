import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../firebase'

const db = getFirestore(firebaseApp)

if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
}

export default db
