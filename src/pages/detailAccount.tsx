import React, { useEffect, useState } from "react";
import { Page, Text, List } from "zmp-ui";

import { useRecoilValue } from "recoil";
import { GetPhoneNumberReturns } from "zmp-sdk";
import axios from "axios";
import { displayNameState, userStates } from "../state";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
interface PhoneProps {
  phone: GetPhoneNumberReturns["number"];
}

const DetailAccountPage: React.FunctionComponent<PhoneProps> = (props) => {
  const navigate = useNavigate();
  const { userInfo: user } = useRecoilValue(userStates);
  const displayName = useRecoilValue(displayNameState);

  const [account, setAccount] = useState([]);

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
      setAccount(data.data, { email: data.data.email });
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };
  // console.log(account);

  return (
    <Page className="h-100">
      <div className="border-b pb-[28px] text-center pt-[65px] bg-white rounded-b-lg">
        <h1 className="text-black text-lg font-bold text-center">
          Thông tin tài Khoản
        </h1>
      </div>
      {account?.map((item, i) => {
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
            <div className="flex flex-col">
              {/* <div className="section-container flex flex-row items-center gap-1">
                <label className="form-label">Số điện thoại:</label>
                <Text.Title className="text-lg text-black font-medium font-sans">
                  {account[0].phone}
                </Text.Title>
              </div> */}
              <div className="section-container flex flex-row items-center gap-2">
                <label className="form-label">Gmail:</label>
                <Text.Title className="text-lg text-black font-medium font-sans">
                  {account[0].email}
                </Text.Title>
              </div>
              <div className="section-container flex flex-row items-center gap-2">
                <label className="form-label">Địa chỉ:</label>
                <Text.Title className="text-lg text-black font-medium font-sans">
                  {account[0].addressDetail}
                </Text.Title>
              </div>
              <Link to="/user-update">
                <button type="submit" className="button-registration">
                  Cập nhập thông tin
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </Page>
  );
};

export default DetailAccountPage;
