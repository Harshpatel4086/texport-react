<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payslip extends Model
{
    protected $fillable = [
        'worker_id', 'user_id', 'date_from', 'date_to', 'shift_id',
        'total_meters', 'rate', 'total_salary', 'calculation_data'
    ];

    protected $casts = [
        'calculation_data' => 'array',
        'date_from' => 'date',
        'date_to' => 'date'
    ];

    public function worker()
    {
        return $this->belongsTo(Worker::class, 'worker_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
