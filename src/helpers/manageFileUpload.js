import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const manageFileUpload = async (fileBlob, onImageUploadComplete) => {
  const imgName = "img-" + new Date().getTime();
  const storage = getStorage();
  const storageRef = ref(storage, `images/${imgName}.jpg`);

  const uploadTask = uploadBytesResumable(storageRef, fileBlob);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log("Upload error");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onImageUploadComplete(downloadURL);
      });
    }
  );
};

export default manageFileUpload;
