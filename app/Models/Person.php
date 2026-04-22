<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
 
#[Table('person')]
#[Fillable(['name', 'phone_number'])]
class Person extends Model
{
    use HasFactory;
}
