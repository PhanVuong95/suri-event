import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import About from "../pages/about";
import Form from "../pages/form";
import User from "../pages/user";
import TimeKeepingPage from "../pages/timekeeping";
import EventPage from "../pages/event";
import LayoutPage from "../Layout/layoutPage";
import ScanQRPage from "../pages/ScanQR";
import RegistrationPage from "../pages/registrationPage";
import DetailAccountPage from "../pages/detailAccount";
import EventDetail from "../pages/eventDetail";
import SponsorDetail from "../pages/sponsorDetail";
import ListsGiftPage from "../pages/listsGift";
import InvitationTicketPage from "../pages/invitationTicket";
import ListSponsorPage from "../pages/listSponsor";
import ListsAccountGiftPage from "../pages/listsAccountGift";
import { ToastContainer } from "react-toastify";
import DetailGiftPage from "../pages/detailGift";
import LoginModalPage from "./LoginModal";
import UpdateAccount from "../pages/updateAccount";
import ListKolsPage from "../pages/listKols";
import ListKolsDetailPage from "../pages/listKolsDetail";
import KolsDetailPage from "../pages/kolsDetail";
import ModalPage from "./modal";
import ProcedurePage from "./kols/procedure";
import SearchPage from "./SearchPage";

import { ProfileProvider } from "../components/user_profile-context";

const MyApp = () => {
  return (
    <ProfileProvider>
      <RecoilRoot>
        <App>
          <ToastContainer />
          <SnackbarProvider>
            <ZMPRouter>
              <AnimationRoutes>
                <Route path="/" element={<LayoutPage />}>
                  <Route index element={<HomePage></HomePage>}></Route>
                  <Route path="about" element={<About></About>}></Route>
                  <Route path="form" element={<Form></Form>}></Route>
                  <Route path="user" element={<User></User>}></Route>
                  <Route path="modal" element={<ModalPage></ModalPage>}></Route>
                  <Route
                    path="login"
                    element={<LoginModalPage></LoginModalPage>}
                  ></Route>
                  <Route
                    path="user-detail"
                    element={<DetailAccountPage></DetailAccountPage>}
                  ></Route>
                  <Route
                    path="user-update"
                    element={<UpdateAccount></UpdateAccount>}
                  ></Route>
                  <Route
                    path="timekeeping"
                    element={<TimeKeepingPage></TimeKeepingPage>}
                  ></Route>
                  <Route path="event" element={<EventPage></EventPage>}></Route>
                  <Route
                    path="list-sponsor"
                    element={<ListSponsorPage></ListSponsorPage>}
                  ></Route>
                  <Route
                    path="event/:id"
                    element={<EventDetail></EventDetail>}
                  ></Route>
                  <Route
                    path="sponsor/:id"
                    element={<SponsorDetail></SponsorDetail>}
                  ></Route>
                  <Route
                    path="scanQr"
                    element={<ScanQRPage></ScanQRPage>}
                  ></Route>
                  <Route
                    path="dk/:id"
                    element={<RegistrationPage></RegistrationPage>}
                  ></Route>
                  <Route
                    path="gift-account"
                    element={<ListsAccountGiftPage></ListsAccountGiftPage>}
                  ></Route>
                  <Route
                    path="kols-page"
                    element={<ListKolsPage></ListKolsPage>}
                  ></Route>
                  <Route
                    path="list-kols-page"
                    element={<ListKolsDetailPage></ListKolsDetailPage>}
                  ></Route>
                  <Route
                    path="kols-detail/:id"
                    element={<KolsDetailPage></KolsDetailPage>}
                  ></Route>
                  <Route
                    path="gift-event/:id"
                    element={<ListsGiftPage></ListsGiftPage>}
                  ></Route>
                  <Route
                    path="gift/:id"
                    element={<DetailGiftPage></DetailGiftPage>}
                  ></Route>
                  <Route
                    path="invitation-ticket/:id"
                    element={<InvitationTicketPage></InvitationTicketPage>}
                  ></Route>
                  <Route path="procedure" element={<ProcedurePage />} />
                </Route>
                <Route path="/search" element={<SearchPage />} />
              </AnimationRoutes>
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </RecoilRoot>
    </ProfileProvider>
  );
};
export default MyApp;
