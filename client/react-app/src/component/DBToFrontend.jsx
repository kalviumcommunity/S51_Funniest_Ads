// import { useEffect, useState } from "react";
// import './DBToFrontend.css'

// export default function DBToFrontend() {
//   let [data, setData] = useState(null);
//   let [dataa, setDataa] = useState(null)
//   const apiLink = "https://s51-funniest-ads-khgg.onrender.com/getData";
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     try {
//       const response = await fetch(apiLink);
//       const responseData = await response.json();
//       setData(responseData);
//       console.log(responseData);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   // const fetchTheData = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:3000/api/users");
//   //     const responseData = await response.json();
//   //     setDataa(responseData);
//   //     console.log(responseData);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };
//   // useEffect(() => {
//   //   fetchTheData();
//   // }, []);

//   return (
//     < div className="container">
//       <h2>Server Details</h2>
//      <div className="box">
//      {data &&
//         data.map((item, index) => (
//           <div className="item" key={index}>
//             <p><strong>Name:</strong> {item.user_name}</p>
//             <p><strong>Email:</strong> {item.email}</p>
//             <p><strong>Watched Videos:</strong> {item.Watched_videos}</p>
//             <p><strong>Likes:</strong> {item.Likes}</p>
//             <p><strong>Comments:</strong> {item.Comments}</p>
//           </div>
//         ))}
//     </div>
//          {/* {dataa &&
//         dataa.map((item, index) => (
//           <div className="item" key={index}>
//             <p><strong>Name:</strong> {item.firstname}</p>
//             <p><strong>Email:</strong> {item.lastname}</p>
//             <p><strong>Watched Videos:</strong> {item.email}</p>
//             <p><strong>Likes:</strong> {item.password}</p>
//           </div>
//         ))} */}
//     </div >
   
//   );
// }
