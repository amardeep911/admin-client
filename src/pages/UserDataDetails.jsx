import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UserDataDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [isBlocked, setIsBlocked] = useState(false);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [isEditingRecharge, setIsEditingRecharge] = useState(false);
  const [newBalance, setNewBalance] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState("");

  const navigateToUsersData = () => navigate("/users-data");

  const fetchUser = async () => {
    try {
      const user = await axios.get(`/get-user?userId=${id}`);
      setUserData(user.data);
      setIsBlocked(user.data.blocked);
      setNewBalance(user.data.balance);
      setRechargeAmount("");
    } catch (error) {
      console.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleBlockToggle = async () => {
    try {
      const response = await axios.post("/user", {
        userId: id,
        blocked: !isBlocked,
      });
      if (response.data.status === "SUCCESS") {
        setIsBlocked(!isBlocked);
      }
    } catch (error) {
      console.error("Failed to update block status:", error);
    }
  };

  const handleBalanceChange = (e) => {
    setNewBalance(e.target.value);
  };

  const handleRechargeChange = (e) => {
    setRechargeAmount(e.target.value);
  };

  const handleSaveBalance = async () => {
    try {
      const response = await axios.post("/edit-balance", {
        userId: id,
        new_balance: parseFloat(newBalance),
      });
      if (response.status === 200) {
        setUserData((prevData) => ({
          ...prevData,
          balance: newBalance,
        }));
        setIsEditingBalance(false);
        toast.success("Balance updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update balance:", error);
      toast.error("Failed to update balance.");
    }
  };

  const handleSaveRecharge = async () => {
    try {
      const response = await axios.post("/edit-recharge", {
        userId: id,
        recharge_amount: parseFloat(rechargeAmount),
      });
      if (response.status === 200) {
        setRechargeAmount("");
        setIsEditingRecharge(false);
        toast.success("Recharge updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update recharge amount:", error);
      toast.error("Failed to update recharge.");
    }
  };

  const handleCancelBalanceEdit = () => {
    setIsEditingBalance(false);
    setNewBalance(userData.balance);
  };

  const handleCancelRechargeEdit = () => {
    setIsEditingRecharge(false);
    setRechargeAmount("");
  };

  const handleDelete = async () => {
    const deleteUserPromise = new Promise((resolve, reject) => {
      const deleteUserRequest = async () => {
        try {
          const response = await axios.delete(
            `/block-fraud-clear?userId=${id}`
          );
          if (response.status === 200) {
            fetchUser();
          }
          resolve(response);
        } catch (error) {
          reject(error);
        }
      };
      deleteUserRequest();
    });

    await toast.promise(deleteUserPromise, {
      loading: "Deleting Data...",
      success: (r) => {
        return r.data.message;
      },
      error: (error) => {
        const errorMessage =
          error.response?.data?.error ||
          "Error Deleting data. Please try again.";
        return errorMessage;
      },
    });
  };

  const wrapStyle = {
    wordBreak: "break-word",
    whiteSpace: "normal",
    overflowWrap: "break-word",
  };

  return (
    <>
      <div className="w-full my-4 flex items-center justify-between">
        <Button
          variant="link"
          onClick={navigateToUsersData}
          className="text-sm font-normal text-[#8C8C8C] !no-underline p-1 h-0 flex gap-2"
        >
          <Icon.arrowLeft className="w-4 h-4" /> User Data Details
        </Button>
      </div>

      <div className="flex items-center justify-center pt-[1rem]">
        <div className="bg-transparent w-full max-w-md rounded-lg mb-[60px] border-none dark">
          <div className="w-full flex items-center justify-between px-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <h5 className="font-normal text-[#757575]">Block on/off</h5>
              <Switch checked={isBlocked} onCheckedChange={handleBlockToggle} />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <h5 className="font-normal text-[#757575]">Delete User</h5>
              <Icon.trash
                className="w-5 h-5 cursor-pointer text-red-600"
                onClick={handleDelete}
              />
            </div>
          </div>

          <div className="mt-[1.5rem] w-full border-[10px] border-[#444444] rounded-lg">
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                    User ID
                  </td>
                  <td
                    className="border-b-2 border-[#949494] p-3"
                    style={wrapStyle}
                  >
                    {userData._id}
                  </td>
                </tr>
                <tr>
                  <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                    Email
                  </td>
                  <td
                    className="border-b-2 border-[#949494] p-3"
                    style={wrapStyle}
                  >
                    {userData.email}
                  </td>
                </tr>
                <tr>
                  <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                    Login Type
                  </td>
                  <td
                    className="border-b-2 border-[#949494] p-3"
                    style={wrapStyle}
                  >
                    {userData.googleId ? "Google" : "Email"}
                  </td>
                </tr>
                <tr>
                  <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                    Balance
                  </td>
                  <td className="border-b-2 border-[#949494] p-3">
                    {isEditingBalance ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={newBalance}
                          onChange={handleBalanceChange}
                          className="w-full p-2 border rounded-md"
                        />
                        <Button
                          variant="primary"
                          size="small"
                          onClick={handleSaveBalance}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={handleCancelBalanceEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      userData.balance
                    )}
                  </td>
                  <td className="border-b-2 border-[#949494] p-3">
                    <Icon.edit
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => setIsEditingBalance(true)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                    Recharge
                  </td>
                  <td className="border-b-2 border-[#949494] p-3">
                    {isEditingRecharge ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={rechargeAmount}
                          onChange={handleRechargeChange}
                          className="w-full p-2 border rounded-md"
                        />
                        <Button
                          variant="primary"
                          size="small"
                          onClick={handleSaveRecharge}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={handleCancelRechargeEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      rechargeAmount || "Not Set"
                    )}
                  </td>
                  <td className="border-b-2 border-[#949494] p-3">
                    <Icon.edit
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => setIsEditingRecharge(true)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                    Api Key
                  </td>
                  <td
                    className="border-b-2 border-[#949494] p-3"
                    style={wrapStyle}
                  >
                    {userData.api_key}
                  </td>
                </tr>
                <tr>
                  <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                    Trx Address
                  </td>
                  <td
                    className="border-b-2 border-[#949494] p-3"
                    style={wrapStyle}
                  >
                    {userData.trxAddress}
                  </td>
                </tr>
                <tr>
                  <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                    Trx Private Key
                  </td>
                  <td
                    className="border-b-2 border-[#949494] p-3"
                    style={wrapStyle}
                  >
                    {userData.trxPrivateKey}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 px-5 text-[#959595]">Joined</td>
                  <td className="p-3" style={wrapStyle}>
                    {moment(userData.createdAt).format("DD/MM/YYYY hh:mm:ss A")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout()(UserDataDetails);
