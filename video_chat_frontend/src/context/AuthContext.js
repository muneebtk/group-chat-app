import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Notyf } from "notyf";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );
    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    let navigate = useNavigate();
    let [loginRes, setLoginRes] = useState();
    let [signupRes, setSignupRes] = useState();
    let [createRoomRes, setCreateRoomRes] = useState();
    let [logoutRes, setLogoutRes] = useState()
    const notyf = new Notyf()

    const config = {
        headers: { Authorization: `Bearer ${authTokens ? authTokens.access : null}` }
    };
    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        setUser(null);
        navigate("/");
        setLogoutRes({ message: 'Logout success!', res_type: 'success' })
        notyf.success('Logout success!')

    };
    let loginUser = async (
        email,
        password,
    ) => {
        await axios
            .post("login/", {
                email: email,
                password: password,
            })
            .then((response) => {
                if (response.status === 200) {
                    setAuthTokens(response.data)
                    // setLoginRes({ message: 'Login successful!.', type: 'success' })
                    setUser(jwtDecode(response.data.access));
                    localStorage.setItem("authTokens", JSON.stringify(response.data));
                    navigate("/");
                    notyf.success('Login success!')
                } else {
                    // setLoginRes({ message: response.data.message, type: 'error' });
                    notyf.error('Login failed!')
                }

            })
            .catch((response) => {
                setLoginRes({ message: 'Invalid user credentials.', type: 'error' })
            })
    };
    let SignupUser = async (
        formData

    ) => {
        await axios
            .post("signup/", {
                formData,
            })
            .then((response) => {
                if (response.status === 200) {
                    // setSignupRes({ message: response.data.message, type: 'success' })
                    notyf.success(response.data.data.message)
                    navigate("/login");
                } else {
                    setSignupRes({ message: response.data.message, type: 'error' });
                }
            })
            .catch((response) => {
                // setSignupRes({ message: 'Something went wrong!', type: 'error' })
                notyf.error(response.data.data.message)

            })
    };

    let CreateRoom = async (roomName) => {
        await axios.post('create_room/', { roomName: roomName }, config)
            .then((response) => {
                if (response.status === 201) {
                    // setCreateRoomRes({ message: response.data.data.message, res_type: 'success' })
                    notyf.success(response.data.data.message)
                    navigate(`/chat_dashboard/${response.data.data.roomName}/`)
                } else {
                    // setCreateRoomRes({ message: response.data.data.message, res_type: 'error' })
                    notyf.error(response.data.data.message)

                }
            })
            .catch((response) => {
                // setCreateRoomRes({ message: 'Unauthorized!', res_type: 'error' })
                notyf.error(response.data.data.message)

                setTimeout(() => {
                    if (response.status === 401) {
                        logoutUser()
                    }
                }, 3000);
            })
    }
    let EnterRoom = async (roomName) => {
        await axios.get(`enter_to_room/${roomName}/`, config)
        .then((response) => {
            if (response.status === 200) {
                // setCreateRoomRes({ message: response.data.data.message, res_type: 'success' })
                notyf.success(response.data.data.message)

                navigate(`/chat_dashboard/${roomName}`)
            } else {
                // setCreateRoomRes({message:response.data.data.message, res_type:'error'})
                notyf.error(response.data.data.message)

            }
        })
            .catch((response) => {
                if (response.status === 401) {
                logoutUser()
            }
                // setCreateRoomRes({message:'Something went wrong!', res_type:'error'})
                notyf.error(response.data.data.message)

            })
    }
    let contextData = {
        loginUser: loginUser,
        user: user,
        authTokens: authTokens,
        logoutUser: logoutUser,
        SignupUser: SignupUser,
        loginRes: loginRes,
        signupRes: signupRes,
        CreateRoom: CreateRoom,
        createRoomRes: createRoomRes,
        EnterRoom:EnterRoom,
        // VerifyUser: VerifyUser,
        // resData: resData,
        // signupResSuccess: signupResSuccess,
        // resetPasswordResponseData: resetPasswordResponseData,
        // resetPasswordResponse: resetPasswordResponse,
        // signupResError: signupResError,
        // loading: loading,
    };

    return (
        <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
    );
};