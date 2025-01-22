import DashboardLayout from '../components/layouts/dashboard';

export default function ProtectedLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 