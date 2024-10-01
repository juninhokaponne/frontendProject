import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import { BiCameraMovie } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import logo from "../../assets/RobotImage.png";

interface SidebarProps {
  collapsed: boolean;
  setActiveContent: (content: string) => void;
}

export const SidebarComponent = ({
  collapsed,
  setActiveContent,
}: SidebarProps): any => {
  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    window.location.href = "/";
  };

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="#000"
      style={{
        color: "#FFF",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={logo}
          style={{
            width: "50px",
            height: "50px",
            margin: "10px",
            objectFit: "cover",
          }}
        />
        <h1 style={{ color: "#FFF", fontSize: "30px", margin: "10px" }}>
          SpaceUsers
        </h1>
      </div>
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem
          icon={<FaRegUser />}
          onClick={() => {
            console.log("Changing content to users");
            setActiveContent("users");
          }}
        >
          Users
        </MenuItem>
        <MenuItem
          icon={<BiCameraMovie />}
          onClick={() => {
            console.log("Changing content to movies");
            setActiveContent("movies");
          }}
        >
          Movies
        </MenuItem>
        <MenuItem
          icon={<CgProfile />}
          onClick={() => {
            console.log("Changing content to profile");
            setActiveContent("profile");
          }}
        >
          Profile
        </MenuItem>
      </Menu>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
          padding: 10,
          color: "#FFF",
          gap: 10,
          position: "absolute",
          bottom: 0,
          width: "100%",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        <CiLogout />
        <button>Sair</button>
      </div>
    </Sidebar>
  );
};
