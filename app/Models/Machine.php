<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'number',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function workerAssignments()
    {
        return $this->hasMany(WorkerMachineAssignment::class);
    }

    public function productionEntries()
    {
        return $this->hasMany(WorkerDailyProductionEntry::class);
    }
}