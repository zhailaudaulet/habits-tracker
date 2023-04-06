import React, {useState} from 'react';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";
import axios from "axios";

export const Login = ({sec, setSec, setAuthorized, authorized}) => {


    const [reg, setReg] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [secure, setSecure] = useState('')
    const [username, setUsername] = useState('')
    let logObj = {
        top: "LOGIN",
        first: "login",
        second: "register"
    }

    const [obj, setObj] = useState(logObj);

    let regObj = {
        top: "REGISTER",
        first: "register",
        second: "login"
    }

    const mainButtonFunction = () => {
        if (reg) {

            if (passwordValid(password)){
                const registerData =
                    {
                        "firstname" : name,
                        "lastname" : surname,
                        "email" : email,
                        "password" : password
                    }
                axios.post("http://localhost:8080/api/v1/auth/register", registerData)
                    .then(response => {
                        const token = response.data.token
                        console.log(token);
                        localStorage.setItem('token', token)
                    })

                setSec(!sec)
            }
        } else {
            const loginData =
                {
                    "email" : "daulet.zhailau@nu.edu.kz",
                    "password" : "ohio"
                }
            axios.post("http://localhost:8080/api/v1/auth/authenticate", loginData)
                .then(response => {
                    const token = response.data.token
                    console.log(token);
                    localStorage.setItem('token', token)
                })
            setSec(!sec)
        }
    }

    const passwordValid = (password) => {
        if (password.length < 8){
            console.log("Password length must be at least 8!")
            return false
        }

        let upper = 0;
        let int = 0;
        for ( let i = 0; i < password.length; i++){
            if (password[i] == password[i].toUpperCase()){
                upper++
            }

            if (/^\d$/.test(password[i])){
                int++
            }
        }

        if (upper == 0){
            console.log("Password must contain at least 1 Upper case character!")
            return false
        }

        if (int == 0){
            console.log("Password must contain at least 1 number!")
            return false
        }

        return true
    }

    const secondaryButtonFunction = () => {
        setReg(!reg)
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        if (reg) {
            setObj(regObj)
        } else {
            setObj(logObj)
        }
    }, [reg])

    return (
        <>
            <div className={'pagee'}>
                <div className={'mainBlock'}>
                    <div style={{marginTop: "50px"}}>{obj.top}</div>


                    {reg ?
                        <>
                            <div className={'email'}>
                                <div>Username / Email</div>
                                <input className={'basicInput'} onChange={(event) => setEmail((event.target.value))}/>
                            </div>
                            <div className={'name'}>
                                <div>Name</div>
                                <input className={'basicInput'} onChange={(event) => setName(event.target.value)}/>
                            </div>

                            <div className={'name'}>
                                <div>Second Name</div>
                                <input className={'basicInput'} onChange={(event) => setSurname(event.target.value)}/>
                            </div>

                            <div className={'passwordReg'}>
                                <div>Password</div>
                                <input className={'basicInput'} onChange={(event) => setPassword(event.target.value)}/>
                            </div>

                            <div className={'password'}>
                                <div>Repeat the password</div>
                                <input className={'basicInput'} onChange={(event) => setSecure(event.target.value)}/>
                            </div>

                        </>
                        :
                        <>
                            <div className={'email'}>
                                <div>Username / Email</div>
                                <input className={'basicInput'} onChange={(event) => setEmail((event.target.value))}/>
                            </div>

                            <div className={'password'}>
                                <div>Password</div>
                                <input className={'basicInput'} onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                        </>
                    }

                </div>
                <div className={'Buttons'}>
                    <button onClick={() => setSec(!sec)}>cancel</button>
                    <button onClick={mainButtonFunction} className={'mainButton'}>{obj.first}</button>
                </div>

                <div className={'secondaryButton'}>
                    <button onClick={secondaryButtonFunction}>{obj.second}</button>
                </div>


            </div>
        </>
    )
}