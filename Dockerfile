FROM dunglas/frankenphp

RUN install-php-extensions \
	pdo_pgsql

ENV SERVER_NAME=:80