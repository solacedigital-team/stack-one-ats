import type { PropsWithChildren } from "react";
import CommonSidebar from "src/components/CommonSidebar";

export default function AppLayout({ children }: PropsWithChildren) {
	return (
		<main className="flex">
			<CommonSidebar />
			{children}
		</main>
	);
}
