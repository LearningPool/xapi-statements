FROM node:8@sha256:0fe5d182140baa744c84bb856d8cbabd7e1c4766d4a5ad4ef80e5656b0dd1be4
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
