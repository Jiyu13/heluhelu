// import styled from "styled-components";
// import { useState } from "react";

// import { LoginPage } from "./LoginPage";
// import { SignupPage } from "./SignupPage";

// import { ForgetPassword } from "../forget-password/ForgetPassword";



// export function AccountBox() {
//     const [errors, setErrors] = useState(null)
//     const [isLogin, setLogin] = useState("login")
//     const [visible, setVisible] = useState(false)

//     function ToggleIcon() {
//         setVisible(!visible)
//     }


//     function handleToSignup() {
//         setLogin("signup")
//     }

//     function handleToLogin() {
//         setLogin("login")
//     }

//     function handleToForgetPw() {
//         console.log("click forget password")
//         setLogin("forget-password")
//     }

//     return (
//         <AppContainer>
//             {
//                 errors && (
//                     <EmptyDiv onClick={() => setErrors(null)}/>

//                 )
//             }
//             {/* {
//                 isLogin=== "login" ? 
//                 <LoginPage handleToSignup={handleToSignup} errors={errors} setErrors={setErrors} ToggleIcon={ToggleIcon} visible={visible}/>
//                 :
//                 <SignupPage handleToLogin={handleToLogin} ToggleIcon={ToggleIcon} visible={visible}/>
            
//             } */}

//             {isLogin === "login" && (
//                 <LoginPage 
//                     handleToSignup={handleToSignup}
//                     handleToForgetPw={handleToForgetPw}
//                     errors={errors} 
//                     setErrors={setErrors} 
//                     ToggleIcon={ToggleIcon} 
//                     visible={visible}
//                 />
//             )} 

//             {isLogin === "signup" && (
//                 <SignupPage handleToLogin={handleToLogin} ToggleIcon={ToggleIcon} visible={visible}/>
//             )}

//             {isLogin === "forget-password" && (
//                 <ForgetPassword handleToLogin={handleToLogin} handleToSignup={handleToSignup}/>
//             )}
//         </AppContainer>
//     )
// }

// const EmptyDiv = styled.div`
//     width: 100%; 
//     height: 100%;
//     position: fixed;
// `

// const AppContainer = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     min-height: 100vh;
//     width: 100%;

//     background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%),-moz-linear-gradient(top,  rgba(57,173,219,.25) 0%, rgba(42,60,87,.4) 100%), -moz-linear-gradient(-45deg,  #670d10 0%, #092756 100%);
//     background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -webkit-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -webkit-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
//     background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -o-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -o-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
//     background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -ms-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -ms-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
//     background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg,  #670d10 0%,#092756 100%);
//     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3E1D6D', endColorstr='#092756',GradientType=1 );
// `;