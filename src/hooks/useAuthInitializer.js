// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../store/authSlice";

// export function useAuthInitializer() {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const user = localStorage.getItem("user");

//         if (token && user) {
//         dispatch(loginSuccess({ token, user: JSON.parse(user) }));
//         }
//     }, [dispatch]);
// }
