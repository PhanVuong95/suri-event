import axios from "axios";
import React from "react";
import { GetUserInfoReturns } from "zmp-sdk";
import { Avatar, Box, Text } from "zmp-ui";

interface UserProps {
  user: GetUserInfoReturns["userInfo"];
}

const UserCard: React.FunctionComponent<UserProps> = ({ user }) => {
  return (
    <div className="login-page">
      <div className="flex justify-between px-[16px] pt-[25px] header-top">
        <Box>
          <p className="text-sm font-normal text-black">Xin chào!</p>
          <p className="text-base font-bold text-black"> {user.name}</p>
        </Box>
        <Avatar src={user.avatar.startsWith("http") ? user.avatar : undefined}>
          {user.avatar}
        </Avatar>
      </div>
    </div>
  );
};

export default UserCard;
