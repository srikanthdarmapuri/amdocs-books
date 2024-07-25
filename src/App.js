import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Button, TextField } from '@mui/material';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

const Book_List_Url = 'https://api.artic.edu/api/v1/artworks';

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async (pageNumber = currentPage) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${Book_List_Url}?page=${pageNumber}&limit=10`);
      const data = await response.json();
      setBooks(data);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (pageNumber) => {
    fetchData(pageNumber);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleSearch = async (e) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${Book_List_Url}/search?q=${e.target.value}`);
      const data = await response.json();
      setBooks(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>Amdocs Books Test App</h1>
          </Grid>
          <Grid item xs={12}>
            {selectedBook ? (
              <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />
            ) : (
              isLoading ? <p>Loading books...</p> : (
                <>
                  <h2>Book List</h2>
                  <TextField
                    id="standard-basic"
                    label="Books Search"
                    variant="standard"
                    placeholder="Search Books..."
                    onChange={debouncedSearch}
                  />
                  <Button variant="outlined" onClick={() => fetchData(1)}>Reset Search</Button>
                  <BookList
                    books={books.data}
                    currentPage={books?.pagination?.current_page}
                    total={books?.pagination?.total}
                    onPageChange={handlePageChange}
                    onBookClick={handleBookClick}
                  />
                </>
              )
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
