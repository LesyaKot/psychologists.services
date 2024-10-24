import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import toast from "react-hot-toast";
import eyeIcon from "../../assets/eye.svg";
import eyeOffIcon from "../../assets/eye-off.svg";
import css from "./Login.module.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const onSubmit = async (data) => {
  //   const { email, password } = data;
  //   const auth = getAuth();

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     localStorage.setItem("isAuthenticated", "true");
  //     toast.success("Successfully logged in!");
  //     reset();
  //     navigate("/psychologists");
  //     window.location.reload();
  //   } catch (error) {
  //     toast.error(`Login failed: ${error.message}`);
  //   }
  // };
  const onSubmit = async (data) => {
    const { email, password } = data;
    const auth = getAuth();
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuthenticated", "true");      
      localStorage.removeItem("favorites");      
      toast.success("Successfully logged in!");
      reset();
      navigate("/psychologists");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Log in</h2>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <img
            src={showPassword ? eyeIcon : eyeOffIcon}
            alt="Toggle visibility"
            onClick={togglePasswordVisibility}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
