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
    <div className={css.wrap}>
      <h2 className={css.title}>Log in</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.label}>Email</label>
        <input className={css.input} type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <div className={css.passwordContainer}>
          <label className={css.label}>Password</label>
          <input
            className={css.input}
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <img
            className={css.eyeIcon}
            src={showPassword ? eyeIcon : eyeOffIcon}
            alt="Toggle visibility"
            onClick={togglePasswordVisibility}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button className={css.btn} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
