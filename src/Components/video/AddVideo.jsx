import { useState } from 'react';
import { Alert, ProgressBar } from 'react-bootstrap';
import axiosClient from '../../axiosClientOffline';

export default function EditVideo() {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [description, setDescription] = useState('');
  const [video_link, setVideoLink] = useState('');
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // New state for upload progress

  const addVideo = async () => {
    try {
      setLoading(true);
      setUploadProgress(0); // Reset progress at the start of the upload

      const formData = new FormData();
      formData.append('video', video);
      formData.append('img', image);
      formData.append('title', title);
      formData.append('desc', description);
      formData.append('video_link', video_link);

      const response = await axiosClient.post("video", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress); // Update the upload progress state
        },
      });

      // console.log(response.data);
      if (response.data.success == false){
        setErrorMessage(response.data.message);
      }else {
       
        window.location.href = "/dashboard/videos?success=1";
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("تاكد من رفع الفيديو");
    } finally {
      setLoading(false);
      setUploadProgress(0); // Reset the progress state after finishing the upload
    }
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      {loading ? (
        <>
          <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} animated   />
          جاري الرفع..  {uploadProgress}%{/*  Display the upload progress */}
        </>
      ) : (
        <>
          <h2>Add Video</h2>
          {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
          <input
            type="text"
            placeholder="Title"
            className="mb-3"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            className="mb-3"
            required
            onChange={(e) => setDescription(e.target.value)}
          />{' '}
          <input
            type="url"
            placeholder="link video"
            value={video_link}
            className="mb-3"
            required
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <br />
          <label htmlFor="video">Add Video</label> <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            required
            onChange={handleVideoChange}
            placeholder="add video"
            className="mb-3"
          />
          <br />
          <label htmlFor="image">Add Image</label> <br />
          <input
            type="file"
            accept="image/*"
            id="image"
            required
            onChange={handleImageChange}
            placeholder="add image"
            className="mb-3"
          />
          <br />
          <br />
          <button onClick={addVideo} className="btn btn-danger w-60" disabled={loading}>
            Add
          </button>
        </>
      )}
    </>
  );
}
