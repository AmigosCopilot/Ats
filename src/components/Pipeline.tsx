import { mockCandidates, Candidate } from '../data/mockData';
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const stages = [
  { id: 'Applied', label: 'Applied', color: 'bg-gray-100' },
  { id: 'Screening', label: 'Screening', color: 'bg-blue-100' },
  { id: 'Interview', label: 'Interview', color: 'bg-indigo-100' },
  { id: 'Psychometric Test', label: 'Psychometric Test', color: 'bg-purple-100' },
  { id: 'Final Interview', label: 'Final Interview', color: 'bg-amber-100' },
  { id: 'Hired', label: 'Hired', color: 'bg-green-100' },
  { id: 'Rejected', label: 'Rejected', color: 'bg-red-100' }
];

interface CandidateCardProps {
  candidate: Candidate;
}

function CandidateCard({ candidate }: CandidateCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'candidate',
    item: { id: candidate.id, currentStatus: candidate.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg border border-gray-200 p-3 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={candidate.photo}
          alt={candidate.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-gray-900 truncate">{candidate.name}</div>
          <div className="text-xs text-gray-500 truncate">{candidate.appliedJob}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600">{candidate.experience}</span>
        {candidate.psychometricTestStatus === 'Completed' && (
          <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-medium">
            Tested
          </span>
        )}
      </div>
    </div>
  );
}

interface StageColumnProps {
  stage: typeof stages[0];
  candidates: Candidate[];
  onDrop: (candidateId: string, newStatus: string) => void;
}

function StageColumn({ stage, candidates, onDrop }: StageColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'candidate',
    drop: (item: { id: string; currentStatus: string }) => {
      if (item.currentStatus !== stage.id) {
        onDrop(item.id, stage.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`flex-shrink-0 w-72 ${isOver ? 'ring-2 ring-indigo-500 rounded-lg' : ''}`}
    >
      <div className={`${stage.color} rounded-lg p-3 mb-3`}>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 text-sm">{stage.label}</h3>
          <span className="text-xs font-semibold text-gray-600 bg-white px-2 py-1 rounded-full">
            {candidates.length}
          </span>
        </div>
      </div>
      <div className="space-y-3 min-h-[200px]">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}

export function Pipeline() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);

  const handleDrop = (candidateId: string, newStatus: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? { ...c, status: newStatus as Candidate['status'] }
          : c
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <div>
          <h1 className="font-semibold text-gray-900 mb-1">Pipeline View</h1>
          <p className="text-sm text-gray-600">Drag and drop candidates to move them through the hiring pipeline</p>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {stages.map((stage) => {
              const stageCandidates = candidates.filter((c) => c.status === stage.id);
              return (
                <StageColumn
                  key={stage.id}
                  stage={stage}
                  candidates={stageCandidates}
                  onDrop={handleDrop}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
