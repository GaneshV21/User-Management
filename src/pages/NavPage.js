import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { clearAuthToken } from "../redux/authSlice";
import { RiLogoutCircleRLine } from "react-icons/ri";
import UserList from "./UserList";

const NavPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuthToken());
    localStorage.removeItem("token");
    message.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" flex justify-end items-center w-full h-[55px] bg-[#001628] ">
        <div className="flex justify-between items-center gap-7 px-8">
          <span className="text-white text-base">Elon Musk</span>{" "}
          <Button
            onClick={handleLogout}
            icon={<RiLogoutCircleRLine />}
            danger
            type="primary"
            size="medium"
          />
        </div>
      </div>

      <div className="p-3 pt-5">
        <UserList />
      </div>
    </div>
  );
};

export default NavPage;
