FROM nginx:stable-alpine
COPY ./unpackage/dist/build/web/ /usr/share/nginx/html/
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]