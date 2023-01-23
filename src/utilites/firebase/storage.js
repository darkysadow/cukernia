import { format } from 'date-fns';
import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
 
// Bucket URL from Storage in Firebase Console
const BUCKET_URL = "gs://cukernia-test.appspot.com";
 
// Uploads image and returns the storage bucket
export async function uploadImage(image, category) {
  console.log(image)
  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'O'");
  const bucket = `${BUCKET_URL}/${category}/${formattedDate}.jpg`;
  await uploadBytes(ref(storage, bucket), image);
  return bucket;
}

// Replaces existing image in storage and returns the storage bucket
export function replaceImage(image, bucket) {
  uploadBytes(ref(storage, bucket), image);
}

// Deletes existing image in storage
export function deleteImage(bucket) {
  deleteObject(ref(storage, bucket));
}

// Gets the download URL from the reference URL
export async function getDownloadURL(bucket) {
  return await getStorageDownloadURL(ref(storage, bucket));
}
