"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clients } from "@/enums/Clients";
import { IGlobalState } from "@/interfaces/GlobalState";
import { useGlobalState } from "@/store/globalState";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

export const ClientSwitcher: React.FC = () => {
  const { currentClient, setClient, selectedBranding } = useGlobalState();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (selectedBranding) {
      setTheme(selectedBranding.theme);
      console.log(selectedBranding);
      document.documentElement.style.setProperty(
        "--primary-color",
        selectedBranding.primaryColor
      );
      document.documentElement.setAttribute(
        "data-theme",
        selectedBranding.theme
      );
    }
  }, [currentClient]);

  return (
    <Select
      value={currentClient}
      onValueChange={(
        value: Pick<IGlobalState, "currentClient">["currentClient"]
      ) => setClient(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Client" />
      </SelectTrigger>
      <SelectContent className="bg-background text-foreground">
        <SelectItem value={Clients.CLIENT_A}>
          <div className="flex items-center">Client A</div>
        </SelectItem>
        <SelectItem value={Clients.CLIENT_B}>
          <div className="flex items-center">Client B</div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
