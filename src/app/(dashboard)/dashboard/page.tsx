'use client';

import { useEffect } from 'react';

export default function DashboardPage() {
  useEffect(() => {
    fetch('https://flaggy-ten.vercel.app/api/getFlags')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log('ERROR', error));
  }, []);
  return <div>DASHBOARD</div>;
}
