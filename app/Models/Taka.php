<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taka extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'taka_number',
        'meter',
    ];

    protected $casts = [
        'meter' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}