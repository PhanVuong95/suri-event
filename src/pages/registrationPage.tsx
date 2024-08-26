import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface FormData {
  username: string;
  gmail: string;
  address: string;
  typeAccount: string;
  expectedDueDate: string;
  motherType: string;
  notes: string;
  phone: string; // Added phone field
}

interface Event {
  startDate: string;
  name: string;
  info: string;
  eventStatusName: string;
}

const RegistrationPage: React.FunctionComponent = (props) => {
  const { userInfo: user } = useRecoilValue(userState);
  const nameProfile = user.name;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event[]>([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: nameProfile,
      gmail: "",
      address: "",
      typeAccount: "",
      expectedDueDate: "",
      motherType: "1",
      notes: "",
      phone: "", // Added default value for phone field
    },
  });

  useEffect(() => {
    const profile = localStorage.profile;
    let nameProfile = "";
    try {
      nameProfile = JSON.parse(profile).name;
    } catch (error) {
      nameProfile = "";
    }
    setValue("username", nameProfile);
  }, [setValue]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://api.example.com/events/${id}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
    const token = localStorage.token;

    // Check if expectedDueDate is in the past
    if (moment(formData.expectedDueDate).isBefore(moment(), "day")) {
      toast.warn("Ngày dự kiến sinh không được là ngày trong quá khứ!");
      return;
    }

    try {
      console.log({
        name: nameProfile,
        note: formData.expectedDueDate,
        description: formData.notes,
        gmail: formData.gmail,
        typeAccount: formData.motherType,
        address: formData.address,
        eventId: id,
        phone: formData.phone,
        eventAccountTypeId: 1001,
      });

      await axios.post(
        "https://checking-event.dion.vn/eventAccount/api/add-event",
        {
          name: nameProfile,
          note: formData.expectedDueDate,
          description: formData.notes,
          gmail: formData.gmail,
          typeAccount: formData.motherType,
          address: formData.address,
          eventId: id,
          phone: formData.phone,
          eventAccountTypeId: 1001,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Đăng ký sự kiện thành công!");
      navigate(`/invitation-ticket/${id}`);
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.warn("Đăng ký sự kiện không thành công!");
    }
  };

  return (
    <div>
      <div className="header-top-1">
        <button className="back-header" onClick={() => navigate(-1)}>
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
          <h1 className="text-black text-lg font-bold text-center">
            Đăng ký tham gia
          </h1>
        </div>
      </div>
      <div className="information-event">
        {event?.map((item, i) => {
          const formattedDate = moment(item.startDate).format(
            "DD.MM.YYYY - HH:mm"
          );
          return (
            <div
              key={i}
              className="information-event-title flex flex-col gap-2 bg-[#fff] p-[13px]"
            >
              <h2 className="text-black text-lg font-bold">{item.name}</h2>
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
                <span>{item.info}</span>
              </p>
              <div className="flex items-center justify-between">
                <h3 className="car-slider-title-time">{formattedDate}</h3>
                <p>{item.eventStatusName}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-lg font-bold border-custom p-4 max-w-[359px] m-auto">
        Thông tin của bạn
      </div>
      <div className="information-registration px-4 py-1">
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            {...register("username")}
            className="input-event-user"
            placeholder="Tên của bạn*"
            disabled
          />
          <input
            type="text"
            {...register("phone", {
              required: "Số điện thoại là bắt buộc",
              pattern: {
                value: /^\d{10,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
              minLength: {
                value: 10,
                message: "Số điện thoại phải có ít nhất 10 chữ số",
              },
              maxLength: {
                value: 11,
                message: "Số điện thoại không được quá 11 chữ số",
              },
            })}
            className="input-event-user"
            placeholder="Số điện thoại*"
          />
          {/* Display phone input error message */}
          {errors.phone && (
            <p className="error-message">{errors.phone.message}</p>
          )}
          <input
            type="email"
            {...register("gmail", {
              required: "Email là bắt buộc",
              pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" },
            })}
            className="input-event-user"
            placeholder="Email*"
          />
          {errors.gmail && (
            <p className="error-message">{errors.gmail.message}</p>
          )}

          <input
            type="text"
            {...register("address", { required: "Địa chỉ là bắt buộc" })}
            className="input-event-user"
            placeholder="Địa chỉ*"
          />
          {errors.address && (
            <p className="error-message">{errors.address.message}</p>
          )}
          <Controller
            name="motherType"
            control={control}
            render={({ field }) => (
              <select {...field} className="input-event-user">
                <option value="1">Mẹ bầu</option>
                <option value="2">Mẹ bỉm</option>
              </select>
            )}
          />

          {watch("motherType") === "1" && (
            <>
              <input
                type="date"
                {...register("expectedDueDate", {
                  required: "Ngày dự kiến sinh là bắt buộc",
                  validate: (value) =>
                    value >= moment().format("YYYY-MM-DD") ||
                    "Ngày dự kiến sinh phải từ hôm nay trở về sau",
                })}
                className="input-event-user no-wrap-placeholder"
                placeholder="Ngày dự kiến sinh*"
                min={moment().format("YYYY-MM-DD")}
              />
              {errors.expectedDueDate && (
                <p className="error-message">
                  {errors.expectedDueDate.message}
                </p>
              )}
            </>
          )}
          <textarea
            {...register("notes")}
            rows={1}
            className="textarea-event-user"
            placeholder="Ghi chú"
          />
          <button type="submit" className="button-registration">
            Đăng ký tham gia
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
