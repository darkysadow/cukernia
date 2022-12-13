
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const CATEGORIES_COLLECTION = 'categories';

export async function getCategories (setCategories) {
    const docRef = doc(db, CATEGORIES_COLLECTION, CATEGORIES_COLLECTION);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("i`m get categories")
        return setCategories(docSnap.data().categories);
        
    } else {
        console.log('No such document');
    }
}