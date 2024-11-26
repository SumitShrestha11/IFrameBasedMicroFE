import { ClientSwitcher } from "@/components/custom/ClientSwitcher";
import CompanyLogo from "@/components/custom/CompanyLogo";
import Notifications from "@/components/custom/Notifications";
import UserProfile from "@/components/custom/UserProfile";

export default function Home() {
  return (
    <>
      <div className="min-h-screen p-8 bg-background text-foreground">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <CompanyLogo />
            <div className="flex items-center space-x-4">
              <ClientSwitcher />
              <Notifications />
            </div>
          </header>
          <main>
            <UserProfile />
          </main>
        </div>
      </div>
    </>
  );
}
