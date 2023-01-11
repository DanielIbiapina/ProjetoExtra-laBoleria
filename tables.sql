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
