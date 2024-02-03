CREATE TABLE "cakes" (
        "id" serial NOT NULL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "price" NUMERIC NOT NULL,
        "image" VARCHAR NOT NULL,
        "description" TEXT NOT NULL
);

CREATE TABLE "clients" (
        "id" serial NOT NULL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "address" VARCHAR NOT NULL,
        "phone" VARCHAR NOT NULL
);
CREATE TABLE "orders" (
        "id" serial NOT NULL PRIMARY KEY,
        "clientId" integer NOT NULL REFERENCES "clients"("id"),
        "cakeId" integer NOT NULL REFERENCES "cakes"("id"),
        "quantity" integer NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), 
        "totalPrice" NUMERIC NOT NULL
);
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  "from" VARCHAR(255) NOT NULL,
  "to" VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  type VARCHAR(20) NOT NULL,
  time TIMESTAMP NOT NULL
);
CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  online BOOLEAN NOT NULL DEFAULT false,
  last_activity TIMESTAMP,
  CONSTRAINT unique_name UNIQUE (name)
);

CREATE TABLE "participants" (
        "id" serial NOT NULL PRIMARY KEY,
        "name" VARCHAR NOT NULL
);