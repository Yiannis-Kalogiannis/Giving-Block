import { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
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
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {/* Service Type Select */}
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>Service Type</InputLabel>
        <Select
          value={localServiceType}
          onChange={handleServiceTypeChange}
          label="Service Type"
          size="small" // Make the Select smaller
        >
          <MenuItem value="">Service Type</MenuItem>
          <MenuItem value="offering-help">Helper</MenuItem>
          <MenuItem value="help-wanted">Help Wanted</MenuItem>
        </Select>
      </FormControl>

      {/* Status Select */}
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={localStatus}
          onChange={handleStatusChange}
          label="Status"
          size="small" // Make the Select smaller
        >
          <MenuItem value="">Status</MenuItem>
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">Inactive</MenuItem>
        </Select>
      </FormControl>

      {/* Search Input */}
      <TextField
        label="Search services..."
        variant="outlined"
        value={localQuery}
        onChange={handleQueryChange}
        fullWidth
        size="small" // Make the TextField smaller
      />
    </Box>
  );
};

export default SearchBar;
