import { useState } from "react";
import {TitleLogin, SubTitleLogin} from "../TitleLogin";
import { LoginButton, OptionsButton, ForgotPassword, CreateAccountButton } from "../ButtonLogin";
import { EmailInput } from "../EmailInputLogin";
import { PasswordInput } from "../PasswordInputLogin";

import { login } from "../../settings/authService";

type UserData = {
    email: string,
    password: string
};

export default function FormLogin(){
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ userData, setUserData ] = useState<UserData>({email: "", password: ""});

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const handleChange = (field: string, value: string)=>{
        setUserData((prevData)=>({
            ...prevData,
            [field]: value,
        }));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const userCredential = await login(userData?.email, userData?.password);
            
            if ("status" in userCredential) {
                // Caso de erro - credenciais inválidas:
                alert("E-mail ou senha inválidos.");
            } else {
                // Caso de sucesso
                alert("Login realizado com sucesso!");
            }
        } catch (error) {
            alert("Ocorreu um erro inesperado.");
            console.error("Erro inesperado:", error);
        }
    };
    

    return (
        <section className="w-[500px] h-[500px] rounded-[30px] flex flex-col container-form-login p-[15px]">
            <TitleLogin />
            <SubTitleLogin />

            <form className="w-full h-[450px] flex flex-col gap-[15px]" onSubmit={handleSubmit}>
                <EmailInput value={userData.email} onChange={(e)=>handleChange("email", e)} />
                <PasswordInput value={userData.password} onChange={(e)=>handleChange("password", e)} visibility={showPassword} togglePasswordVisibility={togglePasswordVisibility}/>
                
                <ForgotPassword />
                <div className="w-full h-[180px] flex flex-col gap-[25px]">
                    <div className="w-full h-full flex  gap-[10px]">
                        <LoginButton />
                        <CreateAccountButton />
                    </div>

                    <hr className="text-[#d1d1d1]"/>
                    
                    <div className="w-full h-[120px] flex flex-col gap-[15px]">    
                        <p className="w-full h-[20px] text-[15px] text-[#808080]">Outras formas de realizar o login:</p>
                        <OptionsButton />
                    </div>
                </div>
            </form>
        </section>
    );
};