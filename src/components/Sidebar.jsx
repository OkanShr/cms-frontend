import { LogOut, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { logout } from '../store/authentication'
import  doctorImg from '../assets/doctor.png'
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)
  const loginDetails = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const logoutFunction = (e) => {
    e.preventDefault();
    dispatch(
      //Reducers to initial state
      logout()
    )
  };

  return (
    <aside className="h-screen ">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm  pt-4">
        <div className="p-4 pb-2 flex justify-between items-center">
          {console.log(loginDetails)}
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={doctorImg}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`w-full
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-54 ml-3" : "w-0"}
          `}
          >
            <div className={`leading-4 ${expanded ? "":"hidden"}`}>
              <h4 className="font-semibold">{loginDetails.user ? loginDetails.user.username : ""}</h4>
              <span className="text-xs text-gray-600">{loginDetails.user ? loginDetails.user.username : ""}</span>
            </div>
            <LogOut className={`${expanded ? "":"hidden"}`} onClick={logoutFunction} size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, onclick }) {
  const { expanded } = useContext(SidebarContext)
  const navigate = useNavigate();

  return (
    <li onClick={() => navigate(`/${onclick}`)}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span onClick={() => navigate(`/${onclick}`)}
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <span 
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </span>
      )}
    </li>
  )
}