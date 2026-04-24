<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @viteReactRefresh
            @vite(['resources/css/app.css', 'resources/js/main.tsx'])
        @endif
        <title>{{ config('app.name', 'Laravel') }}</title>
    </head>
    <body class="flex flex-col min-h-screen max-w-7xl mx-auto items-center p-4">
        {{ $slot }}
    </body>
</html>
