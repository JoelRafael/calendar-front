import { useEffect } from 'react';
import { useAutStore } from '../../calendar/hooks/useAuthStore';
import { useForm } from '../../calendar/hooks/useForm';
import './loginPage.css';
import Swal from 'sweetalert2';

const loginFormsFields = {
    loginEmail: '',
    loginPassword:''
}
const registerFormsFields = {
    registerName: '',
    registerEmail: '',
    registerPassword:'',
    registerPassword2:''
}

export const LoginPage = () => {

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormsFields)
    const { registerName, registerEmail, registerPassword,
            registerPassword2, onInputChange: onRegistreInputChange }= useForm(registerFormsFields)
    
    const { startLogin, startRegister,erroMessage } = useAutStore({});
    
    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email:loginEmail, password:loginPassword });
    }
    
    const registreSubmint = (event) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            Swal.fire("Error en registro", "Las paswword no son iguales", "error");
            return;
        }
        startRegister({ name:registerName, email:registerEmail, password:registerPassword });
        
    }
    useEffect(() => {
        if (erroMessage !== undefined) {
            Swal.fire('Error en la autenticacion', erroMessage, 'error')
     }
    }, [erroMessage])
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registreSubmint}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onRegistreInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegistreInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegistreInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegistreInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}