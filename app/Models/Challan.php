<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Challan extends Model
{
    protected $fillable = [
        'challan_number',
        'party_id',
        'quality_id',
        'total_meter',
        'total_lots',
        'date',
        'created_by'
    ];

    protected $casts = [
        'date' => 'date',
        'total_meter' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($challan) {
            if (!$challan->challan_number) {
                $createdBy = $challan->created_by ?? createdBy();
                $lastChallan = static::where('created_by', $createdBy)
                    ->orderBy('challan_number', 'desc')
                    ->first();

                $challan->challan_number = $lastChallan ? $lastChallan->challan_number + 1 : 1;
            }
        });
    }

    public function party()
    {
        return $this->belongsTo(Party::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function items()
    {
        return $this->hasMany(ChallanItem::class);
    }

    public function quality()
    {
        return $this->belongsTo(Quality::class);
    }

    public function getFormattedChallanNumberAttribute()
    {
        return formatChallanNumber($this->challan_number);
    }

    public function getEncryptedIdAttribute()
    {
        return \Illuminate\Support\Facades\Crypt::encryptString($this->id);
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }

    public static function generateChallanNumber()
    {
        $challanNumber = Challan::where('created_by', createdBy())->count();
        if ($challanNumber == 0) {
            return 1;
        } else {
            return $challanNumber + 1;
        }
    }
}