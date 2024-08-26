import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { closeApp, getAccessToken, getPhoneNumber } from "zmp-sdk";
import { Constant } from "../constants";
import { getPhoneNumberApi } from "../modules/users/src/api";
import { userState } from "../state";

const LoginPage: React.FunctionComponent = ({ onClose, item }) => {
  const users = useRecoilValue(userState);
  const user = users.userInfo;
  const name = users.userInfo.name;

  const [errorOccurred, setErrorOccurred] = useState(false);

  const navigate = useNavigate();
  const [temp, setTemp] = useState(true);

  const phone = useRef(null);

  // useEffect(() => {
  //   login();
  // }, []);

  // const login = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       `https://checking-event.dion.vn/account/api/login-mini-app`,
  //       {
  //         userName: "84978802397",
  //         phone: "84978802397",
  //         name: "Cường",
  //       }
  //     );
  //     toast.success("Đăng nhập thành công!");

  //     // Saving token to cookies
  //     document.cookie = `Authorization=${data.resources.accessToken}; path=/`;

  //     // Saving token to local storage
  //     localStorage.setItem("token", data.resources.accessToken);
  //     localStorage.setItem("profile", JSON.stringify(data.resources.profile));
  //     navigate(`/dk/${item.id}`);
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };

  const login = async () => {
    try {
      getPhoneNumber({
        success: async (data) => {
          let { token } = data;
          const accessToken = await getAccessToken({});
          const phoneReponse = await getPhoneNumberApi(
            {},
            {
              access_token: accessToken,
              code: token,
              secret_key: Constant.secret_key,
            }
          );

          // console.log("phoneReponse", phoneReponse);
          phone.current = phoneReponse.data.number;
          if (phone.current) {
            const { data } = await axios.post(
              `https://checking-event.dion.vn/account/api/login-mini-app`,
              {
                userName: phone.current,
                phone: phone.current,
                name: name,
              }
            );
            setTemp(!temp);
            // console.log(data.resources);

            // Saving token to cookies
            document.cookie = `Authorization=${data.resources.accessToken}; path=/`;

            // Saving token to local storage
            localStorage.setItem("token", data.resources.accessToken);
            localStorage.setItem(
              "profile",
              JSON.stringify(data.resources.profile)
            );
            navigate(`/dk/${item.id}`);
          }
        },
        fail: (error) => {
          // Xử lý khi gọi api thất bại
          console.log(error);
          setErrorOccurred(true);
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg login-div">
        <div className="login-div-top">
          <img
            className="img-logo"
            src="https://photo-logo-mapps.zadn.vn/258d99083c4dd5138c5c.jpg"
          />
        </div>
        <div className="login-div-center">
          <h2 className="text-lg font-bold text-black">
            Cho phép xác nhận số điện thoại để chúng tôi có thể phục vụ qúy
            khách tốt nhất.
          </h2>
        </div>

        <div className="login-div-bot">
          <button
            className="login-div-bot-button login-div-bot-button-1 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Để sau
          </button>
          <button
            className="login-div-bot-button login-div-bot-button-2 px-4 py-2 rounded-md"
            onClick={login}
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
