<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Starter',
                'slug' => 'starter',
                'description' => 'Ideal para equipos pequeños que comienzan.',
                'price' => 29.00,
                'currency' => 'USD',
                'billing_interval' => 'monthly',
                'max_positions' => 5,
                'max_candidates_per_month' => 50,
                'features' => ['5 vacantes activas', '50 candidatos/mes', 'Soporte por email'],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Professional',
                'slug' => 'professional',
                'description' => 'Para equipos en crecimiento.',
                'price' => 79.00,
                'currency' => 'USD',
                'billing_interval' => 'monthly',
                'max_positions' => 20,
                'max_candidates_per_month' => 200,
                'features' => ['20 vacantes activas', '200 candidatos/mes', 'Tests psicométricos', 'Reportes avanzados', 'Soporte prioritario'],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Enterprise',
                'slug' => 'enterprise',
                'description' => 'Sin límites para grandes organizaciones.',
                'price' => 199.00,
                'currency' => 'USD',
                'billing_interval' => 'monthly',
                'max_positions' => null,
                'max_candidates_per_month' => null,
                'features' => ['Vacantes ilimitadas', 'Candidatos ilimitados', 'API dedicada', 'Soporte 24/7', 'Personalización'],
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($plans as $plan) {
            Plan::updateOrCreate(
                ['slug' => $plan['slug']],
                $plan
            );
        }
    }
}
