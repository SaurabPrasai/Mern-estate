import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [formData, setFormData] = useState({});

  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setFile(image);
    }
  };

  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);

  const uploadImage = async () => {
    const storage = getStorage();
    const fileName = (
      file.name + Math.random(new Date()).toString(36).slice(-8)
    )
      .split(" ")
      .join("");
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },

      (error) => {
        console.log("Image size must be less than 2MB");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setFormData({...formData,avatar:downloadURL})
        });
      }
    );
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // if(Object.keys(formData).length===0)
    //   return console.log("No Changes Made");
    // const res=await fetch('/api/user/update',{

    // })
  };
  const handleChange = (e) => {
      setFormData({...formData,[e.target.id]:e.target.value})
  };
  console.log(formData);
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center  font-semibold my-7 ">Profile</h1>
      <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => handleImage(e)}
        />
        <img
          src={imageURL || currentUser.avatar}
          alt="profile"
          className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          onClick={() => fileRef.current.click()}
        />
        <input
          type="text"
          name=""
          id="username"
          placeholder="username"
          className=" border p-3  rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          name=""
          id="email"
          placeholder="email"
          className=" border p-3  rounded-lg"
          onChange={handleChange}

        />
        <input
          type="password"
          name=""
          id="password"
          placeholder="password"
          className=" border p-3  rounded-lg"
          onChange={handleChange}

        />
        <button className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className=" flex flex-row justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
