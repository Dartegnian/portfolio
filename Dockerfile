# Use Node 18
FROM node:18-alpine3.18

# Set work directory
WORKDIR /app

# Copy everything there
COPY . /app

# Install packages and prerender images
RUN npm i
RUN npm run prerender

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["npm", "run local"]
