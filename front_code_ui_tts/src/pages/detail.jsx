import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../css/detail.css';

const baseUrl = import.meta.env.VITE_BACK_BASE_URL

const Detail = () => {
  let { id } = useParams(); 
  let navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');
  const [details, setDetails] = useState({
    title: "Loading...",
    text: [],
  });

  const fetchDetails = async (modelId) => {
    try {
      const response = await axios.get(`${baseUrl}/models/detail`, {
        params: { modelId } 
      });
      if (response.status === 200 && response.data.isSuccess) {
        const result = response.data.result;
        setDetails({
          title: result.name,
          text: result.description ? [result.description] : [], 
          imageSrc: result.image_url,
        });
        setImageSrc(result.image_url);
      }
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetails(id); 
    }
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="detail-container">
      <h1>{details.title}</h1>
      {imageSrc ? <img className="detail-image" src={imageSrc} alt={details.title} /> : <p>Loading image...</p>}
      <div className="detail-info">
        {details.text.map((detail, index) => (
          <p key={index}>{detail}</p>
        ))}
      </div>
      <button onClick={goBack} className="뒤로가기">Back</button>
    </div>
  );
};

export default Detail;
