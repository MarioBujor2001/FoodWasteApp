import React from 'react'
import auth from '../../firebase.js'
import axios, { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import "./EditProfile.css"
function EditProfile() {

    let [dateUtilizator, setDateUtilizator] = useState('')
    const { state } = useLocation();
    const userNameEdited = useRef();
    const addressEdited = useRef();
    const phoneEdited = useRef();



   
    const getDateUtilizator = async () => {
        const dataFromAxios = await axios.get('http://localhost:3030/api/users/' + state);
        //console.log(dataFromAxios.data.username.split(" ")[0]);
        setDateUtilizator(dataFromAxios.data);

    }


    useEffect(() => { getDateUtilizator() }, [])





    let submitAll = () => {
        console.log({
            username: userNameEdited.current.value,
            address: addressEdited.current.value,
            phone: phoneEdited.current.value
        }
        );

        let linkUpdate='http://localhost:3030/api/users/'+dateUtilizator.id;
        let copieDateUtilizator = JSON.parse(JSON.stringify(dateUtilizator))
      
       copieDateUtilizator.username=userNameEdited.current.value.length>1?userNameEdited.current.value:dateUtilizator.username;
       copieDateUtilizator.address=addressEdited.current.value.length>1?addressEdited.current.value:dateUtilizator.address;
       copieDateUtilizator.phone=phoneEdited.current.value.length>1?phoneEdited.current.value:dateUtilizator.phone;
        
       axios.put(linkUpdate,copieDateUtilizator).catch(err=>{console.log(err)});

    }

    return (

        <div style={{
            marginTop: 50, alignItems: 'center', backgroundColor: "#0132220", border: 0, display: "flex", fontSize: 16,
            justifyContent: 'center', margin: 0, padding: 0, height: '50vw'
        }}>
            <div className='EditProfile' >
                <form method="get" id="login-form" className="login-form" role="main" onSubmit={submitAll}>
                    <h1 > <pre> Edit Profile</pre> </h1>


                    <div>
                        <label className="label-email">
                            <input type="text" className="text" name="text" placeholder="Edit Username" tabIndex="1" ref={userNameEdited} />
                            <span className="required">Username</span>
                        </label>
                    </div>


                    <div>
                        <label className="label-email">
                            <input type="text" className="text" name="text" placeholder="Edit Address" tabIndex="2" ref={addressEdited} />
                            <span className="required">Address</span>
                        </label>
                    </div>


                    <div>
                        <label className="label-email">
                            <input type="text" className="text" name="text" placeholder="Edit Phone Number" tabIndex="3" ref={phoneEdited} />
                            <span className="required">Phone</span>
                        </label>
                    </div>
                    <input type="button" value="Save Changes" onClick={submitAll} style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }} />

                    <div className="email">
                        <a href="/authenticated">Go Back To Main Page</a>
                    </div>
                    <figure aria-hidden="true">
                        <div className="person-body"></div>
                        <div className="neck skin"></div>
                        <div className="head skin">
                            <div className="eyes"></div>
                            <div className="mouth"></div>
                        </div>
                        <div className="hair"></div>
                        <div className="ears"></div>
                        <div className="shirt-1"></div>
                        <div className="shirt-2"></div>
                    </figure>
                </form>

            </div>
        </div>
    );
}

export default EditProfile