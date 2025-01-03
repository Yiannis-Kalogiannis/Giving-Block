import { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import useSearchStore from '../store/useSearchStore';
import useUserStore from '../store/useUserStore';

const SearchBar = () => {
  const { setQuery, setServiceType, setStatus, setFilteredUserId } = useSearchStore();
  const { userId } = useUserStore();
  const [localQuery, setLocalQuery] = useState('');
  const [localServiceType, setLocalServiceType] = useState('');
  const [localStatus, setLocalStatus] = useState('');
  const [localFilteredUserId, setLocalFilteredUserId] = useState('');

  const handleQueryChange = (e) => {
    const query = e.target.value;
    setLocalQuery(query);
    setQuery(query);
  };

  const handleServiceTypeChange = (e) => {
    const type = e.target.value;
    setLocalServiceType(type);
    setServiceType(type);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setLocalStatus(status);
    setStatus(status);
  };

  const handleFilteredUserIdChange = (e) => {
    const userId = e.target.value;
    setLocalFilteredUserId(userId);
    setFilteredUserId(userId);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 2,
        padding: 2,
       
        color: 'white', // White text
        borderRadius: '8px',
      }}
    >
      {/* Service Type Select */}
      <FormControl fullWidth variant="outlined" size="small" sx={{ borderRadius: '4px' }}>
        <InputLabel sx={{ color: 'white' }}>Service Type</InputLabel>
        <Select
  value={localServiceType}
  onChange={handleServiceTypeChange}
  label="Service Type"
  sx={{
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#001f3f' },
    '& .MuiInputLabel-root': { color: 'white' },
    '& .MuiInputLabel-outlined': { color: 'white' },
    '& .MuiSelect-root': { backgroundColor: '#001f3f' },
    '& .MuiSelect-icon': { color: 'white' }, // Adjust dropdown arrow color
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        backgroundColor: '#001f3f', // Dark blue background for dropdown
        '& .MuiMenuItem-root': {
          color: 'white', // White text for menu items
          '&:hover': { backgroundColor: '#004080' }, // Lighter blue on hover
        },
      },
    },
  }}
>
  <MenuItem value="" sx={{ color: 'white', backgroundColor: '#001f3f' }}>
    Service Type
  </MenuItem>
  <MenuItem value="offering-help" sx={{ color: 'white', backgroundColor: '#001f3f' }}>
    Helper
  </MenuItem>
  <MenuItem value="help-wanted" sx={{ color: 'white', backgroundColor: '#001f3f' }}>
    Help Wanted
  </MenuItem>
</Select>
      </FormControl>

      {/* User ID Select */}
      <FormControl fullWidth variant="outlined" size="small" sx={{ borderRadius: '4px' }}>
        <InputLabel sx={{ color: 'white' }}>Services Filter</InputLabel>
        <Select
          value={localFilteredUserId}
          onChange={handleFilteredUserIdChange}
          label="User ID"
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#001f3f' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-outlined': { color: 'white' },
            '& .MuiSelect-root': { backgroundColor: '#001f3f' },
            '& .MuiSelect-icon': { color: 'white' }, // Adjust dropdown arrow color
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#001f3f', // Dark blue background for dropdown
                '& .MuiMenuItem-root': {
                  color: 'white', // White text for menu items
                  '&:hover': { backgroundColor: '#004080' }, // Lighter blue on hover
                },
              },
            },
          }}
        >
          <MenuItem value="">All Services</MenuItem>
          <MenuItem value={userId}>My Services</MenuItem>
        </Select>
      </FormControl>

      {/* Status Select */}
      <FormControl fullWidth variant="outlined" size="small" sx={{ borderRadius: '4px' }}>
        <InputLabel sx={{ color: 'white' }}>Status</InputLabel>
        <Select
          value={localStatus}
          onChange={handleStatusChange}
          label="Status"
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#001f3f' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-outlined': { color: 'white' },
            '& .MuiSelect-root': { backgroundColor: '#001f3f' },
            '& .MuiSelect-icon': { color: 'white' }, // Adjust dropdown arrow color
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#001f3f', // Dark blue background for dropdown
                '& .MuiMenuItem-root': {
                  color: 'white', // White text for menu items
                  '&:hover': { backgroundColor: '#004080' }, // Lighter blue on hover
                },
              },
            },
          }}
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
        size="small"
        sx={{
          borderRadius: '4px',
          '& .MuiOutlinedInput-root': {
            color: 'white',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#001f3f',
          },
          '& .MuiInputLabel-root': {
            color: 'white', // Make the placeholder text white
          },
          '& .MuiInputLabel-outlined': {
            color: 'white', // Make the placeholder text white
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;