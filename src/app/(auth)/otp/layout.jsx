'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import DropSpinner from '@/components/admin/spinner/DropSpinner';

export default function ProtectedLayout({ children }) {
    const { loading } = useSelector((state) => state.common)
    return <>
        {loading && <DropSpinner />}
        {children}
    </>
}
