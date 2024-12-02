import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const SmsHistoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [smsDetails, setSmsDetails] = useState([]);
  const [userData, setUserData] = useState({});
  const [tranFilter, setTranFilter] = useState("All");

  // State for pagination
  const [transactionLimit, setTransactionLimit] = useState(10);
  const [transactionCurrentPage, setTransactionCurrentPage] = useState(1);

  const navigateToSmsHistory = () => navigate("/sms-history");

  useEffect(() => {
    const fetchSmsDetails = async () => {
      try {
        const response = await axios.get(`/transaction-history?userId=${id}`);
        setSmsDetails(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch SMS history details:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const user = await axios.get(`/get-user?userId=${id}`);
        setUserData(user.data);
      } catch (error) {
        console.error("Failed to fetch user data");
      }
    };

    fetchSmsDetails();
    fetchUser();
  }, [id]);

  const filterTransactionHistory = (data) => {
    if (!Array.isArray(data)) {
      return [];
    }

    const groupedData = data.reduce((acc, entry) => {
      if (!acc[entry.id]) {
        acc[entry.id] = [];
      }
      acc[entry.id].push(entry);
      return acc;
    }, {});

    const preparedData = Object.values(groupedData).map((entries) => {
      const finishedEntries = entries.filter(
        (entry) => entry.status === "FINISHED"
      );
      const cancelledEntries = entries.filter(
        (entry) => entry.status === "CANCELLED"
      );

      const displayEntry =
        cancelledEntries.length > 0
          ? cancelledEntries[0]
          : finishedEntries.find((entry) => entry.otp !== null) ||
            finishedEntries[0];

      return {
        ...displayEntry,
        otps:
          finishedEntries
            .filter((entry) => entry.otp)
            .map((entry) => entry.otp)
            .join(`<br><br>`) || "-",
      };
    });

    return preparedData;
  };

  let filteredTransactionHistory = filterTransactionHistory(smsDetails);

  if (tranFilter === "Success") {
    filteredTransactionHistory = filteredTransactionHistory.filter(
      (entry) => entry.status === "FINISHED"
    );
  } else if (tranFilter === "Cancelled") {
    filteredTransactionHistory = filteredTransactionHistory.filter(
      (entry) => entry.status === "CANCELLED"
    );
  }

  const sortedFilteredTransactionHistory = filteredTransactionHistory
    .sort((a, b) =>
      moment(b.date_time, "MM/DD/YYYYTHH:mm:ss A").isBefore(
        moment(a.date_time, "MM/DD/YYYYTHH:mm:ss A")
      )
        ? 1
        : -1
    )
    .reverse();

  const getDateRange = (data) => {
    if (data.length === 0) return "No data available";
    const dates = data.map((entry) =>
      moment(entry.date_time, "MM/DD/YYYYTHH:mm:ss A")
    );
    const minDate = moment.min(dates);
    const maxDate = moment.max(dates);
    return `${minDate.format("DD/MM/YY")} - ${maxDate.format("DD/MM/YY")}`;
  };

  const handleTransactionLimitChange = (value) => {
    setTransactionLimit(Number(value));
    setTransactionCurrentPage(1); // Reset to the first page when limit changes
  };

  const startIndexTransaction = (transactionCurrentPage - 1) * transactionLimit;
  const transactionData = Array.isArray(sortedFilteredTransactionHistory)
    ? sortedFilteredTransactionHistory.slice(
        startIndexTransaction,
        startIndexTransaction + transactionLimit
      )
    : [];

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
          onClick={navigateToSmsHistory}
          className="text-sm font-normal text-[#8C8C8C] !no-underline p-1 h-0 flex gap-2"
        >
          <Icon.arrowLeft className="w-4 h-4" /> Sms History Details
        </Button>
      </div>
      <div className="flex items-center justify-center pt-[1rem]">
        <div className="bg-transparent w-full max-w-md rounded-lg mb-[60px] border-none dark">
          <div className="bg-[#484848] text-sm py-3 px-5 flex mb-4 w-full items-center justify-between rounded-lg">
            <h3 className="font-medium pr-4 border-r">Email</h3>
            <p className="font-normal pl-4 text-[#9B9B9B]" style={wrapStyle}>
              {userData.email}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Filter setTranFilter={setTranFilter} transFilter={tranFilter} />
            <p className="min-w-fit text-sm">
              Total: {filteredTransactionHistory.length}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p className="text-[#A5A5A5] text-sm">
              Data:{" "}
              <span className="text-white font-normal text-xs">
                {getDateRange(transactionData)}
              </span>
            </p>
          </div>

          {sortedFilteredTransactionHistory.length > 0 ? (
            sortedFilteredTransactionHistory.map((item, index) => (
              <div
                key={index}
                className="mt-[1.5rem] w-full border-[10px] border-[#444444] rounded-lg"
              >
                <table className="w-full table-auto text-sm">
                  <tbody>
                    <tr>
                      <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                        SL No
                      </td>
                      <td className="border-b-2 border-[#949494] p-3">
                        {index + 1}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                        ID
                      </td>
                      <td
                        className="border-b-2 border-[#949494] p-3"
                        style={wrapStyle}
                      >
                        {item.id}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                        Number
                      </td>
                      <td
                        className="border-b-2 border-[#949494] p-3"
                        style={wrapStyle}
                      >
                        {item.number}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                        OTP
                      </td>
                      <td className="border-b-2 border-[#949494] p-3">
                        <span dangerouslySetInnerHTML={{ __html: item.otps }} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                        Date & Time
                      </td>
                      <td
                        className="border-b-2 border-[#949494] p-3"
                        style={wrapStyle}
                      >
                        {moment(item.date_time).isValid()
                          ? moment(item.date_time).format(
                              "DD/MM/YYYY hh:mm:ss A"
                            )
                          : "Invalid Date"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                        Service
                      </td>
                      <td
                        className="border-b-2 border-[#949494] p-3"
                        style={wrapStyle}
                      >
                        {item.service}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b-2 border-[#949494] p-3 px-5 text-[#959595]">
                        Status
                      </td>
                      <td className="border-b-2 border-[#949494] p-3">
                        {item.status}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <div className="text-center text-[#959595] mt-10 text-lg">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Filter = ({ transFilter, setTranFilter }) => {
  return (
    <Select value={transFilter} onValueChange={(value) => setTranFilter(value)}>
      <SelectTrigger className="dark bg-transparent w-fit">
        <SelectValue>{transFilter}</SelectValue>
      </SelectTrigger>
      <SelectContent className="dark bg-[#1e1e1e]">
        <SelectGroup>
          <SelectLabel className="font-normal">Filter</SelectLabel>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Success">Success</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AppLayout()(SmsHistoryDetails);
