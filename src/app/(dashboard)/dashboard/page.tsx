'use client';
import axios from 'axios';
import { useEffect } from 'react';

export default function DashboardPage() {
  useEffect(() => {
    axios
      .get('https://flaggy-ten.vercel.app/api/getFlags')
      .then((response) => {
        return response.data();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  }, []);
  return <div>DASHBOARD</div>;
}
