<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkerDailyProductionEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'worker_id',
        'machine_id',
        'shift_id',
        'meters',
    ];

    protected $casts = [
        'date' => 'date',
        'meters' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function worker()
    {
        return $this->belongsTo(Worker::class);
    }

    public function machine()
    {
        return $this->belongsTo(Machine::class);
    }
}