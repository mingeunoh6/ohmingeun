import React, { useState } from "react";
import axios from "axios";

const ImageUpload = (props) => {
  const [files, setFiles] = useState({});
  const FileUpload = (e) => {
    const formData = new FormData();

    formData.append("file", e.target.files[0]);

    axios.post("/api/post/image/upload", formData).then((response) => {
      props.setImage(response.data.filePath);
    });
  };

  return (
    <div>
      <input
        type="file"
        id="myFile"
        name="filename"
        accept="image/*"
        onChange={(e) => FileUpload(e)}
      />
    </div>
  );
};

export default ImageUpload;
