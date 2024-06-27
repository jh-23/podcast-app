
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from './Input.js';
import Label from './Label.js';
import { useNavigate } from 'react-router-dom';


const  SignupForm = ({ onLogin }) => {

    const [users, setUsers] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // useEffect(() => {
    //     fetch("/users")
    //         .then((r) => r.json())
    //         .then((data) => {
    //             setUsers(data)
    //             console.log(data)
    //         })
    // }, [refreshPage])

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a valid username"),
        password: yup.string().required("Must enter a password").max(15)
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log("I have been clicked")
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.status === 201) {
                    // navigate("/")
                    onLogin(r)
                }
            })
        }
    })

    function handleSignUpClick() {
        navigate('/')
    }

    return (
        <div>
            <h2 className='signup-form-h2'>Sign up here to create a Podcasts Account: </h2>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px"}}>
                <Label htmlFor="username">Username:</Label>
                <br />
                <Input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                >
                </Input>
                <p style={{ color: "red" }}> {formik.errors.username}</p>
                <br />


                <Label htmlFor='password'>Password:</Label>
                <Input
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                >
                </Input>
                <p style={{ color: "red" }}> {formik.errors.password}</p>
                
                <br />
                <button onClick={handleSignUpClick} type='submit'>{isLoading ? "Loading..." : "Sign Up"}</button>
            </form>
            <table style = {{ padding: "15px" }}>
            </table>
            
        </div>
    )

}

export default SignupForm;