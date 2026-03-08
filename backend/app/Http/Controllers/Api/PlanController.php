<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\JsonResponse;

class PlanController extends Controller
{
    /**
     * Listar planes activos (para mostrar en Settings / suscripción).
     */
    public function index(): JsonResponse
    {
        $plans = Plan::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Plan $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'description' => $p->description,
                'price' => (float) $p->price,
                'currency' => $p->currency,
                'billing_interval' => $p->billing_interval,
                'max_positions' => $p->max_positions,
                'max_candidates_per_month' => $p->max_candidates_per_month,
                'features' => $p->features ?? [],
            ]);

        return response()->json($plans);
    }
}
