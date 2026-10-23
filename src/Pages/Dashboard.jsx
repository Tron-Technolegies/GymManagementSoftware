import React, { useEffect, useState } from "react";

import useKpis from "../hooks/Dashboard/useKpis";
import useExpiringMembers from "../hooks/Dashboard/useExpiringMembers";
import useBlockedMembers from "../hooks/Dashboard/useBlockedMembers";

import Kpis from "../Components/Dashboard/Kpis";
import Recentregistration from "../Components/Dashboard/Recentregistration";
import Blockedmember from "../Components/Dashboard/Blockedmember";
import Upcomingexpiry from "../Components/Dashboard/Upcomingexpiry";

import { getBranches } from "../api/branches";

const Dashboard = () => {
  const adminUser = JSON.parse(
    localStorage.getItem("adminUser") || "{}"
  );

  const isTenantAdmin =
    adminUser?.role === "TENANT_ADMIN";

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] =
    useState("all");
  const [branchLoading, setBranchLoading] =
    useState(false);

  const branchId =
    isTenantAdmin && selectedBranch !== "all"
      ? Number(selectedBranch)
      : null;

  const { stats, fetchStats } = useKpis(branchId);

  const {
    expiredMembers,
    fetchExpiringMembers,
  } = useExpiringMembers(branchId);

  // Fetch branches for tenant admin.
  useEffect(() => {
    if (!isTenantAdmin) return;

    let cancelled = false;

    const loadBranches = async () => {
      try {
        setBranchLoading(true);

        const res = await getBranches();
        const data = res.data;

        const branchList = Array.isArray(data)
          ? data
          : data?.results ??
          data?.branches ??
          [];

        if (!cancelled) {
          setBranches(branchList);
        }
      } catch (error) {
        console.error(
          "Failed to load branches:",
          error
        );

        if (!cancelled) {
          setBranches([]);
        }
      } finally {
        if (!cancelled) {
          setBranchLoading(false);
        }
      }
    };

    loadBranches();

    return () => {
      cancelled = true;
    };
  }, [isTenantAdmin]);

  // Refresh upcoming expiries when the selected branch changes.
  useEffect(() => {
    fetchExpiringMembers(branchId);
  }, [branchId, fetchExpiringMembers]);

  const handleRenewed = () => {
    fetchExpiringMembers(branchId);
    fetchStats();
  };

  const {
    successMsg,
    ...blockedMembersProps
  } = useBlockedMembers(handleRenewed, branchId);

  return (
    <div className="flex flex-col gap-8 p-6 bg-white-100 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        {isTenantAdmin && (
          <div className="flex items-center gap-3">
            <label
              htmlFor="dashboard-branch"
              className="text-sm font-medium text-slate-700 whitespace-nowrap"
            >
              Branch:
            </label>

            <select
              id="dashboard-branch"
              value={selectedBranch}
              onChange={(e) =>
                setSelectedBranch(e.target.value)
              }
              disabled={branchLoading}
              className="w-full sm:w-56 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="all">
                All Branches
              </option>

              {branches.map((branch) => (
                <option
                  key={branch.id}
                  value={String(branch.id)}
                >
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {successMsg && (
        <div className="rounded-lg bg-green-100 border border-green-300 text-green-700 px-4 py-3">
          {successMsg}
        </div>
      )}

      <Kpis stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Recentregistration
          registrations={
            stats?.recent_registrations || []
          }
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