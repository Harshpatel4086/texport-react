<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    protected $fillable = [
        'party_name',
        'gst_number',
        'phone_number',
        'email',
        'address',
        'business_name',
        'business_location',
        'created_by',
        'party_number'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($party) {
            if (!$party->party_number) {
                $createdBy = $party->created_by ?? createdBy();
                $lastParty = static::where('created_by', $createdBy)
                    ->orderBy('party_number', 'desc')
                    ->first();

                $party->party_number = $lastParty ? $lastParty->party_number + 1 : 1;
            }
        });
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getFormattedPartyNumberAttribute()
    {
        return formatPartyNumber($this->party_number);
    }

    public static function generatePartyNumber()
    {
        $partyNumber = Party::where('created_by',createdBy())->count();
        if($partyNumber == 0){
            return 1;
        } else {
            return $partyNumber + 1;
        }
    }
}
