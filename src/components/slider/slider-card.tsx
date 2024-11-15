import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { BaseURL } from "../../configs/base-config";

const SliderCard: React.FunctionComponent = (props) => {
  const { item } = props;

  // Sử dụng dữ liệu event
  const eventTitle = item.name;
  const eventDate = item.startDate;
  const eventLocation = item.info;
  const eventDescription = item.description;
  const eventAvatar = item.photo;

  // Format the date
  const formattedDate = moment(eventDate).format("DD.MM.YYYY - HH:mm");

  // console.log(eventAvatar);

  return (
    <div className="card-slider">
      <img src={`${BaseURL}${item.photo}`} className="card-slider-img" />
      <div className="car-slider-title flex flex-col gap-2 bg-[#fff] p-[13px]">
        <h2 className="text-black text-lg font-bold">{eventTitle}</h2>
        <p className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <g clipPath="url(#clip0_109_118)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.59991 0.93663C4.8054 0.93663 2.5332 3.20882 2.5332 6.00334C2.5332 7.4297 3.28983 8.82258 4.25478 10.1782C5.21974 11.5338 6.41004 12.8602 7.34756 14.1103C7.45269 14.25 7.65123 14.2782 7.79103 14.173C7.8148 14.1552 7.83593 14.134 7.8538 14.1103C8.79133 12.8602 9.98132 11.5338 10.9463 10.1782C11.9112 8.82258 12.6669 7.4297 12.6669 6.00334C12.6669 3.20882 10.3944 0.93663 7.59991 0.93663ZM7.60053 3.46967C8.99966 3.46967 10.1339 4.6039 10.1339 6.00303C10.1339 7.40216 8.99966 8.53638 7.60053 8.53638C6.2014 8.53638 5.06718 7.40216 5.06718 6.00303C5.06718 4.60389 6.2014 3.46967 7.60053 3.46967Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_109_118">
                <rect
                  width="14"
                  height="14"
                  fill="white"
                  transform="translate(0.600098 0.586624)"
                />
              </clipPath>
            </defs>
          </svg>
          <span>{eventLocation}</span>
        </p>
        <div className="flex items-center justify-between">
          <h3 className="car-slider-title-time">{formattedDate}</h3>
          <Link to={`event/${item.id}`}>
            <button className="button-click">Tham gia</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
