import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import eyeIcon from "../../assets/eye.svg";
import eyeOffIcon from "../../assets/eye-off.svg";
import { login, refreshUser } from "../../redax/auth/operations.js";
import { selectIsLoggedIn } from "../../redax/auth/selectors.js";
import css from "./Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [isLoggedIn, dispatch]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format"
      )
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    trigger,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        reset();
        toast.success("Successfully logged in a user!");
      })
      .catch(() => {
        toast.error("Login failed");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (errors.email) {
      toast.error("Invalid email format - test@example.com");
    }

    if (errors.password) {
      toast.error("Password must be at least 8 characters long");
    }
  }, [errors.email, errors.password]);

  const getInputClass = (fieldName) => {
    return errors[fieldName] ? css.error : "";
  };

  return (
    <div>
      <div className={css.wrap}>
        <div className={css.formSection}>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={css.formTitle}>Log in</h2>
            <div className={css.inputContainer}>
              <label className={css.formLabel}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={getInputClass("email")}
                {...register("email")}
                onBlur={() => trigger("email")}
              />
              {errors.email && (
                <p className={css.errorText}>{errors.email.message}</p>
              )}
            </div>
            <div className={css.inputContainer}>
              <label className={css.formLabel}>Password</label>

              <div className={css.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={getInputClass("password")}
                  {...register("password")}
                  onBlur={() => trigger("password")}
                />
                <img
                  src={showPassword ? eyeIcon : eyeOffIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className={css.togglePassword}
                  onClick={togglePasswordVisibility}
                />
              </div>

              {errors.password && (
                <p className={css.errorText}>{errors.password.message}</p>
              )}
            </div>
            <button
              disabled={!isDirty || !isValid}
              className={css.btnform}
              type="submit"
            >
              Log in
            </button>
            <div>
              <p>Don’t have an account? </p>
              <Link className={css.link} to="/register">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
