<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Person;

class APITest extends TestCase
{
    use RefreshDatabase;

    public function test_api_returns_list_of_person(): void
    {
        Person::factory()->count(3)->create();
        $response = $this->get('/api/person');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_api_returns_error_if_person_list_is_empty(): void
    {
        $response = $this->get('/api/person');

        $response->assertStatus(404)
            ->assertJsonFragment(['message' => 'Data not found']);
    }

    public function test_api_returns_a_person_data(): void
    {
        $person = Person::factory()->create();
        $response = $this->get("/api/person/{$person->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => $person->name,
                'phone_number' => $person->phone_number,
            ]);
    }

    public function test_api_returns_error_if_data_is_empty(): void
    {
        $response = $this->get('/api/person');

        $response->assertStatus(404)
            ->assertJsonFragment(['message' => 'Data not found']);
    }

    public function test_api_stores_person_data(): void
    {
        $response = $this->json('POST', '/api/person', [
            'name' => 'John Doe',
            'phone_number' => '1234567890',
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => 'John Doe',
                'phone_number' => '1234567890',
            ]);

        $this->assertDatabaseHas('person', ['name' => 'John Doe', 'phone_number' => '1234567890']);
    }

    public function test_api_returns_error_if_name_already_used(): void
    {
        Person::factory()->create([
            'name' => 'John Doe',
            'phone_number' => '1234567890',
        ]);

        $response = $this->json('POST', '/api/person', [
            'name' => 'John Doe',
            'phone_number' => '1234567890',
        ]);

        $response->assertStatus(409)
            ->assertJsonFragment(['message' => 'Data already exists']);
    }

    public function test_api_returns_error_if_phone_number_is_invalid(): void
    {
        $response = $this->json('POST', '/api/person', [
            'name' => 'John Ark',
            'phone_number' => 'abcdef',
        ]);

        $response->assertStatus(422)
            ->assertJsonFragment(['message' => 'Validation failed']);
    }

    public function test_api_updates_person_data(): void
    {
        $person = Person::factory()->create();

        $response = $this->json('PATCH', "/api/person", [
            'name' => $person->name,
            'phone_number' => '0987654321',
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => $person->name,
                'phone_number' => '0987654321',
            ]);
        
        $this->assertDatabaseHas('person', ['name' => $person->name, 'phone_number' => '0987654321']);
    }

    
    public function test_api_returns_error_if_updated_phone_number_is_invalid(): void
    {
        $person = Person::factory()->create();

        $response = $this->json('PATCH', "/api/person", [
            'name' => $person->name,
            'phone_number' => 'abcdef',
        ]);

        $response->assertStatus(422)
            ->assertJsonFragment(['message' => 'Validation failed']);
    }
    public function test_api_returns_no_content_if_updated_phone_number_is_same(): void
    {
        $person = Person::factory()->create();

        $response = $this->json('PATCH', "/api/person", [
            'name' => $person->name,
            'phone_number' => $person->phone_number,
        ]);

        $response->assertStatus(204);
    }

    public function test_api_deletes_person_data(): void
    {
        $person = Person::factory()->create();

        $response = $this->delete("/api/person/{$person->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Data deleted successfully']);

        $this->assertDatabaseMissing('person', ['id' => $person->id]);
    }

}
