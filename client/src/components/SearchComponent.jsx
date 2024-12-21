// SearchBar.js
import { useState } from 'react';
import useSearchStore from '../store/useSearchStore'; 

const SearchBar = () => {
  const { setQuery, setServiceType, setStatus } = useSearchStore();
  const [localQuery, setLocalQuery] = useState('');
  const [localServiceType, setLocalServiceType] = useState('');
  const [localStatus, setLocalStatus] = useState('');

  const handleQueryChange = (e) => {
    const query = e.target.value;
    setLocalQuery(query);
    setQuery(query); // Update global search state
  };

  const handleServiceTypeChange = (e) => {
    const type = e.target.value;
    setLocalServiceType(type);
    setServiceType(type); // Update global search state
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setLocalStatus(status);
    setStatus(status); // Update global search state
  };

  return (
    <div className="service-search">
      {/* Search Form */}
      <select value={localServiceType} onChange={handleServiceTypeChange}>
        <option value="">Service Type</option>
        <option value="offering-help">Helper</option>
        <option value="help-wanted">Help Wanted</option>
      </select>
      <select value={localStatus} onChange={handleStatusChange}>
        <option value="">Status</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <input
        type="text"
        placeholder="Search services..."
        value={localQuery}
        onChange={handleQueryChange}
      />
    </div>
  );
};

export default SearchBar;
