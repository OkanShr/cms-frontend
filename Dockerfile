# Stage 1: Build the Vite app
FROM node:19.5.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy the package.json and lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the source code to the working directory
COPY . .

# Copy SSL certificates into the container
COPY certs/ /etc/ssl/certs/

# Build the Vite app
RUN npm run build

# Stage 2: Use Nginx to serve the built files
FROM nginx:alpine

# Copy the built app from the build stage to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy SSL certificates into the container
COPY certs/ /etc/nginx/certs/

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 443 for HTTPS
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
