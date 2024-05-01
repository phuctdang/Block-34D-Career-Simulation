const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// OWNER CODES
// create a new owner
const createOwner = async(username, password) => {
  try {
   const newOwner = await prisma.owner.create({
      data: {
        username,
        password
      }
    })
    return newOwner;
  } catch(error) {console.log(error)}
}

// find a specific owner
const checkOwner = async(username) => {
  try {
    const existOwner = await prisma.owner.findUnique({
      where: {
        username
      }
    })
    return existOwner
  } catch(error) {console.log(error)};
}


// POSTS CODES
// create a new post
const createPost = async(title, content, ownerId) => {
  try {
   const newPost = await prisma.post.create({
      data: {
        title,
        content,
        ownerId: parseInt(ownerId)
      }
    })
    return newPost;
  } catch(error) {console.log(error)}
}

// get all posts
const getAllPosts = async() => {
  try {
    const allPosts = await prisma.post.findMany();
    return allPosts;
  } catch(error) {console.log(error)};
}


// get a specific post by id
const getPost = async(id) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id)
      }
    })
    return post;
  } catch(error) {console.log(error)};
}


// update a specific post by id
const updatePost = async(id, title, content, ownerId) => {
  try{
    const post = await prisma.post.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        content,
        ownerId: parseInt(ownerId)
      }
    })
    return post;
  } catch(error) {console.log(error)};
}


// delete a specific post by id
const deletePost = async(id) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: parseInt(id)
      }
    })
    return post;
  }catch(error) {console.log(error)};
}


module.exports = {
  createOwner,
  checkOwner,
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
}