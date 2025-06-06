import React, { useState, useEffect } from "react";
import briefcase from "../resources/Icons/user.svg"; // Example: changed from mail
import notification from "../resources/Icons/user.svg";
import user from "../resources/Icons/user.svg";
// We will need different buttons for HRIS, e.g., StartOnboardingButton
// import LinkAccountButton from "./LinkAccountButton"; // May not be needed or could be "Link HRIS Button"
// import ListJobsPostingsButton from "./ListJobsPostingsButton"; // To be replaced
// import ListApplicationsButton from "./ListApplicationsButton"; // To be replaced
import OnboardingConfigurationComponent from "./OnboardingConfigurationComponent";
import OnboardUsersButton from "./OnboardUsersButton";
import Contact from "./Contact";
import { listAccounts } from "../http/listAccounts"; // Assuming HRIS systems are also "accounts"
import ListEmployeesButton from "./ListEmployeesButton";

interface Account {
    id: string;
    provider: string; // e.g., "BambooHR", "Workday"
}

const ManageHRISContent: React.FC = () => {
    const [showOnboardingConfig, setShowOnboardingConfig] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [hrisSystems, setHrisSystems] = useState<Account[]>([]);
    const [selectedHrisId, setSelectedHrisId] = useState<string | null>(
        null
    );
    const [selectedHrisName, setSelectedHrisName] = useState<string>(
        "No HRIS available"
    );

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleManageHRISClick = () => {
        setShowOnboardingConfig(!showOnboardingConfig);
    };

    const fetchHrisSystems = async () => {
        try {
            // Assuming listAccounts can also fetch HRIS accounts or a similar function exists
            const hrisData = await listAccounts();
            if (Array.isArray(hrisData)) {
                setHrisSystems(hrisData);

                if (hrisData.length > 0) {
                    setSelectedHrisId(hrisData[0].id);
                    setSelectedHrisName(hrisData[0].provider);
                } else {
                    setSelectedHrisId(null);
                    setSelectedHrisName("No HRIS available");
                }
            }
        } catch (error) {
            console.error("Error fetching HRIS systems:", error);
        }
    };

    const handleHrisSystemClick = (id: string, name: string) => {
        setSelectedHrisId(id);
        setSelectedHrisName(name);
        setShowDropdown(false);
    };

    useEffect(() => {
        fetchHrisSystems();
    }, []);

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
                        <img src={user} alt="User Icon" className="icon-size" />
                    </div>
                    <h1
                        className="text-xl font-bold"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Manage HRIS & Onboarding
                    </h1>
                </div>
                <div className="flex space-x-4">
                    <img src={notification} alt="Notification Icon" className="icon-size" />
                    <img src={briefcase} alt="Briefcase Icon" className="icon-size" />
                </div>
            </div>
            <hr />
            <div className="flex justify-between mb-6 mt-5">
                <button
                    className="bg-[#FFFFFF] text-[#05C168] border border-[#05C168] px-4 py-2 rounded shadow hover:bg-[#05C168] hover:text-[#FFFFFF] transition-all duration-300"
                    onClick={handleManageHRISClick}
                >
                    Configure Onboarding
                </button>
                <button
                    className="bg-[#E3FFF2] text-[#05C168] border border-[#05C168] px-4 py-2 rounded shadow hover:bg-[#05C168] hover:text-[#FFFFFF] transition-all duration-300"
                    onClick={toggleDropdown}
                >
                    {selectedHrisName}
                </button>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#05C168] rounded shadow-lg z-20">
                        <ul>
                            {hrisSystems.length > 0 ? (
                                hrisSystems.map((system) => (
                                    <li
                                        key={system.id}
                                        className="px-4 py-2 hover:bg-[#E3FFF2] cursor-pointer text-[#05C168]"
                                        onClick={() =>
                                            handleHrisSystemClick(system.id, system.provider)
                                        }
                                    >
                                        {system.provider}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-gray-500">
                                    No HRIS available
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {selectedHrisId && (
                <ListEmployeesButton accountId={selectedHrisId} />
            )}
            {showOnboardingConfig && <OnboardingConfigurationComponent />}
            {selectedHrisId && (
                <OnboardUsersButton hrisId={selectedHrisId} />
            )}
            <Contact />
        </div>
    );
};

export default ManageHRISContent;

