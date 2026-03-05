<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\Position;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Candidate::with('position');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('position_id')) {
            $query->where('position_id', $request->position_id);
        }

        $candidates = $query->orderBy('applied_date', 'desc')->get();

        $data = $candidates->map(fn (Candidate $c) => $this->formatCandidate($c));

        return response()->json($data);
    }

    public function show(string $id): JsonResponse
    {
        $candidate = Candidate::with('position')->findOrFail($id);

        return response()->json($this->formatCandidate($candidate));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'photo' => 'nullable|string',
            'position_id' => 'required|exists:positions,id',
            'status' => 'required|string|in:Applied,Screening,Interview,Psychometric Test,Final Interview,Hired,Rejected',
            'psychometric_test_status' => 'nullable|string|in:Not Started,In Progress,Completed,N/A',
            'applied_date' => 'required|date',
            'phone' => 'nullable|string',
            'location' => 'nullable|string',
            'experience' => 'nullable|string',
            'raven_score' => 'nullable|integer|min:0|max:100',
            'cleaver_score' => 'nullable|string',
            'personality_type' => 'nullable|string',
        ]);

        $candidate = Candidate::create($validated);
        $position = Position::find($validated['position_id']);
        $position->increment('candidates_count');

        return response()->json($this->formatCandidate($candidate->load('position')), 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $candidate = Candidate::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'photo' => 'nullable|string',
            'position_id' => 'sometimes|exists:positions,id',
            'status' => 'sometimes|string|in:Applied,Screening,Interview,Psychometric Test,Final Interview,Hired,Rejected',
            'psychometric_test_status' => 'nullable|string|in:Not Started,In Progress,Completed,N/A',
            'applied_date' => 'sometimes|date',
            'phone' => 'nullable|string',
            'location' => 'nullable|string',
            'experience' => 'nullable|string',
            'raven_score' => 'nullable|integer|min:0|max:100',
            'cleaver_score' => 'nullable|string',
            'personality_type' => 'nullable|string',
        ]);

        $candidate->update($validated);

        return response()->json($this->formatCandidate($candidate->fresh('position')));
    }

    public function destroy(string $id): JsonResponse
    {
        $candidate = Candidate::findOrFail($id);
        $candidate->position?->decrement('candidates_count');
        $candidate->delete();

        return response()->json(null, 204);
    }

    private function formatCandidate(Candidate $c): array
    {
        return [
            'id' => (string) $c->id,
            'name' => $c->name,
            'email' => $c->email,
            'photo' => $c->photo ?? '',
            'appliedJob' => $c->position?->title ?? '',
            'position_id' => $c->position_id,
            'status' => $c->status,
            'psychometricTestStatus' => $c->psychometric_test_status,
            'appliedDate' => $c->applied_date->format('Y-m-d'),
            'phone' => $c->phone ?? '',
            'location' => $c->location ?? '',
            'experience' => $c->experience ?? '',
            'ravenScore' => $c->raven_score,
            'cleaverScore' => $c->cleaver_score,
            'personalityType' => $c->personality_type,
        ];
    }
}
