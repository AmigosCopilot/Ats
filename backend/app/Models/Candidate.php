<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'photo',
        'position_id',
        'status',
        'psychometric_test_status',
        'applied_date',
        'phone',
        'location',
        'experience',
        'raven_score',
        'cleaver_score',
        'personality_type',
    ];

    protected function casts(): array
    {
        return [
            'applied_date' => 'date',
        ];
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }

    /**
     * Append applied_job (position title) for API compatibility with frontend.
     */
    protected function getAppliedJobAttribute(): string
    {
        return $this->position?->title ?? '';
    }
}
