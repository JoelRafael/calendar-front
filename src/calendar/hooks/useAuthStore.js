import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../../api/calendarApi";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../../store/auth/authSlice";
import { onLogoutCalendar } from "../../store/calendar/calendarSlice";

export const useAutStore = () => {
  const { status, user, erroMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("auth", { email, password });
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.data.name, uid: data.data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("auth/new-user", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.data.name, uid: data.data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response?.data.message || "----"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("auth/renew-token");
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.data.name, uid: data.data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar())
    dispatch(onLogout());
  };

  return {
    //* Propiedades
    erroMessage,
    status,
    user,
    //* Metodos
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  };
};
