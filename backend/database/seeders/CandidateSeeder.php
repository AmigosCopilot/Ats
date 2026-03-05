<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\Position;
use Illuminate\Database\Seeder;

class CandidateSeeder extends Seeder
{
    public function run(): void
    {
        $positions = Position::all()->keyBy('title');

        $candidates = [
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah.johnson@email.com',
                'photo' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                'applied_job' => 'Senior Frontend Developer',
                'status' => 'Interview',
                'psychometric_test_status' => 'Completed',
                'applied_date' => '2026-02-05',
                'phone' => '+1 (555) 123-4567',
                'location' => 'San Francisco, CA',
                'experience' => '5 years',
                'raven_score' => 85,
                'cleaver_score' => 'D-I-S-C',
                'personality_type' => 'ENTJ',
            ],
            [
                'name' => 'Michael Chen',
                'email' => 'michael.chen@email.com',
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                'applied_job' => 'Product Manager',
                'status' => 'Psychometric Test',
                'psychometric_test_status' => 'In Progress',
                'applied_date' => '2026-02-03',
                'phone' => '+1 (555) 234-5678',
                'location' => 'New York, NY',
                'experience' => '7 years',
                'raven_score' => 92,
                'cleaver_score' => 'I-D-S-C',
            ],
            [
                'name' => 'Emily Rodriguez',
                'email' => 'emily.rodriguez@email.com',
                'photo' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                'applied_job' => 'UX Designer',
                'status' => 'Screening',
                'psychometric_test_status' => 'Not Started',
                'applied_date' => '2026-02-07',
                'phone' => '+1 (555) 345-6789',
                'location' => 'Austin, TX',
                'experience' => '4 years',
            ],
            [
                'name' => 'James Wilson',
                'email' => 'james.wilson@email.com',
                'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
                'applied_job' => 'Backend Engineer',
                'status' => 'Applied',
                'psychometric_test_status' => 'Not Started',
                'applied_date' => '2026-02-08',
                'phone' => '+1 (555) 456-7890',
                'location' => 'Seattle, WA',
                'experience' => '6 years',
            ],
            [
                'name' => 'Aisha Patel',
                'email' => 'aisha.patel@email.com',
                'photo' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
                'applied_job' => 'Senior Frontend Developer',
                'status' => 'Final Interview',
                'psychometric_test_status' => 'Completed',
                'applied_date' => '2026-01-28',
                'phone' => '+1 (555) 567-8901',
                'location' => 'Boston, MA',
                'experience' => '8 years',
                'raven_score' => 88,
                'cleaver_score' => 'S-I-D-C',
                'personality_type' => 'INFJ',
            ],
            [
                'name' => 'David Kim',
                'email' => 'david.kim@email.com',
                'photo' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
                'applied_job' => 'Product Manager',
                'status' => 'Hired',
                'psychometric_test_status' => 'Completed',
                'applied_date' => '2026-01-15',
                'phone' => '+1 (555) 678-9012',
                'location' => 'Los Angeles, CA',
                'experience' => '6 years',
                'raven_score' => 90,
                'cleaver_score' => 'D-I-C-S',
                'personality_type' => 'ESTJ',
            ],
            [
                'name' => 'Maria Santos',
                'email' => 'maria.santos@email.com',
                'photo' => 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
                'applied_job' => 'Data Analyst',
                'status' => 'Rejected',
                'psychometric_test_status' => 'Completed',
                'applied_date' => '2026-01-20',
                'phone' => '+1 (555) 789-0123',
                'location' => 'Chicago, IL',
                'experience' => '3 years',
                'raven_score' => 72,
            ],
            [
                'name' => 'Alex Thompson',
                'email' => 'alex.thompson@email.com',
                'photo' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
                'applied_job' => 'DevOps Engineer',
                'status' => 'Interview',
                'psychometric_test_status' => 'Completed',
                'applied_date' => '2026-02-01',
                'phone' => '+1 (555) 890-1234',
                'location' => 'Denver, CO',
                'experience' => '5 years',
                'raven_score' => 86,
                'cleaver_score' => 'C-S-I-D',
            ],
        ];

        foreach ($candidates as $data) {
            $title = $data['applied_job'];
            unset($data['applied_job']);
            $position = $positions->get($title);
            if (!$position) {
                continue;
            }
            $data['position_id'] = $position->id;
            Candidate::create($data);
        }
    }
}
