import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "@/components/auth/ProtectRoute";
import { LayoutLoader } from "@/components/layout/Loaders";
import axios from "axios";
import { useAuth } from "./utils/AuthContext";
import AddServiceDiscountWrapper from "@/components/layout/AddServiceDiscountWrapper";
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Service = lazy(() => import("@/pages/Service"));
const AddService = lazy(() => import("@/pages/AddService"));
const RechargeHistory = lazy(() => import("@/pages/RechargeHistory"));
const UserRechargeHistory = lazy(() => import("@/pages/UserRechargeHistory"));
const UsersData = lazy(() => import("@/pages/UsersData"));
const UserDataDetails = lazy(() => import("@/pages/UserDataDetails"));
const SmsHistory = lazy(() => import("@/pages/SmsHistory"));
const SmsHistoryDetails = lazy(() => import("@/pages/SmsHistoryDetails"));
const AdminPanel = lazy(() => import("@/pages/AdminPanel"));
const Maintainance = lazy(() => import("@/pages/Maintainance"));
const UpiUpdate = lazy(() => import("@/pages/UpiUpdate"));
const ApiUpdate = lazy(() => import("@/pages/ApiUpdate"));
const TrxAddressUpdate = lazy(() => import("@/pages/TrxAddressUpdate"));
const Discount = lazy(() => import("@/pages/Discount"));
const ServerDiscount = lazy(() => import("@/pages/ServerDiscount"));
const AddServerDiscount = lazy(() => import("@/pages/AddServerDiscount"));
const ServerBalanceCheck = lazy(() => import("@/pages/ServerBalanceCheck"));
const ServiceDiscounts = lazy(() => import("@/pages/ServiceDiscounts"));
const AddDiscount = lazy(() => import("@/pages/AddDiscount"));
const UnsendTrx = lazy(() => import("@/pages/UnsendTrx"));
const BlockedUser = lazy(() => import("@/pages/BlockedUser"));
const RechargeMaintenance = lazy(() => import("@/pages/RechargeMaintenance"));
const MinimumRecharge = lazy(() => import("@/pages/MinimumRecharge"));
const BlockStatus = lazy(() => import("@/pages/BlockStatus"));
const UserDiscountDetails = lazy(() => import("@/pages/UserDiscountDetails"));
const DiscountAfterAddingUser = lazy(() =>
  import("@/pages/DiscountAfterAddingUser")
);
const NotFound = lazy(() => import("@/pages/NotFound"));

function App() {
  axios.defaults.baseURL = "https://paidsmsbackend.builderx100.com/api";
  axios.defaults.withCredentials = true;
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <Home />
              </ProtectRoute>
            }
          />
          <Route
            path="/service"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <Service />
              </ProtectRoute>
            }
          />
          <Route
            path="/service/add-service"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <AddService />
              </ProtectRoute>
            }
          />
          <Route
            path="/recharge-history"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <RechargeHistory />
              </ProtectRoute>
            }
          />
          <Route
            path="/recharge-history/:id"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <UserRechargeHistory />
              </ProtectRoute>
            }
          />
          <Route
            path="/users-data"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <UsersData />
              </ProtectRoute>
            }
          />
          <Route
            path="/users-data/:id"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <UserDataDetails />
              </ProtectRoute>
            }
          />
          <Route
            path="/sms-history"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <SmsHistory />
              </ProtectRoute>
            }
          />
          <Route
            path="/sms-history/:id"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <SmsHistoryDetails />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin-panel"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <AdminPanel />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin-panel/maintainance"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <Maintainance />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin-panel/upi-update"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <UpiUpdate />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin-panel/api-update"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <ApiUpdate />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin-panel/trx-address-update"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <TrxAddressUpdate />
              </ProtectRoute>
            }
          />
          <Route
            path="/discount"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <Discount />
              </ProtectRoute>
            }
          />
          <Route
            path="/discount/server"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <ServerDiscount />
              </ProtectRoute>
            }
          />
          <Route
            path="/discount/server/:id"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <AddServerDiscount />
              </ProtectRoute>
            }
          />
          <Route
            path="/discount/service"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <ServiceDiscounts />
              </ProtectRoute>
            }
          />
          <Route
            path="/discount/service/:id"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <AddServiceDiscountWrapper />
              </ProtectRoute>
            }
          />
          <Route
            path="/discount/user"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <DiscountAfterAddingUser />
              </ProtectRoute>
            }
          />
          <Route
            path="/discount/user/add-discount"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <AddDiscount />
              </ProtectRoute>
            }
          />
          <Route
            path="/discount/user/:id"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <UserDiscountDetails />
              </ProtectRoute>
            }
          />
          <Route
            path="/unsend-trx"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <UnsendTrx />
              </ProtectRoute>
            }
          />
          <Route
            path="/blocked-users"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <BlockedUser />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin-panel/recharge-maintenance"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <RechargeMaintenance />
              </ProtectRoute>
            }
          />
          <Route
            path="/minimum-recharge"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <MinimumRecharge />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin-panel/block-status"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated} redirect="/login">
                <BlockStatus />
              </ProtectRoute>
            }
          />
          <Route
            path="/server-balance-check"
            element={
              <ProtectRoute isAuthenticated={isAuthenticated}>
                <ServerBalanceCheck />
              </ProtectRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectRoute isAuthenticated={!isAuthenticated} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
