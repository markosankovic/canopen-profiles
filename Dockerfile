FROM nginx
MAINTAINER Marko Sanković <msankovic@synapticon.com>

COPY dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
