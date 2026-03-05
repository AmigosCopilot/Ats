import { useState, useEffect, useCallback } from 'react';
import { api, isApiEnabled } from '../api/client';
import { mockCandidates, type Candidate } from '../data/mockData';

function mapApiCandidate(raw: Record<string, unknown>): Candidate {
  return {
    id: String(raw.id),
    name: String(raw.name),
    email: String(raw.email),
    photo: String(raw.photo ?? ''),
    appliedJob: String(raw.appliedJob ?? ''),
    status: raw.status as Candidate['status'],
    psychometricTestStatus: (raw.psychometricTestStatus as Candidate['psychometricTestStatus']) ?? 'N/A',
    appliedDate: String(raw.appliedDate),
    phone: String(raw.phone ?? ''),
    location: String(raw.location ?? ''),
    experience: String(raw.experience ?? ''),
    ravenScore: raw.ravenScore != null ? Number(raw.ravenScore) : undefined,
    cleaverScore: raw.cleaverScore != null ? String(raw.cleaverScore) : undefined,
    personalityType: raw.personalityType != null ? String(raw.personalityType) : undefined,
  };
}

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [loading, setLoading] = useState(isApiEnabled());
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!isApiEnabled()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<unknown[]>('/candidates');
      setCandidates((data ?? []).map(mapApiCandidate));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isApiEnabled()) return;
    refetch();
  }, [refetch]);

  const updateCandidate = useCallback(async (id: string, updates: Partial<Pick<Candidate, 'status' | 'psychometricTestStatus'>>) => {
    if (!isApiEnabled()) {
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
      );
      return;
    }
    try {
      await api.put(`/candidates/${id}`, {
        status: updates.status,
        psychometric_test_status: updates.psychometricTestStatus,
      });
      await refetch();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update candidate');
    }
  }, [refetch]);

  return { candidates, loading, error, refetch, updateCandidate };
}
