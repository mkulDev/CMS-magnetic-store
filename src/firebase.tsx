import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage, uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage'
import { setDoc, getFirestore, doc, getDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { FirebaseFirestoreError } from 'firebase/firestore'
import { CartItem } from './components/ShoppingCart'

const firebaseConfig = {
  // Paste here your own Firebase configuration
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const storage = getStorage(app)
const db = getFirestore(app)

// Get all documents in a collection
export const getAllProducts = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  const productArr = querySnapshot.docs.map((element) => element.data())
  return productArr
}

export const uploadFileToFirestore = async (file, name: string) => {
  try {
    const fileName = `${name}_${Date.now()}`
    const storageRef = ref(storage, `images/${fileName}`)
    const uploadTask = uploadBytes(storageRef, file)
    await uploadTask

    // Handle successful upload
    console.log('Blob uploaded successfully!')
    // Get the public URL of the uploaded file
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error) {
    console.error('Error uploading file to Firestorage:', error)
  }
}

export const deleteFileFromFireStore = async (url: string) => {
  try {
    const fileRef = ref(storage, url)
    console.log(fileRef)
    deleteObject(fileRef).then(() => {
      console.log('File deleted successfully')
    })
  } catch (error: FirebaseFirestoreError) {
    console.log(error.message)
  }
}

export const uploadProduct = async (product: CartItem) => {
  try {
    await setDoc(doc(db, 'products', product.name), product)
    return { error: false, message: `Successful uploading ${product.name} to database` }
  } catch (error) {
    return { error: true, message: 'An Error has occured when uploading product to Firestore' }
  }
}

export const suspendProduct = async (product: CartItem) => {
  console.log(product.name)
  try {
    const productRef = doc(db, 'products', product.name)
    const productDoc = await getDoc(productRef)

    if (productDoc.exists()) {
      const suspendCurrentValue = productDoc.data().suspend
      await updateDoc(productRef, {
        suspend: !suspendCurrentValue
      })
    }

    console.log('Product status has been successfully changed.')
    // Set the "capital" field of the city 'DC'
  } catch (error) {
    console.log('Sorry, but an error has occurred.', error)
  }
}

export const deleteProduct = async (name: string) => {
  try {
    await deleteDoc(doc(db, 'products', name))
    console.log('Product has been removed')
  } catch (error: FirebaseFirestoreError) {
    console.log(error.message)
  }
}
