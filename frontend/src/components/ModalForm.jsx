import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Select, MenuItem } from "@mui/material";
import PropTypes from 'prop-types';

const ModalForm = ({ open, onClose, formFields, onSubmit, groups = [], subgroups = [] }) => {
  const [formData, setFormData] = useState({});
  const [filteredSubgroups, setFilteredSubgroups] = useState([]);

  useEffect(() => {
    if (open) {
      setFormData({});
      setFilteredSubgroups([]);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'groupId') {
      const selectedGroup = value;
      const relatedSubgroups = subgroups.filter(subgroup => subgroup.groupId === selectedGroup);
      setFilteredSubgroups(relatedSubgroups);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, bgcolor: 'background.paper', m: 'auto', mt: 10, width: 400 }}>
        {formFields.map((field, index) => (
          field.type === 'select' ? (
            <Select
              key={index}
              fullWidth
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              displayEmpty
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>Select an option</MenuItem>
              {field.name === 'groupId' ? (
                groups.map(group => (
                  <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                ))
              ) : field.name === 'subgroupId' ? (
                filteredSubgroups.map(subgroup => (
                  <MenuItem key={subgroup.id} value={subgroup.id}>{subgroup.name}</MenuItem>
                ))
              ) : (
                field.options.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))
              )}
            </Select>
          ) : (
            <TextField
              key={index}
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type || 'text'}
              value={formData[field.name] || ''}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          )
        ))}
        <Button type="submit" variant="contained" fullWidth>Submit</Button>
      </Box>
    </Modal>
  );
};

ModalForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formFields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }))
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  subgroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired
  })),
};

export default ModalForm;