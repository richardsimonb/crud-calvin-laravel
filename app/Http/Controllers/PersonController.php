<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PersonController extends Controller
{
    public function index() : JsonResponse
    {
        $person = Person::all();
        if ($person->isEmpty()) {
            return response()->json(['message' => 'Data not found'], 404);
        }
        return response()->json($person, 200);
    }

    public function show($id) : JsonResponse
    {
        $person = Person::find($id);
        if (!$person) {
            return response()->json(['message' => 'Data not found'], 404);
        }
        return response()->json($person, 200);
    }

    public function store(Request $request) : JsonResponse
    {
        if($request->expectsJson()) {
            return response()->json(['message' => 'Only Accept JSON'], 400);
        }
        $request->validate([
            'name' => 'required|string',
            'phone_number' => 'required|string',
        ]);
        if (Person::where('name', $request->name)->exists()) {
            return response()->json(['message' => 'Data already exists'], 409);
        }
        $person = Person::create($request->all());
        return response()->json($person, 200);
    }

    public function update(Request $request, $id) : JsonResponse
    {
        $person = Person::find($id);
        if (!$person) {
            return response()->json(['message' => 'Data not found'], 404);
        }
        $request->validate([
            'phone_number' => 'required|string',
        ]);
        $person->phone_number = $request->phone_number;
        $person->update();
        return response()->json($person, 200);
    }

    public function destroy($id) : JsonResponse
    {
        $person = Person::find($id);
        if (!$person) {
            return response()->json(['message' => 'Data not found'], 404);
        }
        $person->delete();
        return response()->json(['message' => 'Data deleted successfully'], 200);
    }
       
}
