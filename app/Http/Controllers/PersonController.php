<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class PersonController extends Controller
{
    public function index() : JsonResponse
    {
        $person = Person::all();
        if ($person->isEmpty()) {
            return response()->json(['message' => 'Data not found'], 404);
        }
        return response()->json([
            'message' => 'Data retrieved successfully',
            'data' => $person
        ], 200);
    }

    public function show($id) : JsonResponse
    {
        $person = Person::find($id);
        if (!$person) {
            return response()->json(['message' => 'Data not found'], 404);
        }
        return response()->json([
            'message' => 'Data retrieved successfully',
            'data' => $person
        ], 200);
    }

    public function store(Request $request) : JsonResponse
    {
        if(!$request->isJson()) {
            return response()->json(['message' => 'Only Accept JSON'], 400);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'phone_number' => 'required|string|regex:/^[0-9]{7,12}$/',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        if (Person::where('name', $request->name)->exists()) {
            return response()->json(['message' => 'Data already exists'], 409);
        }
        $person = Person::create($request->all());
        return response()->json([
            'message' => 'Data saved successfully',
            'data' => $person
        ], 200);
    }

    public function update(Request $request) : JsonResponse
    {
        if(!$request->isJson()) {
            return response()->json(['message' => 'Only Accept JSON'], 400);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'phone_number' => 'required|string|regex:/^[0-9]{7,12}$/',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }
        $person = Person::where('name', $request->name)->first();
        if (!$person) {
            return response()->json(['message' => 'Data not found'], 404);
        }
        if ($person->phone_number === $request->phone_number) {
            return response()->json(null, 204);
        }
        $person->phone_number = $request->phone_number;
        $person->update();
        return response()->json([
            'message' => 'Data updated successfully',
            'data' => $person
        ], 200);
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

    public function exportCsv() {
    $callback = function() {
        $file = fopen('php://output', 'w');
        fputcsv($file, ['Name', 'Phone Number']);
        
        Person::query()->each(function($person) use($file) {
            fputcsv($file, [$person->name, $person->phone_number]);
        });
        fclose($file);
    };

    return response()->stream($callback, 200, [
        "Content-type" => "text/csv",
        "Content-Disposition" => "attachment; filename=person.csv",
    ]);
}
       
}
