import axios from "axios";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

import FooterPage from "../components/footerPage";
import HeaderPage from "../components/HeaderPage";

const LayoutPage: React.FunctionComponent = (props) => {
  const token = localStorage.token;
  // console.log(token);

  const user = useRecoilValue(userState);
  const users = user.userInfo;
  // console.log(user.userInfo.name);
  const userId = user.userInfo.id;
  // console.log(userId);
  const userName = user.userInfo.name;
  // console.log(users);

  const avatar = user.userInfo.avatar;

  const login = async () => {
    try {
      const { data } = await axios.post(
        `https://checking-event.dion.vn/account/api/login-mini-app`,
        {
          userName: userId,
          name: userName,
        }
      );
      // toast.success("Đăng nhập thành công!");
      console.log("Đăng nhập thành công!");

      // Saving token to cookies
      document.cookie = `Authorization=${data.resources.accessToken}; path=/`;

      // Saving token to local storage
      localStorage.setItem("token", data.resources.accessToken);
      localStorage.setItem("profile", JSON.stringify(data.resources.profile));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      await axios.post(
        "https://checking-event.dion.vn/account/api/UpdateAccount",
        {
          name: userName,
          photo: avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Cập nhập thành công!");
    } catch (error) {
      console.error("Error submitting registration:", error);
      // Xử lý lỗi, hiển thị thông báo cho người dùng, v.v.
    }
  };

  // useEffect(() => {
  //   login();
  //   handleFormSubmit();
  // }, []);

  useEffect(() => {
    const executeAfterLogin = async () => {
      await login();
      setTimeout(() => {
        handleFormSubmit();
      }, 20000);
    };

    executeAfterLogin();
  }, []);

  return (
    <div className="layout bg-[#F9F9F9] min-h-[100vh]">
      <header>
        <HeaderPage />
      </header>
      <main className="pb-[80px] h-[100%] w-[100%]">
        <Outlet />
      </main>
      <footer className="footer" id="footer">
        <FooterPage />
      </footer>
    </div>
  );
};

export default LayoutPage;
