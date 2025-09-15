interface DashboardProviderProps {
  children: React.ReactNode;
}

const DashboardProvider = async ({ children }: DashboardProviderProps) => {
  return <>{children}</>;
};

export default DashboardProvider;
