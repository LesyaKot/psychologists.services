import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Time from "../Time/Time";
import css from "./Appointment.module.css";

export default function Appointment({ psychologist }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      time: "",
      comment: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      time: Yup.string().required("Required"),
    }),

    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);
      toast.success("Appointment request sent successfully!");
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <>
      <h1>Make an appointment with a psychologists</h1>
      <p>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <img src={psychologist.avatar_url} alt={psychologist.name} />
      <p>Your psychologists</p>
      <p>{psychologist.name}</p>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}

          <div>
            <input
              placeholder="+380"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && formik.errors.phone}
            />

            <Time
              name="time"
              value={formik.values.time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.time && formik.errors.time ? (
              <div>{formik.errors.time}</div>
            ) : null}
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}

          <input
            rows="4"
            placeholder="Comment"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="submit"  disabled={formik.isSubmitting}>
            Send
          </button>
        </form>
      </div>
    </>
  );
}
