import { BellIcon, BriefcaseIcon, UserIcon } from "lucide-react";
import Nav from "./nav";
import { listAccountsByCategory } from "src/http/listAccounts";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    const accounts = await listAccountsByCategory("hris");
    if (!Array.isArray(accounts) || accounts.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold">No HRIS systems available</h1>
            </div>
        );
    }
    return (
        <div
            className="p-6 shadow-lg bg-white relative"
            style={{
                borderTopLeftRadius: "2.5rem",
                boxShadow:
                    "0 -4px 8px -1px rgba(0, 0, 0, 0.1), 0 -2px 1px -1px rgba(0, 0, 0, 0.06)",
            }}
        >
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="icon-size" />
                    </div>
                    <h1
                        className="text-xl font-bold"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Manage HRIS & Onboarding
                    </h1>
                </div>
                <div className="flex space-x-4">
                    <BellIcon className="icon-size" />
                    <BriefcaseIcon className="icon-size" />
                </div>
            </div>
            <hr />
            <Nav accounts={accounts} />
            {children}
        </div>
    );
}

