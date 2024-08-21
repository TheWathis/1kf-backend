# Use the official Node.js image as a parent image
FROM node:latest

# Install PostgreSQL
RUN apt-get update && \
    apt-get install -y postgresql postgresql-contrib

# Switch to the postgres user and set up the database
USER postgres

# Create a new PostgreSQL role and database
RUN /etc/init.d/postgresql start && \
    psql --command "CREATE USER myuser WITH SUPERUSER PASSWORD 'mypassword';" && \
    createdb -O myuser mydatabase

# Expose the PostgreSQL port
EXPOSE 5432

# Switch back to the default user
USER vscode

# Set the working directory
WORKDIR /workspace

# Copy the current directory contents into the container at /workspace
COPY . /workspace

# Install any needed packages specified in package.json
RUN npm install