export default async function DashboardPage() {
  const request = await fetch('https://flaggy-ten.vercel.app/api/getFlags');
  const flags = await request.json();

  console.log(flags);
  return <div>DASHBOARD</div>;
}
