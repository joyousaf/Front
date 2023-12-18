import { useState } from 'react';
import UploadSvg from '../component/uploadsvg';
import Filesvg from '../component/filesvg';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [modelDescription, setModelDescription] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = [...e.dataTransfer.files];
    setFiles(newFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    e.preventDefault();
    const newFiles = [...e.target.files];
    setFiles(newFiles);
  };

  // state and function for model description
  const handleModelDescriptionChange = (e) => {
    setModelDescription(e.target.value);
  };

  // function to handle upload submit
  const handleUploadSubmit = async () => {
    const backendServerUrl = 'http://15.152.251.45:8080';

    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('modelDescription', modelDescription);

      const response = await fetch(`${backendServerUrl}/upload-model`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Model uploaded successfully:', result);
        
      } else {
        console.error('Failed to upload model:', response.statusText);
      }
    } catch (error) {
      console.error('Error during model upload:', error.message);
    }
  };

  return (
    <div className='min-h-[90vh] h-full w-full bg-[#B6B6B6] flex justify-center items-center'>
      <div
        className='file-upload max-w-xl w-full bg-[#EFEFEF] border-2 shadow-md border-[#969696] border-dashed rounded-lg px-3 grid place-items-center text-[#6A6A6A] py-16'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type='file'
          className='hidden'
          id='fileInput'
          accept='.jpg,.jpeg,.png,.gif,.pdf'
          multiple
          onChange={handleFileSelect}
        />
        {files.length === 0 && (
          <div
            htmlFor='fileInput'
            className='flex flex-col justify-center items-center'
          >
            <UploadSvg />
            <p>Upload your voice model.zip</p>
          </div>
        )}
        {files.length > 0 && (
          <>
            <Filesvg />
            <div>
              <p>{files[0].name}</p>
            </div>
            <div className='mt-5 flex flex-col justify-center items-center gap-4'>
              <input
                type='text'
                placeholder='input your model’s description'
                value={modelDescription}
                onChange={handleModelDescriptionChange}
                className='rounded-full px-7 py-2 border border-[#D9D9D9] '
              />
              <button className='btn' onClick={handleUploadSubmit}>
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
