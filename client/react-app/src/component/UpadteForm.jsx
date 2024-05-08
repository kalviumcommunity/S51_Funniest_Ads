import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Form.css'; 
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



function Forms() {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();
    const [submittedData, setSubmittedData] = useState(null);

    const {id} = useParams()   
    const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    // const API_URL = `http://localhost:3000/api/users/`+id; 
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3000/api/users/'+id);
    //   console.log(register.firstname)
      const responseData = response.data;
      console.log('Fetched user data:', responseData.firstname); 
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

 
    function submit(data) {
        setSubmittedData(data); 
        console.log(data);
       
        axios.put("http://localhost:3000/api/users/" + id, {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password
        })
        .then(result => console.log(result))
        .catch(error => console.error(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)} className="form-container">
                {isSubmitSuccessful && <div className="success-message">Registration Successful</div>}

                <div className="form-group">
                    <label htmlFor='firstname'>Enter your firstname</label>
                    <input type='text' placeholder='Enter your firstname' id='firstname' defaultValue={data?.firstname}
                        {...register("firstname", { 
                            required: "Your firstname  required",
                        })}
                    />
                    {errors.firstname && <span className="error-message">{errors.firstname.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor='lastname'>Enter your lastname</label>
                    <input type='text' placeholder='Enter your lastname' id='lastname' defaultValue={data?.lastname}
                        {...register("lastname", {
                            required: "Your lastname is required"
                        })}
                    />
                    {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor='email'>Enter your email</label>
                    <input type='email' placeholder='Enter your email' id='email' defaultValue={data?.email}
                        {...register("email", {
                            required: "Your email is required",
                            pattern: {
                                value: /[a-z0-9_.]+@[a-z]+\.[a-z]/,
                                message: "Invalid email"
                            }
                        })}
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor='password'>Enter your password</label>
                    <input type='password' placeholder='Enter your password' id='password' defaultValue={data?.password}
                        {...register("password", {
                            required: "Your password is required",
                            minLength: {
                                value: 4,
                                message: "The password should be more than 4 letters"
                            },
                            maxLength: {
                                value: 20,
                                message: "The password should be less than 20 letters"
                            }
                        })}
                    />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>

                <input type='submit' value="Register" className="submit-btn" />
                {isSubmitSuccessful && <button><Link to='/'>go back</Link></button>}

            </form>
        </div>
    );
}

export default Forms;

