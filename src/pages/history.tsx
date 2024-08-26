import React, { useEffect } from "react";
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

const HistoryPage: React.FunctionComponent = () => {
  return (
    <Page className="">
      <div className="text-center	header-history border-b-2 border-gray-300 rounded-b-xl">
        <span>Lịch Sử</span>
      </div>
      <div className="p-4 border-b-2 border-gray-300">
        <div className=" flex flex-row gap-2 bg-gray-300 rounded-full">
          <div className="p-4 rounded-full bg-pink-400 text-white">
            Lịch sử tham gia sự kiện
          </div>
          <div className="p-4 rounded-lg ">Lịch sử nhận quà</div>
        </div>
      </div>
    </Page>
  );
};

export default HistoryPage;
