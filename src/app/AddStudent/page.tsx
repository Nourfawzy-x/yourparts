"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddTopic() {
  const router = useRouter();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters")
      .required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is required"),
    dateOfAdmission: Yup.date().required("Date of admission is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      dateOfAdmission: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:3000/api/datas", {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          throw new Error("Failed to create a topic");
        }

        const data = await res.json();
        router.refresh();
        router.push("/");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create a topic. Please try again later.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="my-5">
      <div className="mt-4 ms-2 me-3 md:mx-0">
        <label
          htmlFor="name"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Student Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter student name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
      </div>
      <div className="mt-4 ms-2 me-3 md:mx-0">
        <label
          htmlFor="email"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Student Email
        </label>
        <div className="mt-2">
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter student email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>
      </div>
      <div className="mt-4 ms-2 me-3 md:mx-0">
        <label
          htmlFor="phone"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Student Phone
        </label>
        <div className="mt-2">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter student phone"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500">{formik.errors.phone}</div>
          ) : null}
        </div>
      </div>
      <div className="mt-4 ms-2 me-3 md:mx-0">
        <label
          htmlFor="date"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Student Date
        </label>
        <div className="mt-2">
          <input
            type="date"
            id="date"
            name="dateOfAdmission"
            value={formik.values.dateOfAdmission}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          />
          {formik.touched.dateOfAdmission && formik.errors.dateOfAdmission ? (
            <div className="text-red-500">{formik.errors.dateOfAdmission}</div>
          ) : null}
        </div>
      </div>
      <div className="my-3">
        <button
          type="submit"
          className="btn mx-2 bg-green-600 rounded-md px-6 text-center py-3 font-bold text-white shadow-sm hover:bg-white hover:outline-green-600 hover:text-green-600 hover:outline transition-transform"
        >
          Add Student
        </button>
      </div>
    </form>
  );
}
