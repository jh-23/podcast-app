
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function SignupForm() {

    const [users, setUsers] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);

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
            fetch("users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.status == 200) {
                    setRefreshPage(!refreshPage)
                }
            })
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px"}}>
                <label htmlFor="username">Username</label>
                <br />
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                >
                </input>
                <p style={{ color: "red" }}> {formik.errors.username}</p>
                <br />

                <input
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                >
                </input>
                <p style={{ color: "red" }}> {formik.errors.password}</p>
                <label htmlFor='password'>Password</label>
                <br />
            </form>
            <table style = {{ padding: "15px" }}>
                <tbody>
                    <tr>
                        <th>username</th>
                        <th>password</th>
                    </tr>
                    {typeof users === "undefined" ? (
                        <p>Loading</p>
                    ) : (users.map((user, i) => (
                            <tr key={i}>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                            </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    )

}

export default SignupForm;