import React, { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineBell } from 'react-icons/ai';
import LinkAccountButton from './LinkAccountButton';
import ListJobsPostingsButton from './ListJobsPostingsButton';
import ListApplicationsButton from './ListApplicationsButton';
import Contact from './Contact';
import { listAccounts } from '../utils/listAccounts'; // Import your function

const ManageATSContent: React.FC = () => {
  const [showLinkAccount, setShowLinkAccount] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]); // Initialize state for accounts
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null); // State for selected account ID
  const [selectedAccountName, setSelectedAccountName] = useState<string>('Select Account'); // State for selected account name

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleManageATSClick = () => {
    console.log('Manage Jobs Portals clicked');
    console.log('showLinkAccount before:', showLinkAccount);
    setShowLinkAccount(!showLinkAccount);
    console.log('showLinkAccount after:', !showLinkAccount);
  };

  const fetchAccounts = async () => {
    try {
      const accountsData = await listAccounts();
      if (Array.isArray(accountsData)) {
        setAccounts(accountsData);
        if (accountsData.length > 0) {
          setSelectedAccountId(accountsData[0].id); // Set the default account ID if there's any
          setSelectedAccountName('Select Account'); // Set the default account name if there's any
        }
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleAccountClick = (id: string, name: string) => {
    setSelectedAccountId(id); // Update the selected account ID
    setSelectedAccountName(name); // Update the selected account name
    setShowDropdown(false); // Close dropdown on account selection
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <AiOutlineUser className="text-gray-600 text-3xl" />
          </div>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Manage Jobs</h1>
        </div>
        <div className="flex space-x-4">
          <AiOutlineBell className="text-gray-600 text-3xl cursor-pointer" />
          <AiOutlineMail className="text-gray-600 text-3xl cursor-pointer" />
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <button
          className="bg-[#FFFFFF] text-[#05C168] border border-[#05C168] px-4 py-2 rounded shadow hover:bg-[#05C168] hover:text-[#FFFFFF] transition-all duration-300"
          onClick={handleManageATSClick}
        >
          Manage Jobs Portals
        </button>

        <button
          className="bg-[#E3FFF2] text-[#05C168] border border-[#05C168] px-4 py-2 rounded shadow hover:bg-[#05C168] hover:text-[#FFFFFF] transition-all duration-300"
          onClick={toggleDropdown}
        >
          {selectedAccountName || 'Select Account'} {/* Display selected account name or placeholder */}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-[#05C168] rounded shadow-lg z-20">
            <ul>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <li 
                    key={account.id} 
                    className="px-4 py-2 hover:bg-[#E3FFF2] cursor-pointer text-[#05C168]"
                    onClick={() => handleAccountClick(account.id, account.provider)}
                  >
                    {account.provider}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No accounts available</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {showLinkAccount && <LinkAccountButton />}
      {selectedAccountId && <ListJobsPostingsButton accountId={selectedAccountId} />}
      {selectedAccountId && <ListApplicationsButton accountId={selectedAccountId} />}
      <Contact />
    </div>
  );
};

export default ManageATSContent;