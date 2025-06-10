"use client";
import type React from "react";

interface OnboardUsersButtonProps {
	hrisId: string;
}

const OnboardUsersButton: React.FC<OnboardUsersButtonProps> = ({ hrisId }) => {
	const handleOnboardUsers = () => {
		// Logic to initiate onboarding for users from ATS to HRIS with hrisId
		console.log(`Initiating onboarding for HRIS ID: ${hrisId}`);
		alert(`Onboarding users for HRIS ID: ${hrisId}. (Placeholder)`);
	};

	return (
		<button
			type="button"
			onClick={handleOnboardUsers}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow mb-4 w-full"
		>
			Onboard New Users from ATS
		</button>
	);
};

export default OnboardUsersButton;
