import { useEffect, useState } from "react";
import { Api } from "../../api/api";


/**
 * Component that makes a single authorization request before rendering anything inside it  
 */
const AuthProvider = ({children}) => {

    const [done, setDone] = useState(false);

    // refresh user's authorization on page load
    useEffect(() => {

        if (Api.getCurrentToken() == null) {
            console.log('Old token ', Api.getCurrentToken());
            Api.updateToken()
            .finally(
                () => setDone(true)
            );
        }
        
    }, []);
    
    return done ? <>{children}</> : <></>;
}

export default AuthProvider;