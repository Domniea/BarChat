import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";


function EditPassword() {

    const {
        editPassword
    } = useContext(UserContext)

    const {
        user: {
            _id
        }
    } = useContext(UserContext)

    const initInputs = {
        currentPass: '',
        newPass: '',
        confirmedPass: ''
    }

    
    const [inputs, setInputs] = useState(initInputs)
    
    // const { currentPass, newPass, confirmedPass } = inputs

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(inputs)
        editPassword(inputs, _id)
    }


    return (
        <div className=" bg-white p-5 rounded border border-info d-flex flex-column justify-content-center text-black">
            <h1>EDIT PASSOWORD</h1>
            
                <form onSubmit={handleSubmit}>
                    <div className="form-group m-2">
                        <label htmlFor="currentPass">Please Type Old Password</label>
                        <input 
                            type="password"
                            name="currentPass"
                            className="form-control" 
                            id="currentPass"
                            value={inputs.currentPass}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group m-2">
                        <label htmlFor="newPass">New Password</label>
                        <input 
                            type="password"
                            name="newPass"
                            className="form-control"
                            id="newPass"
                            value={inputs.newPass}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group m-2">
                        <label htmlFor="confirmedPass">Re-Type New Password</label>
                        <input 
                            type="password"
                            name="confirmedPass"
                            className="form-control"
                            id="confirmedPass"
                            value={inputs.confirmedPass}
                            onChange={handleChange} 
                        />
                    </div>
                    <button className="btn border" >Submit</button>
                </form>
            
        </div>
    )
}

export default EditPassword