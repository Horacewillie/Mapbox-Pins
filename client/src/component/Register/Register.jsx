import { useState } from "react";
import { Room, Cancel } from "@material-ui/icons";
import FormField from "../../utils/Form/FormField";
import { update, generateData, isFormValid } from "../../utils/formActions";
import axios from "axios";
import "./register.css";

const Register = ({ setShowRegister }) => {
  const [state, setState] = useState({
    formError: false,
    formSucess: false,
    formData: {
      username: {
        element: "input",
        value: "",
        config: {
          name: "username_input",
          type: "username",
          placeholder: "Enter your username",
        },
        validation: {
          required: true,
          username: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
          password: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  });

  const updateForm = (element) => {
    const newFormData = update(element, state.formData, "register");

    setState({
      formError: false,
      formSuccess: "",
      formData: newFormData,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let dataToSubmit = generateData(state.formData, "login");
    let formIsValid = isFormValid(state.formData, "login");
    if (formIsValid) {
      try {
        const res = await axios.post("/api/users/register", dataToSubmit);
        if (res.data.success) {
          setState({
            ...state,
            formSuccess: true,
          });
          setTimeout(() => {
            setShowRegister(false);
          }, 2000);
        }
      } catch (err) {
        setState({
          ...state,
          formError: true,
        });
      }
    } else {
      setState({
        ...state,
        formError: true,
      });
    }
  };

  return (
    <div className="registerContainer">
      <form className="register_form">
        <div className="logo">
          <Room />
          Travel Pin
        </div>
        <FormField
          id="username"
          formData={state.formData.username}
          change={(element) => updateForm(element)}
        />
        <FormField
          id="email"
          formData={state.formData.email}
          change={(element) => updateForm(element)}
        />
        <FormField
          id="password"
          formData={state.formData.password}
          change={(element) => updateForm(element)}
        />
        {state.formError ? (
          <div className="error_label">Please check your data</div>
        ) : null}
        {state.formSuccess ? (
          <div className="success_label">
            Registration Successful, Please Login
          </div>
        ) : null}
        <button className="register_button" onClick={(e) => submitForm(e)}>
          Register
        </button>
      </form>
      <Cancel
        className="register_cancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Register;
