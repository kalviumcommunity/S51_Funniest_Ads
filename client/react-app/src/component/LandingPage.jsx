import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LandingPage.css'; 
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const API_URL = `http://localhost:3000/api/users/`;

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(API_URL);
            const responseData = response.data;
            setData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id, firstname) => {
        axios.delete('http://localhost:3000/api/users/' +id)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="landing-page">
            <h1>Hello there!</h1>
            <div className="greeting">Welcome to my project page</div>
            <button><Link to='/create'>Add</Link></button>
            {isLoading && <p>Loading data...</p>}
            {error && <p className="error-message">Error: {error.message}</p>}
            {data && (
                <div className="blocks-container">
                    <div className="blocks-grid">
                        {data.map((item, index) => (
                            <div className="item-container" key={index}>
                                <p>
                                    <strong>Name:</strong> {item.firstname} {item.lastname}
                                </p>
                                <p><strong>Email:</strong> {item.email}</p>
                                {/* <p><button onClick={(e) => {deleteCookie(firstname)}}> delete</button></p> */}
                                {/* <p><strong>Watched Videos:</strong> </p>
                                <p><strong>Likes:</strong> </p> */}
                                <div className="buttons-container">
                                    <button><Link to={`update/${item._id}`}>Update item</Link></button>
                                    <button>Delete item</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
