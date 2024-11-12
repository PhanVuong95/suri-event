import axios from "axios";
import React from "react";
import { GetUserInfoReturns } from "zmp-sdk";
import { Avatar, Box, Text } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

interface UserProps {
  user: GetUserInfoReturns["userInfo"];
}

const UserCard: React.FunctionComponent<UserProps> = () => {
  const user = useRecoilValue(userState);

  return (
    <div className="login-page">
      <div className="flex justify-between px-[16px] pt-[25px] header-top">
        <Box>
          <p className="text-sm font-normal text-black">Xin chào!</p>
          <p className="text-base font-bold text-black">
            {" "}
            {user.userInfo.name}
          </p>
        </Box>
        <Avatar
          src={
            user.userInfo.avatar.startsWith("http")
              ? user.userInfo.avatar
              : undefined
          }
        >
          {user.userInfo.avatar}
        </Avatar>
      </div>
    </div>
  );
};

export default UserCard;
