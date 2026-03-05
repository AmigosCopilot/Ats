<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\Position;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $totalCandidates = Candidate::count();
        $activeJobs = Position::where('status', 'Open')->count();
        $candidatesInProcess = Candidate::whereNotIn('status', ['Hired', 'Rejected'])->count();
        $hiredCandidates = Candidate::where('status', 'Hired')->count();
        $pendingEvaluations = Candidate::where('psychometric_test_status', 'In Progress')
            ->orWhere('psychometric_test_status', 'Not Started')
            ->whereNotIn('status', ['Rejected', 'Hired'])
            ->count();

        $hiringFunnelData = Candidate::select('status as stage', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->map(fn ($row) => [
                'stage' => $row->stage,
                'count' => $row->count,
            ])
            ->toArray();

        $candidatesPerJobData = Position::withCount('candidates')
            ->get()
            ->map(fn ($p) => [
                'job' => $p->title,
                'count' => $p->candidates_count,
            ])
            ->toArray();

        $testScoreRanges = [
            ['range' => '0-20', 'min' => 0, 'max' => 20],
            ['range' => '21-40', 'min' => 21, 'max' => 40],
            ['range' => '41-60', 'min' => 41, 'max' => 60],
            ['range' => '61-80', 'min' => 61, 'max' => 80],
            ['range' => '81-100', 'min' => 81, 'max' => 100],
        ];

        $testScoreData = collect($testScoreRanges)->map(function ($range) {
            $count = Candidate::whereNotNull('raven_score')
                ->where('raven_score', '>=', $range['min'])
                ->where('raven_score', '<=', $range['max'])
                ->count();

            return ['range' => $range['range'], 'count' => $count];
        })->toArray();

        return response()->json([
            'dashboardMetrics' => [
                'totalCandidates' => $totalCandidates,
                'activeJobs' => $activeJobs,
                'candidatesInProcess' => $candidatesInProcess,
                'hiredCandidates' => $hiredCandidates,
                'pendingEvaluations' => $pendingEvaluations,
            ],
            'hiringFunnelData' => $hiringFunnelData,
            'candidatesPerJobData' => $candidatesPerJobData,
            'testScoreData' => $testScoreData,
        ]);
    }
}
