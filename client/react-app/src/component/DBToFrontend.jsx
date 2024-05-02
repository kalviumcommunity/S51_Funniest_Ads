import { useEffect, useState } from "react";
import './DBToFrontend.css'

export default function DBToFrontend() {
  let [data, setData] = useState(null);
  const apiLink = "https://s51-funniest-ads-khgg.onrender.com/getData";
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(apiLink);
      const responseData = await response.json();
      setData(responseData);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    < div className="container">
      <h2>Server Details</h2>
     <div className="box">
      {data &&
        data.map((item, index) => (
          <div className="item" key={index}>
            <p><strong>Name:</strong> {item.user_name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Watched Videos:</strong> {item.Watched_videos}</p>
            <p><strong>Likes:</strong> {item.Likes}</p>
            <p><strong>Comments:</strong> {item.Comments}</p>
          </div>
        ))}
    </div>
    </div >
   
  );
}
