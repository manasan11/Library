import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

const bookImages = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
];

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', status: 'Available', year: 1925, description: 'A tale of wealth and lost love in the Jazz Age. Set in the 1920s, this novel explores themes of decadence, idealism, resistance to change, social upheaval, and excess.', image: bookImages[0] },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', status: 'Available', year: 1960, description: 'A powerful story of racial injustice and childhood innocence. Through the eyes of young Scout Finch, we witness her father defend a Black man accused of a crime.', image: bookImages[1] },
  { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', status: 'Available', year: 1949, description: 'A chilling portrayal of a totalitarian future society. Winston Smith struggles against the omnipresent surveillance state Big Brother in this haunting classic.', image: bookImages[2] },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', status: 'Available', year: 1813, description: 'A witty romance exploring love and social class. The story follows Elizabeth Bennet as she navigates issues of manners, upbringing, and marriage.', image: bookImages[3] },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', status: 'Available', year: 1951, description: 'A coming-of-age story of teenage alienation. Holden Caulfield wanders New York City after being expelled from prep school.', image: bookImages[4] },
  { id: 6, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', status: 'Available', year: 1988, description: 'A magical tale about following your dreams. Santiago, a shepherd boy, journeys to find a treasure in the Egyptian pyramids.', image: bookImages[5] },
  { id: 7, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy', status: 'Available', year: 1997, description: 'The magical adventures of a young wizard. Harry discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.', image: bookImages[6] },
  { id: 8, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', status: 'Available', year: 1937, description: 'A fantasy adventure in Middle-earth. Bilbo Baggins is swept into an adventure with a group of dwarves to reclaim their homeland.', image: bookImages[7] },
];

let issued = [
  { id: 1, bookId: 1, bookTitle: 'The Great Gatsby', studentName: 'John Doe', issueDate: '2024-01-15', returnDate: '2024-01-22' },
  { id: 2, bookId: 3, bookTitle: '1984', studentName: 'Jane Smith', issueDate: '2024-01-10', returnDate: '2024-01-17' },
];

let users = [
  { id: 1, name: 'MANASA', email: 'manasa@gmail.com', password: 'manasa@123', role: 'student' },
  { id: 2, name: 'Admin', email: 'admin@gmail.com', password: 'Admin@123', role: 'admin' },
];

let bookIdCounter = books.length + 1;
let issuedIdCounter = issued.length + 1;
let userIdCounter = users.length + 1;

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.post('/books', (req, res) => {
  const book = { id: bookIdCounter++, ...req.body };
  books.push(book);
  res.json(book);
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Book deleted' });
});

app.get('/issued', (req, res) => {
  res.json(issued);
});

app.get('/issued/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const issue = issued.find(i => i.id === id);
  if (issue) {
    res.json(issue);
  } else {
    res.status(404).json({ message: 'Issue not found' });
  }
});

app.post('/issued', (req, res) => {
  const issue = { id: issuedIdCounter++, ...req.body };
  issued.push(issue);
  res.json(issue);
});

app.put('/issued/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = issued.findIndex(i => i.id === id);
  if (index !== -1) {
    issued[index] = { ...issued[index], ...req.body };
    res.json(issued[index]);
  } else {
    res.status(404).json({ message: 'Issue not found' });
  }
});

app.delete('/issued/:id', (req, res) => {
  const id = parseInt(req.params.id);
  issued = issued.filter(i => i.id !== id);
  res.json({ message: 'Issue deleted' });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = { id: userIdCounter++, ...req.body };
  users.push(user);
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
