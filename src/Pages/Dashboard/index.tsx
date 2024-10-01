import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import {
  TbLayoutSidebarRightCollapseFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";
import { SidebarComponent } from "../../components/Sidebar";
import { Content } from "../Content";
import { Header } from "../../components/Header";

export const Dashboard = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [collapsed, setCollapsed] = useState(false);
  const [activeContent, setActiveContent] = useState("users");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        minHeight: "400px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SidebarComponent
        collapsed={collapsed}
        setActiveContent={setActiveContent}
      />

      <div
        style={{
          width: "100%",
        }}
      >
        <div>
          <main style={{ padding: 10 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>
                <button
                  className="sb-button"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {collapsed ? (
                    <TbLayoutSidebarRightCollapseFilled />
                  ) : (
                    <TbLayoutSidebarLeftCollapseFilled />
                  )}
                </button>
              </div>

              <div>
                <Header username={user.name} email={user.email} />
              </div>
            </div>
          </main>
        </div>

        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100vh",
              width: "100%",
              backgroundColor: "#f3f0f0",
            }}
          >
            <Content activeContent={activeContent} />
          </div>
        </div>
      </div>
    </div>
  );
};
