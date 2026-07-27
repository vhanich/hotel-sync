import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';

import type { StaffRole } from '../types/auth';


// interface StaffMember {
//   id: string;
//   staffId: string;
//   name: string;
//   role: StaffRole;
//   status: 'ACTIVE' | 'INACTIVE';
// }



export const StaffManagementPage: React.FC = () => {


  return (
    <Box>
        <Typography>
            Staff Management Page
        </Typography>
    </Box>
  );
};

export default StaffManagementPage;