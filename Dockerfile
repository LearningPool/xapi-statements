FROM node:8@sha256:1d33c01da62a9b998147bc2d19411cd690171d599acbdb0beca5ebc462d45915
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
