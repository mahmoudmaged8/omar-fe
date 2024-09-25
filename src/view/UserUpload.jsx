import { useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { HeaderLanding } from '../Components/HeaderLanding';
import '../assets/UserUpload.css';
import axiosClient from '../axiosClientFront';

const UserUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
    readURL(event.target); // Call the readURL function passing the input element
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('img', selectedImage);

      const response = await axiosClient.post('paymentimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.Success) {
        setSuccessMessage("Upload successful");
        window.location.href = "/";
      }else{
        setLoading(false);
        setErrorMessage(response.data.Massage)
      }
      console.log(response.data.Massage);

      // Handle the response as needed
    } catch (error) {
      console.error(error);
      setErrorMessage("Upload failed");
      setLoading(false);
      // Handle errors
    }
  };

  const removeUpload = () => {
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const readURL = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      removeUpload();
    }
  };
  return (
    <>
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
  <HeaderLanding/>
      <div className="file-upload mt-20">
        <button className="file-upload-btn" onClick={handleUpload} type="button">
          ارفع الصورة
        </button>
        {loading ? (
          <>
          <Spinner animation="border" />
          <span>جاري تحميل الصورة.......</span>
          </>
        ) : (
          <>
          {previewImage ? (
            <div className="file-upload-content">
              <img className="file-upload-image" src={previewImage} alt="Preview" />
              <div className="image-title-wrap">
                <button type="button" onClick={removeUpload} className="remove-image">
                  حذف <span className="image-title">الصورة المرفوعة</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="image-upload-wrap">
              <input className="file-upload-input" onChange={handleImageChange} type="file" accept="image/*" />
              <div className="drag-text">
                <h3>ارفع صورة التحويل هنا</h3>
              </div>
            </div>
          )}
          </>
        )}
      
      </div>

    </>
  );
};

export default UserUpload;
