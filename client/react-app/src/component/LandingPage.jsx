import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LandingPage.css'; 
import { Link } from 'react-router-dom';
import cookies from 'js-cookie';

const LandingPage = () => {
    const API_URL = `http://localhost:3000/api/users/`;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUsername, setSelectedUsername] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(API_URL);
            setData(response.data);
            setFilteredData(response.data); // Initially, set filtered data to all users
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

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/api/users/' + id)
            .then(res => {
                console.log(res); 
                cookies.remove("username"); 
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleUsernameChange = (e) => {
        const selectedUsername = e.target.value;
        setSelectedUsername(selectedUsername);
        if (selectedUsername === '') {
            setFilteredData(data); 
        } else {
            const filteredUsers = data.filter(user => `${user.firstname} ${user.lastname}` === selectedUsername);
            setFilteredData(filteredUsers);
        }
    };

    return (
        <div className="landing-page">
            <h1>Hello there!</h1>
            <div className="greeting">Welcome to my project page</div>
            <button><Link to='/create'>Add</Link></button>
            <div>
                <label htmlFor="username-select">Choose a user:</label>
                <select id="username-select" value={selectedUsername} onChange={handleUsernameChange}>
                    <option value="">All</option>
                    {data.map(user => (
                        <option key={user._id} value={`${user.firstname} ${user.lastname}`}>
                            {user.firstname} {user.lastname}
                        </option>
                    ))}
                </select>
            </div>
            {isLoading && <p>Loading data...</p>}
            {error && <p className="error-message">Error: {error.message}</p>}
            {filteredData && (
                <div className="blocks-container">
                    <div className="blocks-grid">
                        {filteredData.map((item, index) => (
                            <div className="item-container" key={index}>
                                <p>
                                    <strong>Name:</strong> {item.firstname} {item.lastname}
                                </p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <div className="buttons-container">
                                    <button><Link to={`update/${item._id}`}>Update item</Link></button>
                                    <button onClick={() => handleDelete(item._id)}>Delete item</button>
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
