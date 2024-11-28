import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import axios from "axios";
import toast from "react-hot-toast";

const MinimumRecharge = () => {
  const [minRecharge, setMinRecharge] = useState("");
  const [currentMinRecharge, setCurrentMinRecharge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the current minimum recharge amount
  const fetchMinRecharge = async () => {
    try {
      const response = await axios.get("/get-minimum-recharge");
      setCurrentMinRecharge(response.data.minimumRecharge || null);
    } catch (error) {
      console.error("Error fetching minimum recharge:", error);
    }
  };

  useEffect(() => {
    fetchMinRecharge();
  }, []);

  // Handle setting a new minimum recharge amount
  const handleSetMinRecharge = async () => {
    if (!minRecharge || isNaN(minRecharge) || parseFloat(minRecharge) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("/add-minimum-recharge", {
        minimumRecharge: parseFloat(minRecharge),
      });
      toast.success("Minimum recharge amount set successfully!");
      setMinRecharge("");
      fetchMinRecharge();
    } catch (error) {
      console.error("Error setting minimum recharge:", error);
      toast.error("Failed to set minimum recharge amount.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting the minimum recharge amount
  const handleDeleteMinRecharge = async () => {
    setIsLoading(true);
    try {
      await axios.delete("/delete-minimum-recharge");
      toast.success("Minimum recharge amount deleted successfully!");
      setCurrentMinRecharge(null);
    } catch (error) {
      console.error("Error deleting minimum recharge:", error);
      toast.error("Failed to delete minimum recharge amount.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-white text-2xl font-bold mb-4">
        Set Minimum Recharge
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <Input
          type="number"
          placeholder="Enter minimum recharge"
          value={minRecharge}
          onChange={(e) => setMinRecharge(e.target.value)}
          className="w-60 p-2 rounded-lg border border-gray-300 text-black"
        />
        <Button
          onClick={handleSetMinRecharge}
          isLoading={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Set
        </Button>
      </div>

      {currentMinRecharge !== null ? (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex justify-center items-center align-middle gap-20">
          <h2 className="text-lg font-medium">
            Current Minimum Recharge: ₹{currentMinRecharge}
          </h2>
          <Button
            onClick={handleDeleteMinRecharge}
            isLoading={isLoading}
            className=" bg-red-600 text-white px-4  rounded-lg"
          >
            Delete
          </Button>
        </div>
      ) : (
        <p className="text-gray-400">No minimum recharge amount set.</p>
      )}
    </div>
  );
};

export default AppLayout()(MinimumRecharge);
