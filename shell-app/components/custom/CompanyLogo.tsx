"use client";
import { useGlobalState } from "@/store/globalState";
import Image from "next/image";

const CompanyLogo = () => {
  const { selectedBranding } = useGlobalState();
  return (
    <>
      <Image
        src={selectedBranding.logo}
        alt="Company Logo"
        width={32}
        height={32}
      />
    </>
  );
};

export default CompanyLogo;
