import Contact from "src/components/Contact";
import ListEmployeesButton from "src/components/ListEmployeesButton";
import OnboardUsersButton from "src/components/OnboardUsersButton";
import { getAccountById } from "src/http/listAccounts";
import { listEmployess } from "src/http/listEmployees";

export default async function Page(
    { params }: {
        params: Promise<{ account_id: string }>
    }
) {
    const id = (await params).account_id;
    const account = await getAccountById(id);
    const employees = await listEmployess(id);
    return (
        <>
            <ListEmployeesButton account={account} employees={employees} />
            <OnboardUsersButton hrisId={id} />
            <Contact />
        </>
    );
}
