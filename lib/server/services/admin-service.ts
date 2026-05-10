import {
  getAdminAnalytics,
  getAdminDashboardSnapshot,
  type AdminDashboardSnapshot
} from "@/lib/server/repositories/admin-repo";

export async function fetchAdminDashboardSnapshot(): Promise<AdminDashboardSnapshot | null> {
  try {
    return await getAdminDashboardSnapshot();
  } catch {
    return null;
  }
}

export async function fetchAdminAnalytics() {
  return getAdminAnalytics();
}
