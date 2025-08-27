import { create } from "zustand";
const useStore = create((set) => ({
    toggle: localStorage.getItem("dark") === "true",
    Language: "javascript",
    Zoom: 16,
    userName: "",
    theme: "dark",
    popUpmsg: 0,
    msgData: [],
    admin: false,
    active: [],
    runOutput: { output: "", error: "" },
    socketConnected: false,
    isTrueArr: {
        isOutputOpen: true,
        isChatopen: false,
        isACtivePeopleBox: false
    },
    setToggle: () => set((state) => {
        localStorage.setItem("dark", !state.toggle ? "true" : "false");
        return { toggle: !state.toggle }
    }),
    setLanguage: (lang) => set({ Language: lang }),
    setZoomIn: () => set((state) => ({ Zoom: state.Zoom + 1 })),
    setZoomOut: () => set((state) => ({ Zoom: state.Zoom - 1 })),
    setTheme: (color) => set({ theme: color }),
    setUserName: (username) => set((state) => {
        if (username.length >= 20) {
            return { username: username.slice(0, 20) }
        }
        return { userName: username }
    }),
    setMsgData: (newMsg) =>
        set((state) => ({
            msgData: [...state.msgData, newMsg],
        })),
    setPopUpMsg: (msgs) => set(({ popUpmsg: msgs })),
    setisTrue: (obj) => set((state) => ({ isTrueArr: { ...state.isTrueArr, ...obj } })),
    setAdmin: (check) => set({ admin: check }),
    setActive: (users) => set({ active: [...users] }),
    setSocketConnected: (Conn) => set({ socketConnected: Conn }),
    setRunOutput: (obj) => set({ runOutput: obj })
}));

export default useStore;
