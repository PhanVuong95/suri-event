import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { BaseURL } from "../configs/base-config";

const ListsGiftPage: React.FunctionComponent = (props) => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [gift, setGift] = useState([]);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    const token = localStorage.token;

    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/eventGift/api/list-by-event/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGift(data.data);
      // console.log(data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  return (
    <div>
      <div className="header-top-1">
        <div className="w-[100%]">
          <h1 className="text-black text-lg font-bold text-center">
            Quà sự kiện
          </h1>
        </div>
      </div>

      <div className="container-gift p-4">
        {gift.length === 0 ? (
          <div className="no-gift-container">
            <img
              src="https://cdn.icon-icons.com/icons2/1237/PNG/512/1492719677-no-gift-96_83654.png"
              alt="No Gifts"
            />
          </div>
        ) : (
          gift?.map((item, i) => {
            // Format the price
            const formattedPrice = new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.price);
            return (
              <Link to={`/gift/${item.id}`}>
                <div className="card-gift" key={i}>
                  <div className="card-gift-top">
                    <img src={`${BaseURL}${item.photo}`} />
                    <div className="card-gift-top-title pl-[10px]">
                      <h1 className="text-black text-lg font-bold">
                        {item.name}
                      </h1>
                      <p className="text-title-top">
                        Trị giá lên đến:{" "}
                        <span className="text-[#FA7A87;] pl-[5px]">
                          {formattedPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListsGiftPage;
