import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaTasks, FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';


const links = [
  { text: 'stats', path: '.', icon: <IoBarChartSharp /> },
  { text: 'add task', path: 'add-task', icon: <FaTasks /> },
  { text: 'all tasks', path: 'all-tasks', icon: <MdQueryStats /> },
  { text: 'profile', path: 'profile', icon: <ImProfile /> },
  
];


export default links;