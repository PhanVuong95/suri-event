import React from "react";
import {
  Page,
  useNavigate,
} from "zmp-ui";
import { Images } from "../assets/images";
const ShareEvent = () => {
  const navigate = useNavigate();
  const imageUrl = Images.event;
  // const gift = Images.gift
  return (
    <Page className="flex justify-center items-center h-screen">
      <div className="container flex justify-center items-center">
        <div className="w-[90vw] h-[95vw] rounded-lg bg-white flex  justify-center items-center grid grid-rows-3">
          <div className="w-[60vw] h-[60vw] rounded-lg absolute top-[20vw] bg-white ">

          </div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </div>
      </div>
    </Page >
  );
};

export default ShareEvent;