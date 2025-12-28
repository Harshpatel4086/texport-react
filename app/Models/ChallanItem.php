<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChallanItem extends Model
{
    protected $fillable = [
        'challan_id',
        'sr_number',
        'meter',
        'group_number'
    ];

    protected $casts = [
        'meter' => 'decimal:2',
    ];

    public function challan()
    {
        return $this->belongsTo(Challan::class);
    }
}