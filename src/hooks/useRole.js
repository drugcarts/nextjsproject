import {useState} from 'react';

export function useRole() {
  const type = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  const [role, setRole] = useState(type);

  return {
    role
  };
}