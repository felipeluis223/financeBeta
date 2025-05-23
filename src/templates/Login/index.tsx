import LoginForm from "../../components/LoginForm";
import LoginWallpaper from "../../components/LoginWallpaper";

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginTemplate (){
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);  // Acessa o token do Redux

    useEffect(() => {
      // Verifica se o token existe e se a rota atual não é '/home'
      if (token && window.location.pathname !== "/home") {
        navigate("/home");
      }
    }, [token, navigate]);

    
    return (
        <section className="w-full h-screen bg-[#ffffff] flex flex-row">
            <LoginWallpaper />

            <section className="w-full md:w-[65%] h-full flex justify-center mt-[50px] md:mt-0 md:items-center">
                <LoginForm />
            </section>
        </section>
    )
};