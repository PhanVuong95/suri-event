import React, { useEffect, useRef, useState } from "react";
import { Page, Text, List } from "zmp-ui";
import { closeApp, getAccessToken, getPhoneNumber } from "zmp-sdk";
import { Constant } from "../constants";
import { getPhoneNumberApi } from "../modules/users/src/api";

import { useRecoilValue } from "recoil";
import { GetPhoneNumberReturns } from "zmp-sdk";
import axios from "axios";
import { displayNameState, userStates } from "../state";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
interface PhoneProps {
  phone: GetPhoneNumberReturns["number"];
}

const UpdateAccount: React.FunctionComponent<PhoneProps> = (props) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { userInfo: user } = useRecoilValue(userStates);
  const displayName = useRecoilValue(displayNameState);

  const [event, setEvent] = useState([]);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const getPhone = async () => {
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
        setPhone(phoneReponse.data.number);
      },
      fail: (error) => {
        // Xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    const token = localStorage.token;

    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/account/api/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvent(data.data, { email: data.data.email });
      setEmail(data.data[0].email);
      setPhone(data.data[0].phone);
      setAddress(data.data[0].addressDetail);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };
  console.log(event);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.token;

    if (email != "" || address != "") {
      try {
        await axios.post(
          "https://checking-event.dion.vn/account/api/update-profile-mini-app",
          {
            email: email,
            addressDetail: address,
            phone: phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Cập nhập thành công!");
        navigate(-1);
      } catch (error) {
        console.error("Error submitting registration:", error);
        toast.warn("Cập nhập không thành công!");
        // Xử lý lỗi, hiển thị thông báo cho người dùng, v.v.
      }
    } else {
      // Nếu người dùng không nhập dữ liệu, bạn có thể hiển thị thông báo hoặc thực hiện hành động phù hợp khác
      toast.warn("Vui lòng nhập ít nhất một trường thông tin.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "phone") {
      setPhone(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "address") {
      setAddress(value);
    }
  };

  return (
    <Page className="h-100">
      <div className="border-b pb-[28px] text-center pt-[65px] bg-white rounded-b-lg">
        <h1 className="text-black text-lg font-bold text-center">
          Cập nhập thông tin tài Khoản
        </h1>
      </div>
      {event?.map((item, i) => {
        return (
          <div className="px-5 pt-[60px] flex flex-col gap-5" key={i}>
            <div className="px-24 bg-white rounded-lg flex flex-col text-center items-center pb-5">
              <div className=" bg-white rounded-full p-3 w-32 h-32 mt-[-50px]">
                <img
                  className="object-cover rounded-full"
                  src={user.avatar.startsWith("http") ? user.avatar : undefined}
                />
              </div>
              <Text.Title className="text-xl text-black font-medium font-sans">
                {displayName || user.name}
              </Text.Title>
            </div>
            <form className="flex flex-col" onSubmit={handleFormSubmit}>
              {/* <div className="section-container flex flex-col gap-1">
                <label className="form-label">Số điện thoại:</label>
                <input
                  className="bg-[#fff] pl-[5px] border border-slate-200 rounded-md"
                  type="text"
                  name="phone"
                  value={`+${phone != "" ? phone : ""}`}
                  onChange={handleInputChange}
                  disabled
                />
                {phone == "" ? (
                  <button className="button-click-3" onClick={getPhone}>
                    Cập nhập số điện thoại từ zalo
                  </button>
                ) : (
                  ""
                )}
              </div> */}
              <div className="section-container flex flex-col gap-2">
                <label className="form-label">Gmail:</label>
                <input
                  className="bg-[#fff] pl-[5px] border border-slate-200 rounded-md"
                  type="email"
                  name="email"
                  // value={formData.email}
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="section-container flex flex-col gap-2">
                <label className="form-label">Địa chỉ:</label>
                <input
                  className="bg-[#fff] pl-[5px] border border-slate-200 rounded-md"
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="button-registration">
                Cập nhập thông tin
              </button>
            </form>
          </div>
        );
      })}
    </Page>
  );
};

export default UpdateAccount;
