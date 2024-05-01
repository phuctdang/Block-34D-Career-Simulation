const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createOwner, createPost } = require('../db/index.js');

const seed = async() => {
  console.log("SEEDING DATABASE...");

  console.log("Creating owners...");
  const owner1 = await createOwner("sample_owner1", "sample_password1"); 
  const owner2 = await createOwner("sample_owner2", "sample_password2"); 
  const owner3 = await createOwner("sample_owner3", "sample_password3");
  console.log("Owners created!");

  console.log("Creating posts...");
  await createPost("sample_post1", "sample_content1", owner1.id);
  await createPost("sample_post2", "sample_content2", owner1.id);
  await createPost("sample_post3", "sample_content3", owner1.id);
  await createPost("sample_post4", "sample_content4", owner2.id);
  await createPost("sample_post5", "sample_content5", owner2.id);
  await createPost("sample_post6", "sample_content6", owner2.id);
  await createPost("sample_post7", "sample_content7", owner3.id);
  await createPost("sample_post8", "sample_content8", owner3.id);
  await createPost("sample_post9", "sample_content9", owner3.id);
  console.log("Posts created!");

  console.log("DATABASE SEEDED!");
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })