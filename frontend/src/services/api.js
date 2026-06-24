const API_URL = import.meta.env.VITE_API_URL;

const response = await axios.post(
  `${API_URL}/pipeline/`,
  formData
);



export default api;
