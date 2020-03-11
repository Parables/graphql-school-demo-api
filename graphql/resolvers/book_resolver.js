const Book = require("../../models/books.js");

var $this = (module.exports = {
  createBook: args => {
    const Books = new Book({
      cover: args.bookInput.cover,
      title: args.bookInput.title,
      book_code: args.bookInput.book_code,
      author: args.bookInput.author,
      inStock: +args.bookInput.inStock
    });
    return Books.save()
      .then(newBook => {
        console.log(newBook);
        return $this.allBooks();
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  updateBook: async args => {
    return new Promise((resolve, reject) => {
      const updatedBook = {
        cover: args.bookInput.cover,
        title: args.bookInput.title,
        book_code: args.bookInput.book_code,
        author: args.bookInput.author,
        inStock: +args.bookInput.inStock
      };
      console.log(args.bookID);
      return Book.findByIdAndUpdate(
        args.bookID,
        { $set: updatedBook },
        function (err, updateDoc) {
          console.log(`Updated Doc: ${updateDoc} `);
          return resolve($this.allBooks());
        }
      );
    });
  },

  deleteBook: args => {
    return new Promise((resolve, reject) => {
      return Book.findByIdAndDelete(args.bookID, function (err, deletedDoc) {
        console.log(`Book with id: ${deletedDoc} has been deleted`);
        return resolve($this.allBooks());
      });
    });
  },

  book: async args => {
    return new Promise((resolve, reject) => {
      Book.findById(args.bookID, async function (err, foundBook) {
        console.log(`Final Book: ${foundBook}`);
        return resolve(foundBook);
        // Commented because we dont fetch related books now
        /*   const relBooks = await $this
          .relatedBooks([foundBook._id, foundBook._doc.programmeID])
          .then(RelatedBooks => {
            //      Object.assign(foundBook, { relatedBooks: RelatedBooks }); // Options1
            foundBook["relatedBooks"] = RelatedBooks; // Option 2
            console.log(`Final Book: ${foundBook}`);
            return resolve(foundBook);
          })
          .catch(err => {
            console.log(
              `An error occured fetching Related Books  inside book: ${err}`
            );
          }); */
      });
    });
  },

  allBooks: () => {
    return Book.find().then(allBooks => {
      //  return $this.mapRelatedBooksData(allBooks);
      return allBooks;
    });
  },

  relatedBooks: args => {
    return Book.find({
      _id: { $ne: args.bookID === undefined ? args[0] : args.bookID },
      programmeID: args.programmeID === undefined ? args[1] : args.programmeID
    })
      .then(relatedBooks => {
        return relatedBooks;
      })
      .catch(err => {
        console.log(`An error occured fetching Related Books : ${err}`);
      });
  },

  searchBook: args => {
    Book.find({ title: { $regex: ".*" + args.title + ".*" } })
      .then(allBooks => {
        console.log(`All Searched Books \n ${allBooks}`);
        //    return $this.mapRelatedBooksData(allBooks);
        return allBooks;
      })
      .catch(err => {
        console.log(err);
      });
  }
  /* 
  mapRelatedBooksData: allBooks => {
    const AllBooksList = [];
    allBooks.map(book => {
      const bk = new Book(book);
      bk.id = book.id;
      bk.relatedBooks = $this.relatedBooks.bind(this, [
        book.id,
        book.programmeID
      ]);
      console.log(`Adding this: ${bk} to the list`);
      AllBooksList.push(bk);
    });
    console.log(`All Mapped Books: \n ${AllBooksList}`);
    return AllBooksList;
  } */
});
