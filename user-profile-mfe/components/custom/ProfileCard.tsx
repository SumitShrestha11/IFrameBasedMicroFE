import { useGlobalState } from "@/store/globalState";
import { Label } from "@radix-ui/react-label";
import { Pencil } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const ProfileCard = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const { selectedBranding, setSelectedBranding } = useGlobalState();

  const { setTheme } = useTheme();

  useEffect(() => {
    const handleEvent = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:5000") {
        return;
      }
      switch (event.data.type) {
        case "UPDATE_USER_DATA":
          setUserData(event.data.payload);
          break;
        case "SET_BRANDING":
          setSelectedBranding(event.data.payload.branding);
          setTheme(event.data.payload.branding.theme);
          break;
        default:
          break;
      }
    };
    window.addEventListener("message", handleEvent);
    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      selectedBranding?.primaryColor
    );
  }, [selectedBranding]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.parent.postMessage(
      { type: "UPDATE_USER_DATA_IN_SHELL", payload: userData },
      process.env.NEXT_PUBLIC_SHELL_APP_URL ?? "http://localhost:5000"
    );

    setIsEditing(false);
  };
  return (
    <Card className="w-full bg-background text-foreground">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-20 w-20 ">
            <AvatarImage src={""} alt={userData.name} />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-primaryColor">
              {userData.name}
            </h2>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing(!isEditing)}
            className="text-primaryColor hover:text-primaryColor"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        {isEditing && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primaryColor">
                Save
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
