import { Book } from "../models/bookModel.js";

export const createBook = async(req, res)=>{
 try 
 {
    const existingBook = await Book.findOne({ title: req.body.title });

    // Check if the book with this name already exists
    if (existingBook) {
      return res
        .status(409)
        .json({ message: "Book with this title already exists." });
    }
    // Create new book
    const book = await Book.create(req.body);

    res.status(409).json(book);
}
 catch (error) {
    
 }
}

//update

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    res.json(book);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Get by ID

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Get all Book

export const bookListing = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.page) || 10;

    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog by ID

export const deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.json(book);
  } catch (error) {
    res.json({ message: error.message });
  }
};
