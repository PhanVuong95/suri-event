import React, { useEffect, useState } from "react";
import axios from "axios";
import { Page } from "zmp-ui";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { BaseURL } from "../configs/base-config";

const EventPage: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [ongoingEvents, setOngoingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageIndexOngoing, setPageIndexOngoing] = useState<number>(1);
  const [pageIndexPast, setPageIndexPast] = useState<number>(1);
  const [hasMoreUpcoming, setHasMoreUpcoming] = useState<boolean>(true);
  const [hasMoreOngoing, setHasMoreOngoing] = useState<boolean>(true);
  const [hasMorePast, setHasMorePast] = useState<boolean>(true);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData1();
  }, []);

  const fetchData = async (pageIndex: number = 1) => {
    try {
      // Fetch upcoming events
      const { data: upcomingData } = await axios.get(
        `https://checking-event.dion.vn/event/api/ListPagingByStatus?statusId=1001&pageIndex=${pageIndex}&pageSize=3`
      );
      setUpcomingEvents((prevEvent) => [...prevEvent, ...upcomingData.data]);
      setHasMoreUpcoming(upcomingData.data.length > 0);

    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchData1 = async (pageIndex: number = 1) => {
    try {

      // Fetch past events
      const { data: pastData } = await axios.get(
        `https://checking-event.dion.vn/event/api/ListPagingByStatus?statusId=1003&pageIndex=${pageIndex}&pageSize=3`
      );
      setPastEvents((prevEvent) => [...prevEvent, ...pastData.data]);
      setHasMorePast(pastData.data.length > 0);

    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchData2 = async (pageIndex: number = 1) => {
    try {

      // Fetch past events

      // Fetch ongoing events
      const { data: ongoingData } = await axios.get(
        `https://checking-event.dion.vn/event/api/ListPagingByStatus?statusId=1002&pageIndex=${pageIndex}&pageSize=3`
      );
      setOngoingEvents((prevEvent) => [...prevEvent, ...ongoingData.data]);
      setHasMoreOngoing(ongoingData.data.length > 0);

    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const loadMoreUpcomingEvents = () => {
    if (hasMoreUpcoming) {
      setPageIndex(pageIndex + 1);
      fetchData(pageIndex + 1);
    }
  };

  const loadMoreOngoingEvents = () => {
    if (hasMoreOngoing) {
      setPageIndexPast(pageIndexPast + 1);
      fetchData1(pageIndexPast + 1);
    }
  };

  const loadMorePastEvents = () => {
    if (hasMorePast) {
      setPageIndexOngoing(pageIndexOngoing + 1);
      fetchData2(pageIndexOngoing + 1);
    }
  };

  return (
    <Page>
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
          <h1 className="text-black text-lg font-bold text-center">Sự kiện</h1>
        </div>
      </div>

      <div className="event-container">
        <div className="event-waiting">
          <div className="text-lg font-bold border-b-1 border-custom p-4">
            Sự kiện sắp diễn ra
          </div>
          <div className="event-body">
            {upcomingEvents?.map((item) => {
              const formattedDate = moment(item.startDate).format(
                "DD/MM/YYYY - HH:mm"
              );
              return (
                <div key={item.id} className="event-item flex flex-col gap-5 border-b-1 border-custom py-5">
                  <div className="event-item-top flex flex-row gap-3.5">
                    <img src={`${BaseURL}${item.photo}`} alt={item.name}></img>
                    <div className="event-item-top-inner flex flex-col gap-2.5">
                      <Link to={`/event/${item.id}`}>
                        <div className="text-base font-semibold">
                          {item.name}
                        </div>
                      </Link>

                      <div className="flex flex-row items-center gap-1">
                        <IoLocationSharp />
                        <span>{item.info}</span>
                      </div>
                      <div className="event-time text-lg font-bold color-pink">
                        {formattedDate}
                      </div>
                    </div>
                  </div>
                  <div className="event-item-bottom flex flex-row gap-4">
                    <Link
                      to={`/event/${item.id}`}
                      className="w-[100%] text-center"
                    >
                      <button className="gap-1 w-[100%] border-1 border-custom rounded-xl px-4 py-2 background-pink">
                        <span className="text-sm whitespace-nowrap">
                          Tham gia
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
            {hasMoreUpcoming && (
              <div className="button-event-card">
                <button className="button-event" onClick={loadMoreUpcomingEvents}>
                  Xem thêm
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={11}
                  height={6}
                  viewBox="0 0 11 6"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.642935 1.23068C0.86794 0.936635 1.27835 0.888961 1.5596 1.12419L5.5 4.4198L9.4404 1.12419C9.72165 0.888961 10.1321 0.936635 10.3571 1.23068C10.5821 1.52472 10.5365 1.95378 10.2552 2.18901L5.90741 5.82535C5.66922 6.02456 5.33078 6.02456 5.09259 5.82535L0.744787 2.18901C0.463531 1.95378 0.41793 1.52472 0.642935 1.23068Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="event-ended">
          <div className="text-lg font-bold border-1 border-custom p-4">
            Sự kiện đang diễn ra
          </div>
          <div className="event-body">
            {ongoingEvents?.map((item) => {
              const formattedDate = moment(item.startDate).format(
                "DD/MM/YYYY - HH:mm"
              );
              return (
                <div key={item.id} className="event-item flex flex-col gap-5 border-b-1 border-custom py-5">
                  <div className="event-item-top flex flex-row gap-3.5">
                    <img src={`${BaseURL}${item.photo}`} alt={item.name}></img>
                    <div className="event-item-top-inner flex flex-col gap-2.5">
                      <Link to={`/event/${item.id}`}>
                        <div className="text-base font-semibold">
                          {item.name}
                        </div>
                      </Link>

                      <div className="flex flex-row items-center gap-1">
                        <IoLocationSharp />
                        <span>{item.info}</span>
                      </div>
                      <div className="event-time text-lg font-bold color-pink">
                        {formattedDate}
                      </div>
                    </div>
                  </div>
                  <div className="event-item-bottom flex flex-row gap-4">
                    <Link
                      to={`/event/${item.id}`}
                      className="w-[100%] text-center"
                    >
                      <button className="gap-1 w-[100%] border-1 border-custom rounded-xl px-4 py-2 background-pink">
                        <span className="text-sm whitespace-nowrap">
                          Tham gia
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
            {hasMoreOngoing && (
              <div className="button-event-card">
                <button className="button-event" onClick={loadMorePastEvents}>
                  Xem thêm
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={11}
                  height={6}
                  viewBox="0 0 11 6"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.642935 1.23068C0.86794 0.936635 1.27835 0.888961 1.5596 1.12419L5.5 4.4198L9.4404 1.12419C9.72165 0.888961 10.1321 0.936635 10.3571 1.23068C10.5821 1.52472 10.5365 1.95378 10.2552 2.18901L5.90741 5.82535C5.66922 6.02456 5.33078 6.02456 5.09259 5.82535L0.744787 2.18901C0.463531 1.95378 0.41793 1.52472 0.642935 1.23068Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="event-ended">
          <div className="text-lg font-bold border-1 border-custom p-4">
            Sự kiện đã diễn ra
          </div>
          <div className="event-body">
            {pastEvents?.map((item) => {
              const formattedDate = moment(item.startDate).format(
                "DD/MM/YYYY - HH:mm"
              );
              return (
                <div key={item.id} className="event-item flex flex-col gap-5 border-b-1 border-custom py-5">
                  <div className="event-item-top flex flex-row gap-3.5">
                    <img src={`${BaseURL}${item.photo}`} alt={item.name}></img>
                    <div className="event-item-top-inner flex flex-col gap-2.5">
                      <Link to={`/event/${item.id}`}>
                        <div className="text-base font-semibold">
                          {item.name}
                        </div>
                      </Link>

                      <div className="flex flex-row items-center gap-1">
                        <IoLocationSharp />
                        <span>{item.info}</span>
                      </div>
                      <div className="event-time text-lg font-bold color-pink">
                        {formattedDate}
                      </div>
                    </div>
                  </div>
                  <div className="event-item-bottom flex flex-row gap-4">
                    <Link
                      to={`/event/${item.id}`}
                      className="w-[100%] text-center"
                    >
                      <button className="gap-1 w-[100%] border-1 border-custom rounded-xl px-4 py-2 background-pink">
                        <span className="text-sm whitespace-nowrap">
                          Tham gia
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
            {hasMorePast && (
              <div className="button-event-card">
                <button className="button-event" onClick={loadMoreOngoingEvents}>
                  Xem thêm
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={11}
                  height={6}
                  viewBox="0 0 11 6"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.642935 1.23068C0.86794 0.936635 1.27835 0.888961 1.5596 1.12419L5.5 4.4198L9.4404 1.12419C9.72165 0.888961 10.1321 0.936635 10.3571 1.23068C10.5821 1.52472 10.5365 1.95378 10.2552 2.18901L5.90741 5.82535C5.66922 6.02456 5.33078 6.02456 5.09259 5.82535L0.744787 2.18901C0.463531 1.95378 0.41793 1.52472 0.642935 1.23068Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default EventPage;
