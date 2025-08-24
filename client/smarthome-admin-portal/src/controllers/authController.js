import { register, login } from "../services/authService";
import { toast } from "react-toastify";

const getErrorMessage = (err) => {
  if (Array.isArray(err.response?.data?.detail)) {
    return err.response.data.detail[0]?.msg || "Unknown error";
  }
  if (typeof err.response?.data?.detail === "string") {
    return err.response.data.detail;
  }
  return err.message;
};

export const handleRegister = async (formData, navigate) => {
  try {
    await register(formData);
    toast.success("Register successful! Please login.");
    navigate("/auth/login");
  } catch (err) {
    toast.error(`Register failed: ${getErrorMessage(err)}`);
  }
};

export const handleLogin = async (formData, navigate) => {
  try {
    const data = await login(formData);
    localStorage.setItem("token", data.access_token);
    toast.success("Login successful!");
    navigate("/dashboard");
  } catch (err) {
    toast.error(`Login failed: ${getErrorMessage(err)}`);
  }
};
