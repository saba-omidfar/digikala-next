"use client";
import { useState } from "react";

import OrdersContent from "@/features/profile/sections/profileOverview/ordersContent/OrdersContent";
import ListsContent from "@/features/profile/sections/profileOverview/listsContent/ListsContent";
import IdentityVerificationModal from "@/features/profile/modals/identityVerificationModal/IdentityVerificationModal";
import IdentityVerificationAlert from "@/features/profile/sections/identityVerificationAlert/IdentityVerificationAlert";

import { useGetProfile } from "@/hooks/useUser";

export default function ProfileOverview() {
  const { data: profile, isLoading } = useGetProfile();

  return (
    <>
      {!profile?.is_verified ? <IdentityVerificationAlert /> : ""}
      <OrdersContent />
      <ListsContent />
    </>
  );
}
