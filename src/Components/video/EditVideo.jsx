/* eslint-disable react/prop-types */
import { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import axiosClient from "../../axiosClientOffline";
import axiosClientImage from "../../axios_img_offline";

export default function EditVideo({ video }) {
  const [posts, setPosts] = useState({
    id: video.id,
    video: null,
    img: null,
    desc: video.desc || "",
    title: video.title || "",
    user_id: localStorage.getItem("user_id"),
    video_link: video.video_link || "",
  });
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [Videos, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
    const videoFile = e.target.files[0];
    setPosts({ ...posts, video: videoFile });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const imageFile = e.target.files[0];
    setPosts({ ...posts, img: imageFile });
  };
  // const editVideo = async () => {
  //   try {
  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("id", posts.id);
  //     formData.append("desc", posts.desc);
  //     formData.append("title", posts.title);
  //     formData.append("user_id", posts.user_id);
  //     formData.append("video", posts.video);
  //     formData.append("img", posts.img);
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     // console.log(posts);
  //     // if (posts.video||posts.image) {
  //     //   console.log(formData);
  //     //   const response = await axiosClient.post('videoUpdate', {formData,'id':posts.id}, config);

  //     //   console.log(response.data);
  //     //   console.log(100);
        
  //       // if (response.data.Massage === "Request is Updated") {
  //       //   window.location.href = "/dashboard/videos?update";
  //       // }
        
  //     // }else{
  //       console.log(formData);
  //     const response = await axiosClient.post('videoUpdate', formData , config);

  //     console.log(response.data);
  //     // console.log(200);
  //     if (response.data.Massage === "Request is Updated") {
  //       window.location.href = "/dashboard/videos?update";
  //     }
  //   // }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
    
  // };
  const editVideo = async () => {
    try {
      setLoading(true);
      setUploadProgress(0); // Reset progress at the start of the upload

      const formData = new FormData();
      formData.append("id", posts.id);
      if(Videos){
        formData.append('video', Videos);
      }
      if(image){
        formData.append('img', image);
      }
      // formData.append('img', image);
      formData.append('title', posts.title);
      formData.append('desc', posts.desc);

      const response = await axiosClient.post("videoUpdate",  {formData,'id':posts.id}, {
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
        // setErrorMessage(response.data.message);
        // console.log(response.data.message);
      }else {
       
        window.location.href = "/dashboard/videos?update";
      }
    } catch (err) {
      console.log(err);
      // setErrorMessage("تاكد من رفع الفيديو");
    } finally {
      setLoading(false);
      setUploadProgress(0); // Reset the progress state after finishing the upload
    }
  };



  const handleTitleChange = (e) => {
    const value = e.target.value;
    const title = value === "" ? video.title : value;
    setPosts({ ...posts, title });
  };
  
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const desc = value === "" ? video.desc : value;
    setPosts({ ...posts, desc });
  };
  const handleVideoLinkChange = (e) => {
    const value = e.target.value;
    const video_link = value === "" ? video.video_link : value;
    setPosts({ ...posts, video_link });
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
          <h2>Edit Video</h2>
          <img
            src={`${axiosClientImage.defaults.baseURL}videosthumbnails/${video.img}`}
            alt={video.title}
            style={{ cursor: "pointer", margin: "0", maxWidth: "100px" }}
          />
          <video
            id={`video-${video.id}`}
            src={`${axiosClientImage.defaults.baseURL}Videos/${video.video}`}
            style={{
              top: 0,
              left: 0,
              width: "100px",
              zIndex: 999,
              cursor: "pointer",
            }}
          />
          <input
            type="text"
            placeholder="Title"
            value={posts.title}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            placeholder="Description"
            value={posts.desc}
            onChange={handleDescriptionChange}
          />
            <input
            type="url"
            placeholder="link video"
            value={posts.video_link}
            className="mb-3"
            required
            onChange={handleVideoLinkChange}
          />
          <br />
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />
          <button
            onClick={editVideo}
            className="btn btn-danger w-60"
            disabled={loading}
          >
            Update
          </button>
        </>
      )}
    </>
  );
}
