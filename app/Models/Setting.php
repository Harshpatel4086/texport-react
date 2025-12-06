<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function getValue($key, $userId, $default = 2)
    {
        $setting = self::where('key', $key)
            ->where('user_id', $userId)
            ->first();

        return $setting ? $setting->value : $default;
    }

    public static function setValue($key, $value, $userId)
    {
        return self::updateOrCreate(
            ['key' => $key, 'user_id' => $userId],
            ['value' => $value]
        );
    }
}
