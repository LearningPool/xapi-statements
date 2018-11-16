FROM node:8@sha256:d79686b7ff9c9c5342639f374fd1aa887c01b5dd15f34e76697fd23dc71dd58b
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
