import { useState, useEffect, useCallback } from 'react';
import { api, isApiEnabled } from '../api/client';
import { mockJobs, type Job } from '../data/mockData';

function mapApiPosition(raw: Record<string, unknown>): Job {
  return {
    id: String(raw.id),
    title: String(raw.title),
    department: String(raw.department),
    location: String(raw.location),
    status: raw.status as Job['status'],
    candidatesCount: Number(raw.candidatesCount ?? 0),
    createdDate: String(raw.createdDate),
    description: String(raw.description ?? ''),
    type: String(raw.type ?? 'Full-time'),
  };
}

export function usePositions() {
  const [positions, setPositions] = useState<Job[]>(mockJobs);
  const [loading, setLoading] = useState(isApiEnabled());
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!isApiEnabled()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<unknown[]>('/positions');
      setPositions((data ?? []).map(mapApiPosition));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch positions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isApiEnabled()) return;
    refetch();
  }, [refetch]);

  return { positions, loading, error, refetch };
}
