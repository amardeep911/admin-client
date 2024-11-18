import React, { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { useNavigate } from "react-router-dom";
import { ServerNumber } from "@/components/constants/sampleData";
import axios from "axios";

const ServerDiscount = () => {
  const navigate = useNavigate();
  const [servers, setServers] = useState([]); // To store server data
  const [loading, setLoading] = useState(true); // To handle loading state

  const navigateBack = () => navigate("/discount");

  useEffect(() => {
    // Fetch server data
    const fetchServers = async () => {
      try {
        const response = await axios.get("/get-server"); // Call the API endpoint
        setServers(response.data); // Set server data
      } catch (error) {
        console.error("Failed to fetch servers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const handleClick = (index) => {
    navigate(`/discount/server/${index}`);
  };
  return (
    <>
      <div className="w-full my-2">
        <Button
          variant="link"
          onClick={navigateBack}
          className="text-sm font-normal text-[#8C8C8C] !no-underline p-1 h-0 flex gap-2"
        >
          <Icon.arrowLeft className="w-4 h-4" /> Server Discount
        </Button>
      </div>
      <div className="flex items-center justify-center pt-[1rem]">
        <div className="bg-transparent w-full max-w-md rounded-lg mb-[60px] border-none dark">
          <div className=" flex flex-col items-center gap-2">
            {loading ? (
              <div>Loading...</div>
            ) : (
              servers
                .filter((server) => server.server !== 0) // Exclude master server
                .map((server) => (
                  <Button
                    key={server.server}
                    onClick={() => handleClick(server.server)}
                    className={buttonVariants({
                      variant: "login",
                      className:
                        "w-full text-sm font-normal h-14 text-white !bg-[#282828] !hover:bg-[#282828] !justify-between ",
                    })}
                  >
                    Server {server.server}
                    <Icon.arrowRight className="w-4 h-4" />
                  </Button>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout()(ServerDiscount);
