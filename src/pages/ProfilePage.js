import { useEffect, useState } from "react";
import { Api } from "../api/api";

const ProfilePage = () => {

    const [me, setMe] = useState(null);

    useEffect(() => {
        Api.apiGet('/auth/me')
        .then(resp => resp.text())
        .then(val => setMe(val ? val : 'null'))
        .catch(err => setMe("error"))
    }, []);

    return <>
        <h1 style={{textAlign: "center"}}>Me is: {me}</h1>

        {/* <a href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectURI}&response_type=code&client_id=${clientId}&scope=${scope}`}>войти с гугл</a> */}
        <a href={`http://localhost:8080/oauth2/authorization/google`}>войти с GOOGLE 2.0</a>
        <button onClick={() => {
            Api.updateToken();
        }}>update token</button>
    </>
}

export default ProfilePage;