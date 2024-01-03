import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const App = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    predictImage(file);
  };

  const predictImage = async (file) => {
    // Implement logic to send the image to your ML model for predictions
    // Update the 'prediction' state with the received predictions
    // Use axios or any other library to make HTTP requests
    try {
      const response = await axios.post('YOUR_MODEL_API_ENDPOINT', { image: file });
      setPrediction(response.data);
    } catch (error) {
      console.error('Error predicting image:', error);
    }
  };

  return (
    <div>
      <h1>Image Classification App</h1>
      <Dropzone onDrop={onDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" style={imageStyle} />}
      {prediction && (
        <div>
          <h2>Prediction:</h2>
          <ul>
            {/* Display prediction results here */}
            {prediction.map((result, index) => (
              <li key={index}>{result.label}: {result.confidence.toFixed(4)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const imageStyle = {
  maxWidth: '100%',
  marginTop: '20px',
};

export default App;
