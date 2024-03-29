import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import "./LeftMenu.css"
import axios, { all } from "axios";
import storage from '../../firebaseStorage.js'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'
const LeftMenu = (props) => {
    const navigate = useNavigate();
    //console.log("Ce"+auth.currentUser.uid);
    let [numeUtilizator, setNumeUtilizator] = useState('');
    let [profilePic, setProfilePic] = useState(null);
    let [currentProfilePic, setCurrentProfilePic] = useState('');
    let [dataForUpdate, setDateForUpdate] = useState({});
    const getNumeUser = async () => {
        const dataFromAxios = await axios.get('http://localhost:3030/api/users/' + auth.currentUser.uid);
        //console.log(dataFromAxios.data.username.split(" ")[0]);
        setNumeUtilizator(dataFromAxios.data.username.split(" ")[0]);
        setDateForUpdate(dataFromAxios.data);
        setCurrentProfilePic(dataFromAxios.data.photoUrl);
    }

    useEffect(() => {
        setTimeout(getNumeUser,1000);
    }, [])


    //console.log(numeUtilizator);
    const uploadImage = () => {
        if (profilePic == null) {
            return;
        }
        const imgRef = ref(storage, `ProfilePics/${v4() + '_' + profilePic.name}`);
        uploadBytes(imgRef, profilePic).then(() => {
            getDownloadURL(imgRef).then((res) => {
                setCurrentProfilePic(res);
                console.log(res);
                let copieDateUtilizator = JSON.parse(JSON.stringify(dataForUpdate));
                copieDateUtilizator.photoUrl = res;
                console.log(copieDateUtilizator, res);
                const linkUpdate = "http://localhost:3030/api/users/" + copieDateUtilizator.id
                axios.put(linkUpdate, copieDateUtilizator).catch(err => { console.log(err) });
            })
        })
    };
    const editProfile = () => {
        navigate("../editProfile", { replace: true, state: auth.currentUser.uid });
    }

    return (
        <div className="leftMenu">
            <div className="leftMenuProfile">
                <img src={currentProfilePic.length > 1 ? currentProfilePic : 'https://firebasestorage.googleapis.com/v0/b/proiecttw-84ef3.appspot.com/o/ProfilePics%2F1244141-200.png?alt=media&token=88ffe4ee-cb6a-4ab7-aad9-73da30ea92c2'} onClick={uploadImage} title="Click to upload image" />
                <br></br>
                <label htmlFor='file'>Select Photo</label>
                <input type="file" id='file' onChange={(event) => { setProfilePic(event.target.files[0]) }} />
                <p>Welcome,<span style={{ color: '#e3a1ff' }}> {numeUtilizator} </span> </p>
                <button className="button-35" onClick={editProfile}>Edit profile</button>
                <button className="button-35" onClick={props.addProduct}>Add product</button>
            </div>
            <hr />
            <div className="leftMenuFilter">
                <p>Filtreaza</p>
                <button className="button-35" onClick={() => { props.setFilter('none') }} style={{ backgroundColor: '#999999' }}>Reset Filter</button>
                <button className="button-35" onClick={() => { props.setFilter('Carne') }} style={{ backgroundColor: props.filter === 'Carne' ? '#bff7ab' : '#ffffff' }}>Carne</button>
                <button className="button-35" onClick={() => { props.setFilter('Fructe') }} style={{ backgroundColor: props.filter === 'Fructe' ? '#bff7ab' : '#ffffff' }}>Fructe</button>
                <button className="button-35" onClick={() => { props.setFilter('Legume') }} style={{ backgroundColor: props.filter === 'Legume' ? '#bff7ab' : '#ffffff' }}>Legume</button>
                <button className="button-35" onClick={() => { props.setFilter('Lactate') }} style={{ backgroundColor: props.filter === 'Legume' ? '#bff7ab' : '#ffffff' }}>Lactate</button>
                <p>Filtreaza disponibilitatea</p>
                <button className="button-35" onClick={() => { props.setAvailableFilter('none') }} style={{ backgroundColor: '#999999' }}>Reset Filter</button>
                <button className="button-35" onClick={() => { props.setAvailableFilter('available') }} style={{ backgroundColor: props.availableFilter === 'available' ? '#bff7ab' : '#ffffff' }}>Disponibile</button>
                <button className="button-35" onClick={() => { props.setAvailableFilter('reserved') }} style={{ backgroundColor: props.availableFilter === 'reserved' ? '#bff7ab' : '#ffffff' }}>Rezervate</button>
                <button className="button-35" onClick={() => { props.setAvailableFilter('sold') }} style={{ backgroundColor: props.availableFilter === 'sold' ? '#bff7ab' : '#ffffff' }}>Vandute</button>
            </div>
            <div className="leftMenuOptions">
                <button className="button-35" onClick={props.handleSignOut}>Sign out</button>
            </div>
        </div>
    );
}

export default LeftMenu;