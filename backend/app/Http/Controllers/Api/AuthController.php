<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login: email + password → token.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales no son correctas.'],
            ]);
        }

        $user->tokens()->delete();
        $token = $user->createToken('ats-login')->plainTextToken;

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => $this->formatUser($user),
        ]);
    }

    /**
     * Registro: name + email + password → user + token.
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('ats-login')->plainTextToken;

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => $this->formatUser($user),
        ], 201);
    }

    /**
     * Cerrar sesión: revocar token actual.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada.']);
    }

    /**
     * Usuario autenticado (con empresa y plan de la empresa).
     */
    public function user(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->refresh(); // Asegurar datos actuales de la BD (p. ej. empresa_id actualizado)
        return response()->json($this->formatUser($user));
    }

    private function formatUser(User $user): array
    {
        $user->load(['empresa.plan']);
        $plan = $user->empresa?->plan;

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'empresa_id' => $user->empresa_id,
            'empresa' => $user->empresa ? [
                'id' => $user->empresa->id,
                'name' => $user->empresa->name,
                'slug' => $user->empresa->slug,
                'industry' => $user->empresa->industry,
                'website' => $user->empresa->website,
                'email' => $user->empresa->email,
                'phone' => $user->empresa->phone,
                'address' => $user->empresa->address,
                'plan_id' => $user->empresa->plan_id,
                'plan' => $plan ? [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'slug' => $plan->slug,
                    'description' => $plan->description,
                    'price' => (float) $plan->price,
                    'currency' => $plan->currency,
                    'billing_interval' => $plan->billing_interval,
                    'max_positions' => $plan->max_positions,
                    'max_candidates_per_month' => $plan->max_candidates_per_month,
                    'features' => $plan->features,
                ] : null,
            ] : null,
        ];
    }
}
