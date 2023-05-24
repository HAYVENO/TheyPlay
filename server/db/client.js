import { PrismaClient } from "@prisma/client";

let prisma;

if (typeof window === "undefined") {
	// running on the server
	prisma = new PrismaClient();
} else {
	// running on the client
	prisma = null; // or handle the error appropriately
}

export { prisma };
//
