<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkerMachineAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'worker_id',
        'machine_id',
        'shift_id',
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