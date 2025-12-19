import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import BookList from './pages/books/BookList';
import AddBook from './pages/books/AddBook';
import EditBook from './pages/books/EditBook';
import BookDetails from './pages/books/BookDetails';

import IssueList from './pages/issued/IssueList';
import AddIssue from './pages/issued/AddIssue';
import EditIssue from './pages/issued/EditIssue';
import IssueDetails from './pages/issued/IssueDetails';

import { BookProvider } from './context/BookContext';
import BookRead from './pages/BookRead';

function App() {
  return (
    <>
      <Navbar />
      <BookProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookread" element={<BookRead />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books/add"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books/edit/:id"
            element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books/:id"
            element={
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/issued"
            element={
              <ProtectedRoute>
                <IssueList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/issued/add"
            element={
              <ProtectedRoute>
                <AddIssue />
              </ProtectedRoute>
            }
          />

          <Route
            path="/issued/edit/:id"
            element={
              <ProtectedRoute>
                <EditIssue />
              </ProtectedRoute>
            }
          />

          <Route
            path="/issued/:id"
            element={
              <ProtectedRoute>
                <IssueDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BookProvider>
    </>
  );
}

export default App;
