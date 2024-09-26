import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { register } from "../../redax/auth/operations";
import css from "./Register.module.css";

export default function Register() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name can't be more than 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...submitData } = data;
    const { name, email, password } = submitData;

    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        reset();
        toast.success("Welcome to Psychologists.services!");
      })
      .catch(() => {
        toast.error("Registration failed");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (errors.email) {
      toast.error("Invalid email format - test@example.com");
    }
    if (errors.password) {
      toast.error("Password must be at least 8 characters long");
    }
    if (errors.confirmPassword) {
      toast.error("Passwords must match");
    }
  }, [errors]);

  return (
    <div>
      <div className={css.wrap}> 
        <div className={css.formSection}>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={css.formTitle}>Registration</h2>
            <div className={css.inputWrap}>
              <label className={css.inputLabel}>Name</label>
              <input
                type="text" 
                placeholder="Enter your name"
                {...register("name")}
                className={`${css.input} ${errors.name ? css.errorInput : ""}`}
              />
            </div>

            <div className={css.inputWrap}>
              <label className={css.inputLabel}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={`${css.input} ${errors.email ? css.errorInput : ""}`}
              />
              {errors.email && (
                <p className={css.errorText}>{errors.email.message}</p>
              )}
            </div>

            <div className={css.inputWrap}>
              <label className={css.inputLabel}>Password</label>
              <div className={css.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`${css.input} ${errors.password ? css.errorInput : ""}`}
                />
                <svg
                  width="20"
                  height="20"
                  className={css.togglePassword}
                  onClick={togglePasswordVisibility}
                >
                  <use
                    xlinkHref={`${sprite}#${showPassword ? "icon-eye" : "icon-eye-off"}`}
                  />
                </svg>
              </div>
              {errors.password && (
                <p className={css.errorText}>{errors.password.message}</p>
              )}
            </div>
            <div className={css.inputWrap}>
              <label className={css.inputLabel}>Confirm Password</label>
              <div className={css.inputWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  className={`${css.input} ${errors.confirmPassword ? css.errorInput : ""}`}
                />
                <svg
                  width="20"
                  height="20"
                  className={css.togglePassword}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <use
                    xlinkHref={`${sprite}#${showConfirmPassword ? "icon-eye" : "icon-eye-off"}`}
                  />
                </svg>
              </div>
              {errors.confirmPassword && (
                <p className={css.errorText}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              disabled={!isDirty || !isValid}
              className={css.submitButton}
              type="submit"
            >
              Registration
            </button>
            <div className={css.signInPrompt}>
              <p>Already have an account? </p>
              <Link className={css.signInLink} to="/login">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
