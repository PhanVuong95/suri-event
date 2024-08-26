import axios from "axios";
import { saveImageToGallery } from "zmp-sdk/apis";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BaseURL } from "../configs/base-config";
import { displayNameState, userState } from "../state";
import { useRecoilValue } from "recoil";
import { Avatar } from "zmp-ui";
import html2canvas from "html2canvas";
import moment from "moment";
import { toJpeg } from "html-to-image";
import { toast } from "react-toastify";

// import img1 from "./assets/images/event.jpg";

const InvitationTicketPage: React.FunctionComponent = () => {
  const { userInfo: user } = useRecoilValue(userState);
  const displayName = useRecoilValue(displayNameState);

  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any[]>([]);
  const eventDetailId = useRef();
  const [eventDetail, setEventDetail] = useState();
  const [phone, setPhone] = useState();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const ticketRef = useRef<HTMLDivElement>(null); // Specify the type of ref

  const handleDownload = () => {
    // Capture the entire .invitation-ticket-full element
    html2canvas(ticketRef.current as HTMLElement, {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      // Convert canvas to image
      const imageURL = canvas.toDataURL("image/png"); // Change "imagepng" to "image/png"
      // Save the image to gallery
      saveImageToGallery({
        imageUrl: imageURL,
        success: (res) => {
          // Handle success
          // console.log(imageURL);
          console.log("Image saved successfully");
          toast.success("Bạn đã tải ảnh vé thành công!");
        },
        fail: (error) => {
          // Handle failure
          console.log("Error saving image:", error);
          toast.warn(
            "Bạn đã tải ảnh vé không thành công! Vui lòng chụp lại ảnh màn hình vé."
          );
        },
      });
    });
  };

  useEffect(() => {
    fetchEventData();
  }, []);
  const fetchEventDataDetail = async () => {
    const token = localStorage.token;
    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/eventaccount/api/Detail/${eventDetailId.current}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventDetail(data.data);
      setPhone(data.data[0].phone);
      // console.log("ssssss", data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const fetchEventData = async () => {
    const token = localStorage.token;

    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/eventaccount/api/detail-event-account/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvent(data.data);

      eventDetailId.current = data.data[0].id;
      fetchEventDataDetail();
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  // console.log(event);

  return (
    <div>
      <div className="header-top-1">
        <button className="back-header" onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={6}
            height={14}
            viewBox="0 0 6 14"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.39402 0.523893C5.70766 0.8239 5.75851 1.37111 5.5076 1.74612L1.99229 6.99998L5.5076 12.2538C5.75851 12.6289 5.70766 13.1761 5.39402 13.4761C5.08037 13.7761 4.62271 13.7153 4.37179 13.3403L0.493027 7.54319C0.280537 7.22561 0.280537 6.77435 0.493027 6.45677L4.37179 0.659696C4.62271 0.284687 5.08037 0.223886 5.39402 0.523893Z"
              fill="black"
            />
          </svg>
        </button>
        <div className="w-[80%]">
          <h1 className="text-black text-lg font-bold text-center">Vé mời</h1>
        </div>
      </div>
      {event.map((item, i) => {
        const qr = item.info;
        // console.log(item);
        const formattedDate = moment(item.startDate).format("DD.MM.YYYY");

        const formattedStart = moment(item.startDate).format("HH:mm");
        const formattedEnd = moment(item.endDate).format("HH:mm");

        return (
          <div
            ref={ticketRef}
            className="p-4 flex flex-col gap-2 invitation-ticket-full"
            key={i}
          >
            <div className="invitation-ticket">
              <div className="invitation-ticket-banner">
                <img src={item.eventBannerBase64} />

                <div>
                  <div className="invitation-ticket-avatar rounded-full">
                    <img
                      className="rounded-full"
                      src={
                        user.avatar.startsWith("http") ? user.avatar : undefined
                      }
                    />
                  </div>
                  <div className="invitation-ticket-banner-title">
                    <h2 className="text-white text-lg font-bold text-center text-with-shadow">
                      {displayName || user.name}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="invitation-ticket-title">
                <div className="invitation-ticket-title-top">
                  <h1>{item.eventName}</h1>
                  <p className="text-title-top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={13}
                      viewBox="0 0 12 13"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_109_2033)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.99963 1.03748C3.60433 1.03748 1.65674 2.98507 1.65674 5.38037C1.65674 6.60296 2.30527 7.79686 3.13238 8.9588C3.95948 10.1207 4.97974 11.2577 5.78333 12.3292C5.87344 12.449 6.04362 12.4731 6.16344 12.383C6.18382 12.3676 6.20193 12.3495 6.21725 12.3292C7.02085 11.2577 8.04084 10.1207 8.86794 8.9588C9.69505 7.79686 10.3428 6.60296 10.3428 5.38037C10.3428 2.98507 8.39493 1.03748 5.99963 1.03748ZM6.00016 3.20866C7.19942 3.20866 8.17161 4.18085 8.17161 5.3801C8.17161 6.57936 7.19942 7.55155 6.00016 7.55155C4.8009 7.55155 3.82871 6.57936 3.82871 5.3801C3.82871 4.18085 4.8009 3.20866 6.00016 3.20866Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_109_2033">
                          <rect
                            width={12}
                            height={12}
                            fill="white"
                            transform="translate(0 0.737427)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>{item.eventInfo}</p>
                  </p>
                  <div className="text-title-bot items-center">
                    <p className="text-title-bot-left">{formattedDate}</p>
                    <p className="text-title-bot-right">
                      {formattedStart} - {formattedEnd}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="invitation-ticket-title-bot justify-between">
                <div className="w-[100%]">
                  <div className="invitation-ticket-title-bot-top flex justify-between items-center">
                    <div>
                      <p className="invitation-ticket-title-bot-title">
                        Họ và tên
                      </p>
                      <div className="invitation-ticket-title-bot-name-code">
                        <h2 className="invitation-ticket-title-bot-name">
                          {/* {item.accountName} */}
                          {displayName || user.name}
                        </h2>
                      </div>
                    </div>
                    <img
                      className="rounded-full avata-zalo"
                      src={
                        user.avatar.startsWith("http") ? user.avatar : undefined
                      }
                    />
                  </div>
                  <div className="invitation-ticket-title-bot-bop">
                    <p className="invitation-ticket-title-bot-title">
                      Số điện thoại
                    </p>
                    <div className="invitation-ticket-title-bot-phone-it w-[100%]">
                      <h2 className="invitation-ticket-title-bot-phone">
                        +{phone}
                      </h2>
                      <p className="invitation-ticket-title-bot-it">
                        Hạng vé: <span>{item.eventAccountTypeName}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="invitation-ticket-qr">
              <img src={qr} alt="QR Code" /> {/* Provide alt attribute */}
              <div className="invitation-ticket-qr-download">
                <p>Vui lòng sử dụng mã bên cạnh để check in sự kiện.</p>
                <button onClick={handleDownload}>Tải xuống</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvitationTicketPage;
