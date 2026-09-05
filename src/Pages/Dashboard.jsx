import React from "react";

import useKpis from "../hooks/Dashboard/useKpis";
import useExpiringMembers from "../hooks/Dashboard/useExpiringMembers";
import useBlockedMembers from "../hooks/Dashboard/useBlockedMembers";

import Kpis from "../Components/Dashboard/Kpis";
import Recentregistration from "../Components/Dashboard/Recentregistration";
import Blockedmember from "../Components/Dashboard/Blockedmember";
import Upcomingexpiry from "../Components/Dashboard/Upcomingexpiry";

const Dashboard = () => {
  const { stats, fetchStats } = useKpis();

  const {
    expiredMembers,
    fetchExpiringMembers,
  } = useExpiringMembers();

  const handleRenewed = () => {
    fetchExpiringMembers();
    fetchStats();
  };

  const {
    successMsg,
    ...blockedMembersProps
  } = useBlockedMembers(handleRenewed);

  return (
    <div className="flex flex-col gap-8 p-6 bg-slate-50 min-h-screen">

      <h1 className="text-2xl font-bold text-slate-900">
        Dashboard
      </h1>

      {successMsg && (
        <div className="rounded-lg bg-green-100 border border-green-300 text-green-700 px-4 py-3">
          {successMsg}
        </div>
      )}

      <Kpis stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Recentregistration
          registrations={stats?.recent_registrations || []}
        />

        <Upcomingexpiry
          expiredMembers={expiredMembers || []}
        />

      </div>

      <Blockedmember
        {...blockedMembersProps}
      />

    </div>
  );
};

export default Dashboard;