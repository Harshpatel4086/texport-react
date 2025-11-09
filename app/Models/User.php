<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Contracts\LaratrustUser;
use Laratrust\Traits\HasRolesAndPermissions;
// email verification removed for staff users, only owners will have verified emails
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;

class User extends Authenticatable implements LaratrustUser, MustVerifyEmail
{
    use HasFactory, Notifiable, HasRolesAndPermissions, MustVerifyEmailTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'created_by',
        'is_staff',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_staff' => 'boolean',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function staffMembers()
    {
        return $this->hasMany(User::class, 'created_by')->where('is_staff', true);
    }

    public function scopeStaff($query)
    {
        return $query->where('is_staff', true);
    }

    public function scopeOwners($query)
    {
        return $query->where('is_staff', false);
    }

    public function staffDetail()
    {
        return $this->hasOne(StaffDetail::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'staff_id');
    }

    /**
     * Determine if the user must verify their email address.
     */
    public function mustVerifyEmail(): bool
    {
        return !$this->is_staff;
    }
}
