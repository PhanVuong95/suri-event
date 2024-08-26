import React from "react";
import UserCard from "./user-card";
import { userState } from "../state";
import { useRecoilValue } from "recoil";

const HeaderPage: React.FunctionComponent = (props) => {
  const user = useRecoilValue(userState);

  return <div className="">{/* <UserCard user={user.userInfo} /> */}</div>;
};

export default HeaderPage;
