import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Page } from "zmp-ui";
import { BaseURL } from "../configs/base-config";

const DetailGiftPage: React.FunctionComponent = (props) => {
  const { id } = useParams<{ id: string }>();
  const [gift, setGift] = useState([]);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    const token = localStorage.token;

    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/eventGift/api/detail-gift/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGift(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };
  console.log(gift);
  return (
    <Page className="">
      <div className="container">
        {gift?.map((item, i) => {
          const formattedPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.price);
          return (
            <div className="sponsor-container" key={i}>
              <div
                className="sponsor-banner h-[50vh] bg-cover bg-center relative "
                style={{ backgroundImage: `url(${BaseURL}${item.photo})` }}
              >
                <div className="flex items-center max-w-[343px] h-10vh rounded-lg bg-white shadow-md absolute -bottom-10 left-5 ">
                  <div className="info flex flex-col mx-4 my-2">
                    <div className="title text-black font-quicksand font-semibold text-lg">
                      {item.name}
                    </div>
                    <div className="flex items-center  text-black font-quicksand text-base py-4">
                      Giá sản phẩm: {formattedPrice}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-[70px] text-black font-quicksand text-base px-5 text-justify bg-white">
                <div className="font-bold font-quicksand text-center pb-4">
                  Thông tin chi tiết
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

export default DetailGiftPage;
