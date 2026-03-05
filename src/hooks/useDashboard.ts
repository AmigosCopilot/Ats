import { useState, useEffect, useCallback } from 'react';
import { api, isApiEnabled } from '../api/client';
import {
  dashboardMetrics,
  hiringFunnelData,
  candidatesPerJobData,
  testScoreData,
} from '../data/mockData';

interface DashboardData {
  dashboardMetrics: typeof dashboardMetrics;
  hiringFunnelData: typeof hiringFunnelData;
  candidatesPerJobData: typeof candidatesPerJobData;
  testScoreData: typeof testScoreData;
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    dashboardMetrics,
    hiringFunnelData,
    candidatesPerJobData,
    testScoreData,
  });
  const [loading, setLoading] = useState(isApiEnabled());
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!isApiEnabled()) return;
    setLoading(true);
    setError(null);
    try {
      const raw = await api.get<{
        dashboardMetrics: Record<string, number>;
        hiringFunnelData: Array<{ stage: string; count: number }>;
        candidatesPerJobData: Array<{ job: string; count: number }>;
        testScoreData: Array<{ range: string; count: number }>;
      }>('/dashboard');
      setData({
        dashboardMetrics: raw.dashboardMetrics ?? dashboardMetrics,
        hiringFunnelData: raw.hiringFunnelData ?? hiringFunnelData,
        candidatesPerJobData: raw.candidatesPerJobData ?? candidatesPerJobData,
        testScoreData: raw.testScoreData ?? testScoreData,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isApiEnabled()) return;
    refetch();
  }, [refetch]);

  return {
    ...data,
    loading,
    error,
    refetch,
  };
}
