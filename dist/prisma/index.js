"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/prisma/index.ts
const client_1 = require("../generated/prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
