/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

export const LoginRoute = styled.div`
  height: 100vh;
  background-image: url('https://assets.ccbp.in/frontend/react-js/spotify-remix-login-bg.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    .main-container {
      background-image: url('https://res.cloudinary.com/dgga8cymk/image/upload/v1710133018/Spotify/Login/login-bg-sm_myymdy.png');
    }
  }
`
export const LoginFormContainer = styled.div`
  background: rgba(24, 24, 24, 0.92);
  border: solid 2px #18181833;
  border-radius: 15px;
  box-shadow: 0 4px 16px 0 #272727;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  padding: 29px 13px;
  @media (min-width: 768px) {
    .login-form-container {
      width: 446px;
      height: 390px;
      justify-content: space-around;
    }
  }
`
export const AppTitleCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const LoginImg = styled.img`
  width: 90%;
  @media (max-width: 568px) {
    .app-logo {
      width: 70%;
    }
  }
`

export const Heading = styled.h2`
  color: #ffffff;
  margin-top: 5px;
  font-weight: 600;
  @media (max-width: 576px) {
    .title {
      font-size: 19px;
    }
  }
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: transparent;
  width: 80%;
  height: 175px;
  @media (max-width: 576px) {
    .login-form {
      justify-content: center;
      height: auto;
    }
  }
  @media (min-width: 768px) {
    .login-form {
      height: 75%;
    }
  }
`
export const LoginLabel = styled.label`
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  margin-top: 15px;
  @media (max-width: 576px) {
    .label {
      font-size: 10px;
    }
  }
  @media (min-width: 768px) {
    .label {
      font-size: 15px;
    }
  }
`

export const Input = styled.input`
  height: 29px;
  width: 100%;
  border: solid 1px #d9d9d970;
  border-radius: 4px;
  background-color: #d9d9d9;
  outline: none;
  font-size: 12px;
  font-weight: 600;
  padding-left: 13px;
  @media (max-width: 576px) {
    .input {
      height: 21px;
      margin-top: 0;
    }
  }

  @media (min-width: 768px) {
    .input {
      height: 35px;
    }
  }
`
