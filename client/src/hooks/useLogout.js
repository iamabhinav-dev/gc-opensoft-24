import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth,setPersist} = useAuth();

    const logout = async()=>{
        await setAuth(null);
        await setPersist(false);
        try{
            await axios.get("/logout",{
                withCredentials: true
            });
        } catch (error){
            console.log(error);
        } finally{
            window.location.reload();
        }
    }
    return logout;
}

export default useLogout;