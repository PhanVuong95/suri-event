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
  // console.log(user.userInfo.name);
  const userId = user.userInfo.id;
  // console.log(userId);
  const userName = user.userInfo.name;
  // console.log(userName);

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

      // Saving token to cookies
      document.cookie = `Authorization=${data.resources.accessToken}; path=/`;

      // Saving token to local storage
      localStorage.setItem("token", data.resources.accessToken);
      localStorage.setItem("profile", JSON.stringify(data.resources.profile));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    login();
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
