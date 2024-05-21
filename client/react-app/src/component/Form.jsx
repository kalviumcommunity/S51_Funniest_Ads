import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Form.css'; 
import axios from 'axios'
import { Link } from 'react-router-dom';
import cookies from 'js-cookie'

function Forms() {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();
    const [submittedData, setSubmittedData] = useState(null);

    const submit = (data) => {
        setSubmittedData(data); 
        console.log(data);
       
        axios.post("http://localhost:3000/createUsers", {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            country: data.country // Include the country field in the data sent to the backend
        })
        .then((res) => {
            console.log(res);
            cookies.set("username", data.lastname);
        })
        .catch(error => console.error(error));
    };
 
    return (
        <div>\
            <form onSubmit={handleSubmit(submit)} className="form-container">
                {isSubmitSuccessful && <div className="success-message">Registration Successful</div>}

                <div className="form-group">
                    <label htmlFor='firstname'>Enter your firstname</label>
                    <input type='text' placeholder='Enter your firstname' id='firstname'
                        {...register("firstname", {
                            required: "Your firstname is required"
                        })}
                    />
                    {errors.firstname && <span className="error-message">{errors.firstname.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor='lastname'>Enter your lastname</label>
                    <input type='text' placeholder='Enter your lastname' id='lastname'
                        {...register("lastname", {
                            required: "Your lastname is required"
                        })}
                    />
                    {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor='email'>Enter your email</label>
                    <input type='email' placeholder='Enter your email' id='email'
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
                    <input type='password' placeholder='Enter your password' id='password'
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

                <div className="form-group">
                    <label htmlFor='country'>Enter your country</label>
                    <input type='text' placeholder='Enter your country' id='country'
                        {...register("country", {
                            required: "Your country is required"
                        })}
                    />
                    {errors.country && <span className="error-message">{errors.country.message}</span>}
                </div>

                <input type='submit' value="Register" className="submit-btn" />
                {isSubmitSuccessful && <button><Link to='/'>Go back</Link></button>}
            </form>
        </div>
    );
}

export default Forms;
