<?php

namespace App\Models;

use Laratrust\Models\Role as RoleModel;

class Role extends RoleModel
{
    protected $fillable = ['name', 'display_name', 'description', 'created_by'];
    
    public function creator()
    {
        return $this->belongsTo(\App\Models\User::class, 'created_by');
    }
}