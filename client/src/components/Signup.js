// User Signup file

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
export const SignupForm = () => {
    const [users, setUsers] = useState([{}])
    const [refreshPage, setRefreshPage] = useState(false);

    //Pass the useFormk() hook initial form values and a submit function that will 
    // be called when the form is submitted

    useEffect(() => {
        console.log("FETCH! ");
        fetch("/users")
            .then((r) => r.json())
            .then((data) => {
                setUsers(data);
                console.log(data);
            })
    }, [refreshPage])

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        name: yup.string().required("Must enter a name").max(15),
        age: yup
            .number()
            .positive()
            .integer()
            .required("Must enter age")
            .typeError("PLease enter an Integer")
            .max(125),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            age: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.status == 200) {
                    setRefreshPage(!refreshPage);
                }
            })
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <label htmlFor='email'>Email Address</label>
                <br />
                <input
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
            </form>
        </div>
    )

}