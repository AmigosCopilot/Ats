<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Position;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Position::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('department')) {
            $query->where('department', $request->department);
        }

        $positions = $query->orderBy('created_date', 'desc')->get();

        $data = $positions->map(fn (Position $p) => $this->formatPosition($p));

        return response()->json($data);
    }

    public function show(string $id): JsonResponse
    {
        $position = Position::findOrFail($id);

        return response()->json($this->formatPosition($position));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'status' => 'required|string|in:Open,Closed,Draft',
            'candidates_count' => 'sometimes|integer|min:0',
            'created_date' => 'required|date',
            'description' => 'nullable|string',
            'type' => 'nullable|string|max:255',
        ]);

        $validated['candidates_count'] = $validated['candidates_count'] ?? 0;
        $validated['type'] = $validated['type'] ?? 'Full-time';

        $position = Position::create($validated);

        return response()->json($this->formatPosition($position), 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $position = Position::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'department' => 'sometimes|string|max:255',
            'location' => 'sometimes|string|max:255',
            'status' => 'sometimes|string|in:Open,Closed,Draft',
            'candidates_count' => 'sometimes|integer|min:0',
            'created_date' => 'sometimes|date',
            'description' => 'nullable|string',
            'type' => 'nullable|string|max:255',
        ]);

        $position->update($validated);

        return response()->json($this->formatPosition($position->fresh()));
    }

    public function destroy(string $id): JsonResponse
    {
        $position = Position::findOrFail($id);
        $position->delete();

        return response()->json(null, 204);
    }

    private function formatPosition(Position $p): array
    {
        return [
            'id' => (string) $p->id,
            'title' => $p->title,
            'department' => $p->department,
            'location' => $p->location,
            'status' => $p->status,
            'candidatesCount' => $p->candidates_count,
            'createdDate' => $p->created_date->format('Y-m-d'),
            'description' => $p->description ?? '',
            'type' => $p->type ?? 'Full-time',
        ];
    }
}
