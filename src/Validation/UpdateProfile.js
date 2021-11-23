import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup.string().required("1,Name is required"),
    surname: yup.string().required("2,Last name is required"),
    phoneNumber: yup.string().optional(),
    newPassword: yup.string().optional(),
    confirmPassword: yup.string().oneOf([yup.ref("newPassword"), null], "4,Passwords must match"),
});
