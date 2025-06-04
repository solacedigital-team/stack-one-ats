import React, { useState } from "react";
import CommonSidebar from "../components/CommonSidebar";
import { IntegrationType } from "../lib/types";
import ManageATSContent from "./ManageATSContent";
import ManageHRISContent from "./ManageHRISContent";

const MainPage: React.FC = () => {
    const [type, setType] = useState<IntegrationType>("ATS");

    return (
        <div className="flex">
            <CommonSidebar
                setType={setType}
                type={type}
            />
            <div className="flex-1 ml-1/7  bg-white">
                {type === "ATS" ? (
                    <ManageATSContent />
                ) : type === "HRIS" ? (
                    <ManageHRISContent />
                ) : (
                    <div className="p-4">
                        <h1 className="text-2xl font-bold">Select a valid integration type</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;
