/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth,persist} = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log("error refreshing token - persist login");
            } finally {
                setIsLoading(false);
            }
        };

        if (!auth?.accessToken && persist) {
            verifyRefreshToken();
        }
        else{
            isMounted && setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [auth, refresh]);

    return (
        <>
            {!isLoading
                &&
                <Outlet />
            }
        </>
    );
}

export default PersistLogin;
