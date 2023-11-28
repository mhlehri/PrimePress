import axios from "axios";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const useHosting = async ({ image }) => {
  const res = await axios.post(
    image_hosting_api,
    { image },
    {
      headers: { "content-type": "multipart/form-data" },
    }
  );
  return res;
};

export default useHosting;
