
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase';

const CATEGORIES_COLLECTION = 'categories';
const DISHES_COLLECTION = 'dishes';

export async function getCategories (setCategories) {
    const docRef = doc(db, CATEGORIES_COLLECTION, CATEGORIES_COLLECTION);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return setCategories(docSnap.data().categories);
    } else {
        console.log('No such document');
    }
}

export async function getSelectedCategoryMenu(category, setMenu) {
    const q = query(collection(db, DISHES_COLLECTION), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    let menuArr = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        menuArr.push(doc.data())
    })
    setMenu(menuArr)
}

/*
const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
*/
