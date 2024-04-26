import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/slice/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

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
        dispatch(signInFailure(null));
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        dispatch(signInStart());
      },

      (error) => {
        dispatch(signInFailure("Image size should be less than 2MB"));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
          dispatch(signInFailure(null));
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInFailure(null));
    if (Object.keys(formData).length === 0)
      return dispatch(signInFailure("No Changes are made"));

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return dispatch(signInFailure(data.message));
      }
      dispatch(signInSuccess(data));
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  const handleChange = (e) => {
    dispatch(signInFailure(null));
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) return dispatch(signInFailure(data.message));
      dispatch(signInSuccess(null));


    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

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
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          name=""
          id="email"
          placeholder="email"
          className=" border p-3  rounded-lg"
          onChange={handleChange}
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          name=""
          id="password"
          placeholder="password"
          className=" border p-3  rounded-lg"
          onChange={handleChange}
        />
        <button
          className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          update
        </button>
      </form>
      <div className=" flex flex-row justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      {error && <p className=" text-red-500 mt-5">{error}</p>}
    </div>
  );
}
