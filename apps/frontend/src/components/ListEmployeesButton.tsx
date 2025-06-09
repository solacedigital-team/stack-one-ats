"use client";
import { EmployeeData, AccountData } from '@repo/api-client';
import { ArrowDownIcon } from 'lucide-react';
import type React from "react";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function ListEmployeesButton({
    account,
    employees = [],
}: {
    account: AccountData;
    employees: EmployeeData[];
}) {
    // const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const [visibleEmployees, setVisibleEmployees] = useState<number>(2);

    // const handleFetchEmployees = async () => {
    //     if (!accountId) return;
    //     const employeesData = await listEmployess(accountId);
    //     console.log("Fetched employees data:", employeesData);
    //     if (!employeesData || !employeesData.data) {
    //         console.error("No employee data found");
    //         console.error(employeesData);
    //         setEmployees([]);
    //         return;
    //     }
    //     if (Array.isArray(employeesData.data)) {
    //         setEmployees(employeesData.data);
    //     }
    // };

    const handleShowMore = () => {
        // If using pagination and fetching more data:
        // if (nextPageCursor) {
        //   handleFetchEmployees(nextPageCursor);
        // }
        // For simple show more from existing data:
        setVisibleEmployees((prev) => Math.min(prev + 2, employees.length));
    };

    const handleShowLess = () => {
        setVisibleEmployees((prev) => Math.max(prev - 2, 2));
    };

    // useEffect(() => {
    //     handleFetchEmployees();
    // }, [accountId]);

    return (
        <div className="relative z-1">
            {employees.length === 0 ? (
                <div className="flex items-center justify-center min-h-[200px] bg-[#E3FFF2] border-2 border-[#05C168] rounded-lg p-4 text-[#A8D5BA]">
                    <h2 className="text-xl font-bold">Employee data is not available</h2>
                </div>
            ) : (
                <TransitionGroup className="sliding-content">
                    {employees.slice(0, visibleEmployees).map((employee, index) => (
                        <CSSTransition key={employee.id} timeout={300} classNames="slide">
                            <div id={`employee-card-${index}`} className="job-card"> {/* Reusing job-card style */}
                                <h2 className="job-title">{employee.first_name} {employee.last_name}</h2>
                                <p>
                                    <strong>Employee ID (Remote):</strong>{" "}
                                    <span
                                        id={`truncated-text-employee-${index}`}
                                        className="truncated-text"
                                    >
                                        {employee.remote_id}
                                    </span>
                                </p>
                                {/* Add more employee details here as needed */}
                                {/* Example: <p><strong>Email:</strong> {employee.email}</p> */}
                                <div
                                    id={`employee-badge-container-${index}`}
                                    className="job-badge-container"
                                >
                                    <p>Created at</p>
                                    <span className="job-badge">
                                        {new Date(employee.created_at).toLocaleString()}
                                    </span>
                                    <p>Updated at</p>
                                    <span className="job-badge">
                                        {new Date(employee.updated_at).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
            <div className="flex justify-between mt-4">
                {/* Show More Button Logic */}
                {/* If using pagination: visibleEmployees < totalEmployeesCount && nextPageCursor */}
                {/* For simple show more: */}
                {employees.length > 0 && visibleEmployees < employees.length && (
                    <button className="show-more-button" onClick={handleShowMore}>
                        <ArrowDownIcon className="icon-size" />
                    </button>
                )}
                {/* Show Less Button Logic */}
                {employees.length > 0 && visibleEmployees > 2 && (
                    <button className="show-more-button" onClick={handleShowLess}>
                        <ArrowDownIcon className="icon-size rotate-180" />
                    </button>
                )}
            </div>
            <pre>
                <code className="json-output">
                    {JSON.stringify(account, null, 2)}
                </code>
            </pre>
        </div>
    );
};
