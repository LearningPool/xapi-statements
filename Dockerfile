FROM node:8@sha256:6b2c3d78f4e77fb1ef1e3058affdd1d3ba0b319b5eaf479167672914e555e346
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
