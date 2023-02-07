
import { async } from '@firebase/util';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL } from './storage';
import { db } from './firebase';

const CATEGORIES_COLLECTION = 'categories';
const DISHES_COLLECTION = 'dishes';

/* 
 Adds receipt to Firestore with given receipt information:
 - address: address at which purchase was made
 - amount: amount of expense
 - date: date of purchase
 - imageBucket: bucket at which receipt image is stored in Firebase Storage
 - items: items purchased
 - locationName: name of location
 - uid: user ID who the expense is for
*/
export function addReceipt( category, dishName, description, price, portion, available, imageBucketURL, imageURL, portionNominal) {
    addDoc(collection(db, DISHES_COLLECTION), { dishName, description, price, portion, available, imageBucketURL, imageURL, category, portionNominal });
  }
  

export async function getCategories (setCategories) {
    const docRef = doc(db, CATEGORIES_COLLECTION, CATEGORIES_COLLECTION);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return setCategories(docSnap.data().categories);
    } else {
        console.log('No such document');
    }
}

export async function getMenuCategories (setCategories, setSelectedMenuCategory) {
    const docRef = doc(db, CATEGORIES_COLLECTION, CATEGORIES_COLLECTION);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setSelectedMenuCategory(docSnap.data().combinedCategories[0].name)
        return setCategories(docSnap.data().combinedCategories);
    } else {
        console.log('No such document');
    }
}

export async function getSelectedCategoryMenu(category, setMenu) {
    const q = query(collection(db, DISHES_COLLECTION), where('category', 'in', [...category]));
    const querySnapshot = await getDocs(q);
    let menuArr = [];
    await querySnapshot.forEach((doc) => {
        menuArr.push(doc.data())
        
    })
    setMenu(menuArr)
}

export async function getAllDishes(setAllDishes, setIsLoadingDishes) {
    const q = query(collection(db, DISHES_COLLECTION));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
        let dishes = [];
        for (const documentSnapshot of snapshot.docs) {
            const dish = documentSnapshot.data();
            dishes.push({
                ...dish,
                id: documentSnapshot.id,
                imageURL: await getDownloadURL(dish.imageBucketURL)
            })
        }
        setAllDishes(dishes);
        setIsLoadingDishes(false);
    })
    return unsubscribe;
    /*const querySnapshot = await getDocs(q);
    let dishesArr = [];
    querySnapshot.forEach((doc) => {
        dishesArr.push(doc.data())
        
    })
    setAllDishes(dishesArr)*/
}

export function updateDish(docId, available, category, description, dishName, imageBucketURL,
    imageURL, portion, portionNominal, price) {
    setDoc(doc(db, DISHES_COLLECTION, docId), { available, category, description, dishName, imageBucketURL,
        imageURL, portion, portionNominal, price });
  }
  

export function deleteDish(id) {
    deleteDoc(doc(db, DISHES_COLLECTION, id));
  }
/*
const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
*/
