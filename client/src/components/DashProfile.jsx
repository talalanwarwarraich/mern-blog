import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Alert, Button, TextInput } from 'flowbite-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from '../redux/user/userSlice';

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e);
    setFormData((data) => ({
      ...data,
      [e.target.id]: e.target.value.trim(),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const uploadImage = useCallback(async () => {
    setFileUploadError(null);
    const storage = getStorage();
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(0));
        console.log(progress, snapshot);
      },
      (error) => {
        console.error(error);
        setFileUploadError(
          'Could not upload iamge(File must be less than 2MB)'
        );
        setUploadProgress(null);
        setImageUrl(null);
        setImage(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setFormData((data) => ({ ...data, profilePic: downloadURL }));
        });
      }
    );
  }, [image]);

  useEffect(() => {
    console.log('rendering...');
    if (!image) return;

    uploadImage();
  }, [image, uploadImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.keys(formData).length) return;

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const showUploadProgress = () => {
    if (!uploadProgress) return;

    if (uploadProgress < 0 || uploadProgress >= 100) return;

    return (
      <CircularProgressbar
        value={uploadProgress}
        text={`${uploadProgress}%`}
        strokeWidth={5}
        styles={{
          root: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          },
          path: {
            stroke: `rgba(62,152,199, ${uploadProgress / 100})`,
          },
        }}
      />
    );
  };

  return (
    <div className='max-w-lg max-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={handleImageChange}
          type='file'
          accept='image/*'
          ref={filePickerRef}
          className='hidden'
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {showUploadProgress()}
          <img
            src={imageUrl || currentUser?.profilePic}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              uploadProgress && uploadProgress < 100 ? 'opacity-60' : ''
            }`}
          />
        </div>
        {fileUploadError && <Alert color='failure'>{fileUploadError}</Alert>}
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='text'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
          disabled
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          defaultValue={currentUser.password}
          onChange={handleChange}
        />
        <Button type='submit' gradientDuoTone={'purpleToBlue'} outline>
          Update
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
