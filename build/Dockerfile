FROM php:7.1-apache
ARG DOCUMENT_ROOT
ENV APACHE_DOCUMENT_ROOT ${DOCUMENT_ROOT}
RUN echo $APACHE_DOCUMENT_ROOT
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
COPY default-ssl.conf /etc/apache2/sites-available/default-ssl.conf
COPY docker-php.conf /etc/apache2/conf-available/docker-php.conf


RUN apt-get update && apt-get install -y --fix-missing \
    apt-utils \
    gnupg

RUN echo "deb http://packages.dotdeb.org jessie all" >> /etc/apt/sources.list
RUN echo "deb-src http://packages.dotdeb.org jessie all" >> /etc/apt/sources.list
RUN curl -sS --insecure https://www.dotdeb.org/dotdeb.gpg | apt-key add -

RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libzip-dev libmcrypt-dev libreadline-dev
RUN docker-php-ext-install zip
RUN docker-php-ext-install mcrypt pdo_mysql
RUN a2enmod rewrite
RUN apache2ctl restart