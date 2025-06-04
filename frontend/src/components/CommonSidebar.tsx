import React from "react";
import { IntegrationType } from "../lib/types";
import aeroDown from "../resources/Icons/arrowdown.svg";

interface SidebarProps {
    type: IntegrationType;
    setType: React.Dispatch<React.SetStateAction<IntegrationType>>;
}

const CommonSidebar: React.FC<SidebarProps> = ({
    setType,
    type,
}) => {
    return (
        <div className="rounded-sm text-gray-900 w-1/7 p-4 flex flex-col items-center mr-20px">
            <img
                src="stackOne-logo.svg"
                alt="Logo"
                className="mb-4 h-16 "
                style={{ width: "9rem" }}
            />

            <div className="flex flex-col items-center space-y-4">
                <button
                    className={`px-4 py-2 rounded ${type === "ATS"
                            ? "bg-[#05C168] text-white"
                            : "bg-[#E3FFF2] text-[#05C168]"
                        } hover:bg-[#05C168] hover:text-white font-semibold transition-all duration-300 flex items-center space-x-2`}
                    onClick={() => setType("ATS")}
                >
                    <img src={aeroDown} alt="Show less" className="icon-size rotate1-90" />
                    <span>Manage Jobs</span>
                </button>
                <button
                    className={`px-4 py-2 rounded ${type === "HRIS"
                            ? "bg-[#05C168] text-white"
                            : "bg-[#E3FFF2] text-[#05C168]"
                        } hover:bg-[#05C168] hover:text-white font-semibold transition-all duration-300 flex items-center space-x-2`}
                    onClick={() => setType("HRIS")}
                >
                    <img src={aeroDown} alt="Show less" className="icon-size rotate1-90" />
                    <span>Manage Onboarding</span>
                </button>
            </div>
        </div>
    );
};

export default CommonSidebar;
