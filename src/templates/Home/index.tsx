import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader";

function HomeTemplate(){

    const navigate = useNavigate();
    
    // Verificando se há token no localStorage para permitir o acesso:
    useEffect(() => {
        const getToken = () => {
            const token = localStorage.getItem("tokenBeta");
            if (!token) {
                navigate("/");
            };
        };

    getToken();
    }, [navigate]);
    
    return (
        <section className="w-full h-screen">
            <HomeHeader />
        </section>
    );
};

export default HomeTemplate;