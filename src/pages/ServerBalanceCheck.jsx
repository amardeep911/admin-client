import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import axios from "axios";

const ServerBalanceCheck = () => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState({}); // To track fetching status for individual servers

  useEffect(() => {
    // Fetch server data
    const fetchServers = async () => {
      try {
        const response = await axios.get("/get-server"); // API for server list
        const serversWithStatus = response.data.map((server) => ({
          ...server,
          balance: "N/A", // Initialize balance as N/A
          fetchStatus: null, // Initialize fetch status
        }));
        setServers(serversWithStatus);
      } catch (error) {
        console.error("Failed to fetch servers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const fetchBalance = async (serverId) => {
    // Update fetching status for the specific server
    setFetching((prev) => ({ ...prev, [serverId]: true }));

    try {
      const server = servers.find((s) => s.server === serverId);
      const response = await axios.get(
        `/get-server-balance?server=${server.server}`
      ); // API to fetch balance

      // Update the specific server's balance and fetch status
      setServers((prev) =>
        prev.map((s) =>
          s.server === serverId
            ? {
                ...s,
                balance: `₹${response.data.balance}`,
                fetchStatus: "success",
              }
            : s
        )
      );
    } catch (error) {
      console.error(`Failed to fetch balance for Server ${serverId}:`, error);
      setServers((prev) =>
        prev.map((s) =>
          s.server === serverId
            ? { ...s, balance: "N/A", fetchStatus: "failed" }
            : s
        )
      );
    } finally {
      setFetching((prev) => ({ ...prev, [serverId]: false }));
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-white text-2xl font-bold mb-4">Server Balances</h1>
      {loading ? (
        <div>Loading...</div>
      ) : servers.length > 0 ? (
        <ul className="w-full max-w-lg">
          {servers
            .filter((server) => server.server !== 0) // Exclude master server
            .map((server) => (
              <li
                key={server.ID}
                className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-lg mb-2"
              >
                <div>
                  <span className="block font-semibold">
                    Server {server.server}
                  </span>
                  <span className="block text-sm text-gray-400">
                    Balance: {server.balance}
                  </span>
                  {server.fetchStatus === "failed" && (
                    <span className="block text-sm text-red-400">
                      Failed to fetch
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => fetchBalance(server.server)}
                  disabled={fetching[server.server]}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  {fetching[server.server] ? "Fetching..." : "Fetch Balance"}
                </Button>
              </li>
            ))}
        </ul>
      ) : (
        <p>No servers available.</p>
      )}
    </div>
  );
};

export default AppLayout()(ServerBalanceCheck);
