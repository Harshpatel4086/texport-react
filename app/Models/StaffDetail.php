<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffDetail extends Model
{
    protected $fillable = [
        'user_id',
        'phone_number',
        'salary_type',
        'salary_amount',
        'created_by',
    ];

    protected $casts = [
        'salary_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getFormattedSalaryAmountAttribute()
    {
        return $this->salary_amount ? '₹' . number_format((float)$this->salary_amount, 2) : 'Not Set';
    }

    public function getSalaryTypeDisplayAttribute()
    {
        return match($this->salary_type) {
            'monthly' => 'Monthly',
            'daily' => 'Daily',
            'per_meter' => 'Per Meter',
            default => 'Monthly',
        };
    }
}
