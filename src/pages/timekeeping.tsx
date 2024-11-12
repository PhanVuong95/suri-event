import React, { useEffect, useState } from "react";
import {
  Sheet,
  Button,
  Page,
  Text,
  useNavigate,
  Avatar,
  List,
  Box,
  Icon,
} from "zmp-ui";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";

import { useRecoilValue } from "recoil";
import { displayNameState, userState } from "../state";
import { Link } from "react-router-dom";
import axios from "axios";
import { closeApp } from "zmp-sdk/apis";

const closeMiniApp = async () => {
  try {
    await closeApp({});
  } catch (error) {
    // Xử lý khi gọi API thất bại
    console.log(error);
  }
};

const TimeKeepingPage: React.FunctionComponent = () => {
  const { userInfo: user } = useRecoilValue(userState);
  const displayName = useRecoilValue(displayNameState);

  const [event, setEvent] = useState([]);

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
      setEvent(data.data);
      // console.log(data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };
  // console.log(event);

  const handleLogout = () => {
    console.log("dang xuat");
    localStorage.removeItem("token");
  };

  const handleButtonClick = async () => {
    await closeMiniApp();
  };

  return (
    <Page className="h-100">
      <div className="border-b pb-[28px] text-center pt-[20px] bg-white rounded-b-lg">
        <span className="text-black text-lg font-bold text-center">
          Tài Khoản
        </span>
      </div>
      {event?.map((item, i) => {
        return (
          <div className="px-5 pt-[85px] flex flex-col gap-5">
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
              <Text.Title className="text-xs text-black font-normal font-sans">
                ---{item.roleName}---
              </Text.Title>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="bg-white rounded-lg px-[18px] py-[14px] flex gap-2.5 items-center">
                <RiAccountCircleLine size={18} />
                <Link
                  to="/user-detail"
                  className="text-base text-black font-normal font-sans"
                >
                  Thông tin của bạn
                </Link>
              </div>
              <div className="bg-white rounded-lg px-[18px] py-[14px] flex gap-2.5 items-center">
                <AiOutlineExclamationCircle size={18} />
                <span className="text-base text-black font-normal font-sans">
                  Chính sách tham gia
                </span>
              </div>
              <div className="bg-white rounded-lg px-[18px] py-[14px] flex gap-2.5 items-center">
                <FaRegTrashCan size={18} />
                <span className="text-base text-black font-normal font-sans">
                  Xóa tài khoản
                </span>
              </div>
              <button
                className="bg-gradient-to-r from-rose-200 to-rose-300 rounded-lg px-[18px] py-[14px] flex gap-2.5 items-center"
                onClick={handleButtonClick}
              >
                <RxExit size={18} color={"white"} />
                <span className="text-base text-white font-normal font-sans">
                  Đăng xuất
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </Page>
  );
};

export default TimeKeepingPage;
