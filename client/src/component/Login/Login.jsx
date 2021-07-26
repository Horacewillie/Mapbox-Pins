import { useState } from "react";
import { Room, Cancel } from "@material-ui/icons";
import FormField from "../../utils/Form/FormField";
import { update, generateData, isFormValid } from "../../utils/formActions";
import axios from "axios";
import "./login.css";

const Login = ({setShowLogin, myStorage, setCurrentUser}) => {
  const [state, setState] = useState({
    formError: false,
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
    console.log(dataToSubmit)
    console.log(formIsValid)
    if (formIsValid) {
        console.log('Hey')
      try {
        const res = await axios.post("/api/users/login", dataToSubmit);
        console.log(res)
        if (res.status === 200) {
          myStorage.setItem('user', res.data.username)
          setCurrentUser(res.data.username)
          setShowLogin(false)
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
    <div className="loginContainer">
      <form onSubmit = {(e) => submitForm(e)}className="login_form">
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
          id="password"
          formData={state.formData.password}
          change={(element) => updateForm(element)}
        />
        {state.formError ? (
          <div className="error_label">Please check your data</div>
        ) : null}
        <button className="login_button" onClick={(e) => submitForm(e)}>
          Login
        </button>
      </form>
      <Cancel className = 'login_cancel' onClick = {() => setShowLogin(false)}/>
    </div>
  );
};

export default Login;

