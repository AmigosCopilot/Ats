<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'department',
        'location',
        'status',
        'candidates_count',
        'created_date',
        'description',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'created_date' => 'date',
        ];
    }

    public function candidates(): HasMany
    {
        return $this->hasMany(Candidate::class, 'position_id');
    }
}
