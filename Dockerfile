FROM alpine
RUN apk add --update nodejs
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g osrm
RUN npm install
RUN mkdir -p /usr/src/app/node_modules/osrm-isochrone/node_modules/osrm/lib/binding
RUN cp /usr/lib/node_modules/osrm/lib/binding/* /usr/src/app/node_modules/osrm-isochrone/node_modules/osrm/lib/binding/
EXPOSE 5001
CMD [ "npm", "start" ]
