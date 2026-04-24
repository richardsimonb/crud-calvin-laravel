<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Person;

class FrontendTest extends TestCase
{
    use RefreshDatabase;

    public function test_frontend_able_to_load(): void
    {
        $person = Person::factory()->create();
        $response = $this->get("/");

        $response->assertStatus(200);
    }
}

