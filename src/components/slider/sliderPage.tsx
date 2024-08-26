import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderCard from "./slider-card";
import axios from "axios";

const SliderPage: React.FunctionComponent = (props) => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const { data } = await axios.get(
          "https://checking-event.dion.vn/event/api/ListPagingByStatus?statusId=1001&pageIndex=1&pageSize=10"
        );
        setEvent(data.data);
        // console.log("data", data);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Handle errors appropriately, e.g., display an error message to the user
      }
    };
    getEvent();
  }, []);

  // console.log("event", event);

  return (
    <div className="slider">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={12}
        // loop={true}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
        className="mySwiper"
      >
        {event?.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <SliderCard item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderPage;
