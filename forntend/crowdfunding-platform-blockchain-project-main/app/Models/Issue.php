<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'issue_type', 'description', 'status', 'admin_notes'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
