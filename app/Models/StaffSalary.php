<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffSalary extends Model
{
    protected $fillable = [
        'staff_id',
        'staff_salary',
        'salary_type',
        'meter',
        'working_days',
        'total_salary',
        'salary_date',
        'created_by',
    ];

    protected $casts = [
        'staff_salary' => 'decimal:2',
        'meter' => 'decimal:2',
        'total_salary' => 'decimal:2',
        'salary_date' => 'date',
    ];

    public function staff()
    {
        return $this->belongsTo(User::class, 'staff_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getFormattedTotalSalaryAttribute()
    {
        return '₹' . number_format((float)$this->total_salary, 2);
    }

    public function getSalaryTypeDisplayAttribute()
    {
        return match($this->salary_type) {
            'monthly' => 'Monthly',
            'per_meter' => 'Per Meter',
            default => 'Monthly',
        };
    }
}