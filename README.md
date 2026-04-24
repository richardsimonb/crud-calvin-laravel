# CRUD Application untuk tugas interview Calvin Institute

Repository ini merupakan aplikasi CRUD yang dibuat sebagai tugas untuk interview.
Adapun tech stack yang dipakai:
- Laravel (Backend)
- React (Frontend)
- Postgresql (Database)
- Docker

## Quickstart

Tahapan paling cepat untuk menggunakan aplikasi adalah dengan menggunakan docker.
Langkah pertama clone repository ini atau download file zip lalu extract.
```
git clone https://github.com/richardsimonb/crud-calvin-laravel.git
```
Lalu pindah ke folder repository
```
cd crud-calvin-laravel
```

Pastikan pada komputer sudah terinstall docker dan docker compose.
Kemudian jalankan perintah berikut untuk membuat build docker.
```
docker compose build --no-cache
```

Tunggu beberapa menit, kemudian setelah selesai jalankan docker compose.
```
docker compose up -d
```

### Migration
Setelah docker berhasil berjalan, lakukan migrasi pada docker.
```
docker compose exec app php artisan migrate
```

### Testing
Untuk menjalankan testing di dalam docker gunakan perintah:
```
docker compose exec app php artisan test
```

## Available Routes
Akses yang tersedia pada aplikasi:\
**GET 127.0.0.1:8080**\
Frontend \
**GET 127.0.0.1:8080/api/person**\
API point untuk mengambil seluruh data\
**GET 127.0.0.1:8080/api/person/{id}**\
API point untuk mengambil satu data\
**POST 127.0.0.1:8080/api/person**\
API point untuk menyimpan data\
Gunakan Header Content-Type : application/json\
Contoh body:
```
{
  "name" : "Ark",
  "phone_number" : "10203040"
}
```
**PATCH 127.0.0.1:8080/api/person**\
API point untuk memperbaharui data\
Gunakan header dan contoh body diatas\
**DELETE 127.0.0.1:8080/api/person/{id}**\
API point untuk menghapus data

## Local Environment Installation
Pastikan sudah terinstall:
PHP 8.5
Composer
Node 20 atau lebih
PostgreSQL

Untuk installasi local dapat menjalakan perintah
```
composer install
npm install
npm run build
php artisan key:generate
php artisan migrate
php artisan serve --port=8080
```

Terkait installasi masing-masing komponen dapat merujuk ke:
- [Laravel](https://laravel.com/docs/13.x/installation)
- [Composer](https://getcomposer.org/doc/00-intro.md)
- [Node](https://nodejs.org/en/download)

