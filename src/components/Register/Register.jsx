import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import eyeIcon from "../../assets/eye.svg";
import eyeOffIcon from "../../assets/eye-off.svg";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import css from "./Register.module.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      reset();
      toast.success("Welcome to Psychologists.services!");

      navigate("/psychologists");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed: " + error.message);
    }
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
    <>
      <div className={css.wrap}>
        <div className={css.formSection}>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={css.title}>Registration</h2>
            <p className={css.text}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>

            <div className={css.inputWrap}>
              <input
                placeholder="Name"
                type="text"
                className={`${css.inputField} ${
                  errors.name ? css.errorInput : ""
                }`}
              />
              {errors.name && (
                <p className={css.errorText}>{errors.name.message}</p>
              )}

              <input
                placeholder="Email"
                type="email"
                className={`${css.inputField} ${
                  errors.email ? css.errorInput : ""
                }`}
              />
              {errors.email && (
                <p className={css.errorText}>{errors.email.message}</p>
              )}

              <div className={css.inputContainer}>
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className={`${css.inputField} ${
                    errors.password ? css.errorInput : ""
                  }`}
                />
                <img
                  className={css.eyeIcon}
                  src={showPassword ? eyeIcon : eyeOffIcon}
                  alt="Toggle visibility"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errors.password && (
                <p className={css.errorText}>{errors.password.message}</p>
              )}

              <div className={css.inputContainer}>
                <input
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`${css.inputField} ${
                    errors.confirmPassword ? css.errorInput : ""
                  }`}
                />
                <img
                  className={css.eyeIcon}
                  src={showConfirmPassword ? eyeIcon : eyeOffIcon}
                  alt="Toggle visibility"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
              {errors.confirmPassword && (
                <p className={css.errorText}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              disabled={!isDirty || !isValid}
              className={css.btn}
              type="submit"
            >
              Sign up
            </button>

            <div className={css.signInPrompt}>
              <p>Already have an account?</p>
              <Link className={css.signInLink} to="/login">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
