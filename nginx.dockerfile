FROM nginx:alpine
LABEL author="Rahul Sahay"
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf