<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Link extends Model
{
    protected $fillable = [
        'url',
        'slug',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function generateUniqueSlug()
    {
        do {
            $code = Str::random(7);
        } while (static::where('slug', $code)->exists());

        return $code;
    }

    public function visit()
    {
        $this->increment('visits');
    }
}
