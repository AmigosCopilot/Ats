<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');                           // Ej: "Starter", "Professional"
            $table->string('slug')->unique();                 // Ej: "starter", "professional"
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0);      // Precio base
            $table->string('currency', 3)->default('USD');
            $table->string('billing_interval', 20)->default('monthly'); // monthly, yearly
            $table->unsignedInteger('max_positions')->nullable();       // Vacantes máximas (null = ilimitado)
            $table->unsignedInteger('max_candidates_per_month')->nullable(); // Candidatos/mes (null = ilimitado)
            $table->json('features')->nullable();             // ["Feature 1", "Feature 2"]
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0); // Orden al listar
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
