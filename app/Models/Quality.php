<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quality extends Model
{
    protected $fillable = [
        'quality_name',
        'description',
        'status',
        'user_id',
        'cgst_percentage',
        'sgst_percentage',
        'igst_percentage'
    ];

    protected $casts = [
        'status' => 'boolean',
        'cgst_percentage' => 'decimal:2',
        'sgst_percentage' => 'decimal:2',
        'igst_percentage' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($quality) {
            if (!$quality->user_id) {
                $quality->user_id = createdBy();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function challans()
    {
        return $this->hasMany(Challan::class);
    }
}