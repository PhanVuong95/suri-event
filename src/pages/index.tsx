import React, { useEffect, useState } from "react";
import { List, Page, Icon, useNavigate, Slider } from "zmp-ui";
import BannerPage from "../components/BannerPage";
import UserCard from "../components/user-card";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import SliderPage from "../components/slider/sliderPage";
import axios from "axios";
import { Link } from "react-router-dom";
import { BaseURL } from "../configs/base-config";
import { closeApp } from "zmp-sdk/apis";

interface Sponsor {
  id: number;
  photo: string;
  name: string;
  description: string;
}

const HomePage: React.FunctionComponent = () => {
  const user = useRecoilValue(userState);

  const [sponsor, setSponsor] = useState<Sponsor[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/sponsor/api/listPaging?pageIndex=1&pageSize=6`
      );
      setSponsor((prevEvent) => [...prevEvent, ...data.data]);
      // console.log(data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // console.log(sponsor);

  const closeMiniApp = async () => {
    try {
      await closeApp({});
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  return (
    <Page className="">
      <UserCard user={user.userInfo} />
      <BannerPage />
      <div className="even-home">
        <div className="pt-4 flex items-center justify-between p-4">
          <h2 className="text-black text-lg font-bold">Sự kiện nổi bật</h2>
          <Link to="event">
            <button className="button-click">Xem thêm</button>
          </Link>
        </div>
        <div className="">
          <SliderPage />
        </div>
      </div>
      <div className="donors-home px-4">
        <div className="pt-4 flex items-center justify-between">
          <h2 className="text-black text-lg font-bold">
            Danh sách nhà tài trợ
          </h2>
          <Link to="list-sponsor">
            <button className="button-click">Xem thêm</button>
          </Link>
        </div>
        <div className="donors-home-list-card py-5 grid grid-cols-2 gap-2 sm:gap-4 ">
          {sponsor?.map((item, i) => {
            return (
              <Link key={i} to={`sponsor/${item.id}`}>
                <div className="donors-home-card ">
                  <div className="sponsor-card">
                    <img src={`${BaseURL}${item.photo}`} />
                  </div>
                  <div className="donors-home-card-text p-[11px] text-center">
                    <h2 className="text-black text-base font-bold">
                      {item.name}
                    </h2>
                    <p className="text-black text-sm font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
