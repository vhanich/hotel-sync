import { Prisma } from '@prisma/client';

export const roomsToCreate: Prisma.RoomCreateManyInput[] = [
  // Floor 1
  {
    number: '101',
    floor: 1,
    type: 'STANDARD',
    capacity: 1,
    maintenanceStatus: 'UNDER_MAINTENANCE',
  },
  {
    number: '102',
    floor: 1,
    type: 'STANDARD',
    capacity: 2,
    housekeepingStatus: 'CLEANING'

  },
  {
    number: '103',
    floor: 1,
    type: 'SUPERIOR',
    capacity: 2,
  },
  {
    number: '104',
    floor: 1,
    type: 'DELUXE',
    capacity: 2,
    housekeepingStatus: 'DIRTY',
  },
  {
    number: '105',
    floor: 1,
    type: 'PREMIUM',
    capacity: 3,
    housekeepingStatus: 'INSPECTION_REQUIRED'

  },
  {
    number: '106',
    floor: 1,
    type: 'LUXURY',
    capacity: 4,
  },

  // Floor 2
  {
    number: '201',
    floor: 2,
    type: 'STANDARD',
    capacity: 1,
    housekeepingStatus: 'INSPECTION_REQUIRED'
  },
  {
    number: '202',
    floor: 2,
    type: 'STANDARD',
    capacity: 2,
  },
  {
    number: '203',
    floor: 2,
    type: 'SUPERIOR',
    capacity: 2,
    housekeepingStatus: 'DIRTY'
  },
  {
    number: '204',
    floor: 2,
    type: 'SUPERIOR',
    capacity: 2,
  },
  {
    number: '205',
    floor: 2,
    type: 'DELUXE',
    capacity: 2,
  },
  {
    number: '206',
    floor: 2,
    type: 'PREMIUM',
    capacity: 3,
    housekeepingStatus: 'CLEANING'
  },

  // Floor 3
  {
    number: '301',
    floor: 3,
    type: 'STANDARD',
    capacity: 1,
    housekeepingStatus: 'DIRTY'
  },
  {
    number: '302',
    floor: 3,
    type: 'STANDARD',
    capacity: 2,
  },
  {
    number: '303',
    floor: 3,
    type: 'SUPERIOR',
    capacity: 2,
  },
  {
    number: '304',
    floor: 3,
    type: 'DELUXE',
    capacity: 2,
  },
  {
    number: '305',
    floor: 3,
    type: 'DELUXE',
    capacity: 3,
  },
  {
    number: '306',
    floor: 3,
    type: 'PREMIUM',
    capacity: 4,
  },

  // Floor 4
  {
    number: '401',
    floor: 4,
    type: 'SUPERIOR',
    capacity: 2,
    housekeepingStatus: 'DIRTY'
  },
  {
    number: '402',
    floor: 4,
    type: 'SUPERIOR',
    capacity: 2,
  },
  {
    number: '403',
    floor: 4,
    type: 'DELUXE',
    capacity: 2,
  },
  {
    number: '404',
    floor: 4,
    type: 'DELUXE',
    capacity: 3,
  },
  {
    number: '405',
    floor: 4,
    type: 'PREMIUM',
    capacity: 3,
  },
  {
    number: '406',
    floor: 4,
    type: 'LUXURY',
    capacity: 4,
  },

  // Floor 5
  {
    number: '501',
    floor: 5,
    type: 'DELUXE',
    capacity: 2,
  },
  {
    number: '502',
    floor: 5,
    type: 'DELUXE',
    capacity: 3,
  },
  {
    number: '503',
    floor: 5,
    type: 'PREMIUM',
    capacity: 3,
  },
  {
    number: '504',
    floor: 5,
    type: 'PREMIUM',
    capacity: 4,
  },
  {
    number: '505',
    floor: 5,
    type: 'LUXURY',
    capacity: 4,
  },
  {
    number: '506',
    floor: 5,
    type: 'LUXURY',
    capacity: 5,
  },
];