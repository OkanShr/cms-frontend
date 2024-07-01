import { LogOut, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authentication";
import doctorImg from "../assets/doctor.png";
import { useNavigate } from "react-router-dom";
import XeramedImg from "../assets/xeramedimg.png";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(() => {
    const storedExpanded = localStorage.getItem("expanded");
    return storedExpanded !== null ? JSON.parse(storedExpanded) : null;
  });
  const loginDetails = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const logoutFunction = (e) => {
    e.preventDefault();
    dispatch(
      //Reducers to initial state
      logout()
    );
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const storedExpanded = localStorage.getItem("expanded");
    const handleScreenChange = () => {
      const isExpanded = mediaQuery.matches;
      setExpanded(isExpanded);
      localStorage.setItem("expanded", JSON.stringify(isExpanded));
    };

    if (!storedExpanded) {
      // Check the screen size initially if it hasn't been set
      handleScreenChange();
    }

    // Add event listener for screen size changes
    mediaQuery.addEventListener("change", handleScreenChange);

    // Cleanup event listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleScreenChange);
  }, []);

  const toggleExpanded = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    localStorage.setItem("expanded", JSON.stringify(newExpanded));
  };

  return (
    <aside className="h-screen ">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm  pt-4">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={XeramedImg}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={toggleExpanded}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <LogOut className={"m-3"} onClick={logoutFunction} size={25} />
        <div className="border-t flex p-3">
          <img src={doctorImg} alt="" className="w-10 h-10 rounded-md" />
          <div
            className={`w-full
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-54 ml-3" : "w-0"}
          `}
          >
            <div className={`leading-4 ${expanded ? "" : "hidden"}`}>
              <h4 className="font-semibold">
                {loginDetails.user ? loginDetails.user.username : ""}
              </h4>
              <span className="text-xs text-gray-600">
                {loginDetails.user ? loginDetails.user.email : ""}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, onclick }) {
  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/${onclick}`)}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-teal-200 to-teal-100 text-teal-900"
            : "hover:bg-teal-50 text-teal-600"
        }
    `}
    >
      {icon}
      <span
        onClick={() => navigate(`/${onclick}`)}
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-teal-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <span
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-teal-100 text-teal-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </span>
      )}
    </li>
  );
}
