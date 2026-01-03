<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'invoice_number',
        'challan_id',
        'party_id',
        'quality_id',
        'total_meter',
        'price',
        'base_amount',
        'cgst_percentage',
        'sgst_percentage',
        'igst_percentage',
        'cgst_amount',
        'sgst_amount',
        'igst_amount',
        'total_tax',
        'subtotal',
        'round_off',
        'final_amount',
        'date',
        'created_by'
    ];

    protected $casts = [
        'date' => 'date',
        'total_meter' => 'decimal:2',
        'price' => 'decimal:2',
        'base_amount' => 'decimal:2',
        'cgst_percentage' => 'decimal:2',
        'sgst_percentage' => 'decimal:2',
        'igst_percentage' => 'decimal:2',
        'cgst_amount' => 'decimal:2',
        'sgst_amount' => 'decimal:2',
        'igst_amount' => 'decimal:2',
        'total_tax' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'round_off' => 'decimal:2',
        'final_amount' => 'decimal:2',
    ];

    public function challan()
    {
        return $this->belongsTo(Challan::class);
    }

    public function party()
    {
        return $this->belongsTo(Party::class);
    }

    public function quality()
    {
        return $this->belongsTo(Quality::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getFormattedInvoiceNumberAttribute()
    {
        return formatInvoiceNumber($this->invoice_number);
    }

    public function getEncryptedIdAttribute()
    {
        return \Illuminate\Support\Facades\Crypt::encryptString($this->id);
    }

    public static function calculateTaxes($baseAmount, $cgstPercentage = 0, $sgstPercentage = 0, $igstPercentage = 0)
    {
        $cgstAmount = ($baseAmount * $cgstPercentage) / 100;
        $sgstAmount = ($baseAmount * $sgstPercentage) / 100;
        $igstAmount = ($baseAmount * $igstPercentage) / 100;
        
        $totalTax = $cgstAmount + $sgstAmount + $igstAmount;
        $subtotal = $baseAmount + $totalTax;
        
        $finalAmount = round($subtotal);
        $roundOff = $finalAmount - $subtotal;
        
        return [
            'cgst_amount' => round($cgstAmount, 2),
            'sgst_amount' => round($sgstAmount, 2),
            'igst_amount' => round($igstAmount, 2),
            'total_tax' => round($totalTax, 2),
            'subtotal' => round($subtotal, 2),
            'round_off' => round($roundOff, 2),
            'final_amount' => $finalAmount
        ];
    }
}