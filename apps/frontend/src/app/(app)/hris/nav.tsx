"use client";

import { Account } from "@stackone/react-hub/dist/entities/Account";
import Link from "next/link";
import { useState } from "react";

type Props = {
    accounts: Account[];
};
export default function Nav({ accounts }: Props) {

    const [hrisSystems, setHrisSystems] = useState<Account[]>(accounts || []);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedHrisId, setSelectedHrisId] = useState<string | null>(null);
    const [selectedHrisName, setSelectedHrisName] =
        useState<string>("No HRIS available");


    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    };


    function handleHrisSystemClick(id: string, name: string) {
        setSelectedHrisId(id);
        setSelectedHrisName(name);
        setShowDropdown(false);
    };
    return (
        <div className="flex justify-between mb-6 mt-5">
            <button
                className="bg-[#E3FFF2] text-[#05C168] border border-[#05C168] px-4 py-2 rounded shadow hover:bg-[#05C168] hover:text-[#FFFFFF] transition-all duration-300"
                onClick={toggleDropdown}
            >
                {selectedHrisName}
            </button>
            {showDropdown && (
                <div className="absolute left-0 mt-12 w-48 bg-white border border-[#05C168] rounded shadow-lg z-20">
                    <ul>
                        {hrisSystems.length > 0 ? (
                            hrisSystems.map((system) => (
                                <li
                                    key={system.id}
                                    className="px-4 py-2 hover:bg-[#E3FFF2] cursor-pointer text-[#05C168]"
                                >
                                    <Link href={`/hris/${system.id}`} onClick={() => handleHrisSystemClick(system.id, system.provider)}>
                                        {system.provider}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">No HRIS available</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
