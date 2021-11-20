import * as yup from "yup";

yup.setLocale({
    string: {
        min: "5, Password must be at least 7 characters longs",
    },
});

export const schema = yup.object().shape({
    name: yup.string().required("1,Name is required"),
    surname: yup.string().required("2,Last name is required"),
    email: yup.string().email('3,Must be a valid email').required('3,Email is required'),
    phoneNumber: yup.string().optional,
    password: yup.string().min(8),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "6,Passwords must match"),
});
