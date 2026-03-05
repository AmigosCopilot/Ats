<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Senior Frontend Developer',
                'department' => 'Engineering',
                'location' => 'Remote',
                'status' => 'Open',
                'candidates_count' => 24,
                'created_date' => '2026-01-15',
                'description' => 'Looking for an experienced frontend developer...',
                'type' => 'Full-time',
            ],
            [
                'title' => 'Product Manager',
                'department' => 'Product',
                'location' => 'New York, NY',
                'status' => 'Open',
                'candidates_count' => 18,
                'created_date' => '2026-01-20',
                'description' => 'Seeking a strategic product manager...',
                'type' => 'Full-time',
            ],
            [
                'title' => 'UX Designer',
                'department' => 'Design',
                'location' => 'San Francisco, CA',
                'status' => 'Open',
                'candidates_count' => 32,
                'created_date' => '2026-01-22',
                'description' => 'Join our design team as a UX Designer...',
                'type' => 'Full-time',
            ],
            [
                'title' => 'Backend Engineer',
                'department' => 'Engineering',
                'location' => 'Remote',
                'status' => 'Open',
                'candidates_count' => 15,
                'created_date' => '2026-02-01',
                'description' => 'We need a skilled backend engineer...',
                'type' => 'Full-time',
            ],
            [
                'title' => 'Data Analyst',
                'department' => 'Analytics',
                'location' => 'Chicago, IL',
                'status' => 'Closed',
                'candidates_count' => 12,
                'created_date' => '2025-12-10',
                'description' => 'Analyze and interpret complex data...',
                'type' => 'Full-time',
            ],
            [
                'title' => 'DevOps Engineer',
                'department' => 'Engineering',
                'location' => 'Austin, TX',
                'status' => 'Open',
                'candidates_count' => 9,
                'created_date' => '2026-01-28',
                'description' => 'Build and maintain our infrastructure...',
                'type' => 'Full-time',
            ],
            [
                'title' => 'Marketing Manager',
                'department' => 'Marketing',
                'location' => 'Remote',
                'status' => 'Draft',
                'candidates_count' => 0,
                'created_date' => '2026-02-08',
                'description' => 'Lead our marketing initiatives...',
                'type' => 'Full-time',
            ],
        ];

        foreach ($jobs as $job) {
            Position::create($job);
        }
    }
}
