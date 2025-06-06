"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
	href: string;
	label: string;
}

const CommonSidebar = () => {
	const pathname = usePathname();

	const navItems: NavItem[] = [
		{ href: "/ats", label: "Manage Jobs" },
		{ href: "/hris", label: "Manage Onboarding" },
	];

	return (
		<div className="rounded-sm text-gray-900 w-1/7 p-4 flex flex-col items-center mr-20px">
			<img
				src="stackOne-logo.svg"
				alt="Logo"
				className="mb-4 h-16 "
				style={{ width: "9rem" }}
			/>

			<div className="flex flex-col items-center space-y-4">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={`px-4 py-2 rounded ${
							pathname === item.href
								? "bg-[#05C168] text-white"
								: "bg-[#E3FFF2] text-[#05C168]"
						} hover:bg-[#05C168] hover:text-white font-semibold transition-all duration-300 flex items-center space-x-2 w-full`}
					>
						{item.label}
					</Link>
				))}
			</div>
		</div>
	);
};

export default CommonSidebar;
