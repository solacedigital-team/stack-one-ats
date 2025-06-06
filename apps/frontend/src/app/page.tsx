import { ArrowRight, BriefcaseIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	return (
		<main className="flex-1 p-8 max-w-6xl mx-auto">
			<div className="space-y-8">
				<section className="text-center py-12">
					<h1 className="text-4xl font-bold mb-4">StackOne HRIS Dashboard</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Manage your HR and recruitment systems from a single interface
					</p>
				</section>

				<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
						<div className="flex items-center mb-4">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
								<UserIcon className="h-6 w-6 text-blue-600" />
							</div>
							<h2 className="text-2xl font-semibold">HRIS Management</h2>
						</div>
						<p className="text-gray-600 mb-6">
							Manage employee data, configure onboarding workflows, and
							streamline HR processes.
						</p>
						<Link
							href="/hris"
							className="flex items-center text-blue-600 font-medium hover:text-blue-800"
						>
							Go to HRIS Dashboard
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</div>

					<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
						<div className="flex items-center mb-4">
							<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
								<BriefcaseIcon className="h-6 w-6 text-green-600" />
							</div>
							<h2 className="text-2xl font-semibold">ATS Management</h2>
						</div>
						<p className="text-gray-600 mb-6">
							Track job postings, manage applications, and streamline your
							recruitment pipeline.
						</p>
						<Link
							href="/ats"
							className="flex items-center text-green-600 font-medium hover:text-green-800"
						>
							Go to ATS Dashboard
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
