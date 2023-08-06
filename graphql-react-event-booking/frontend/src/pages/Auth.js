import { useContext, useState } from "react";
import AuthContext from "../context/auth-context";
import "./Auth.css"

function AuthPage() {
  const authContext = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = (event) => {
    event.preventDefault()
    if ([email.trim().length,password.trim().length].includes(0)) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            token
            tokenExpiration
            userId
          }
        }
      `
    }

    if (!isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: { email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!")
      }
      return res.json()
    })
    .then(resData => {
      const {
        data: {
          login: {
            token, 
            userId,
            tokenExpiration
          }
        }
      } = resData
      if (token) {
        authContext.login(token, userId, tokenExpiration)
      }
      console.log(resData)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <form className="pure-form pure-form-stacked" onSubmit={submitHandler}>
      <fieldset>
        <label htmlFor="email">E-Mail</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-Mail" />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="Password" />
        <button type="submit" className="pure-button pure-button-primary">Submit</button>
        <button type="button" onClick={() =>{
          setIsLogin(!isLogin)
        }} className="pure-button pure-button-primary">Switch to {isLogin?"Signup":"Login"}</button>
        
      </fieldset>
    </form>
  );
}

export default AuthPage;
