<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('photo')->nullable();
            $table->foreignId('position_id')->constrained('positions')->cascadeOnDelete();
            $table->string('status'); // Applied, Screening, Interview, etc.
            $table->string('psychometric_test_status')->default('Not Started'); // Not Started, In Progress, Completed, N/A
            $table->date('applied_date');
            $table->string('phone')->nullable();
            $table->string('location')->nullable();
            $table->string('experience')->nullable();
            $table->unsignedTinyInteger('raven_score')->nullable();
            $table->string('cleaver_score')->nullable();
            $table->string('personality_type')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
