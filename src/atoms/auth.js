import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const auth = atom({
    key: "auth",
    default: {
        uid: null,
        user: null,
        isAuth: false,
    },
    effects_UNSTABLE: [persistAtom],
});
