import { atom, selector } from "recoil";
// import { atom, selector, useSetRecoilState, useRecoilValue } from "recoil";
import { getUserInfo } from "zmp-sdk";

// export const userState = selector({
//   key: "user",
//   get: () =>
//     getUserInfo({
//       avatarType: "normal",
//     }),
// });

export const userState = selector({
  key: "user",
  get: async () => {
    const userInfo = await getUserInfo({ avatarType: "normal" });
    return userInfo;
  },
  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});

export const userStates = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});

export const displayNameState = atom({
  key: "displayName",
  default: "",
});

export const phoneState = atom({
  key: "phone",
  default: "",
});
