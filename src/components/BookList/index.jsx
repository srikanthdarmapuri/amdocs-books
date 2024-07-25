import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import Box from '@mui/material/Box';
import Pagination from '../Pagination';


const ListItemLink = (props) => {
    const { book, onClick } = props;

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClick}>
                <ListItemAvatar>
                    <Avatar alt={book.thumbnail?.alt} src={book.thumbnail?.lqip} />
                </ListItemAvatar>
                <ListItemText primary={book.title} />
            </ListItemButton>
        </ListItem>
    );
}

const BookList = ({ books, currentPage, total, onPageChange, onBookClick }) => {
    return (
        <Box>
            <nav aria-label="main mailbox folders">
                <List>
                    {books?.map((book) => (
                        <ListItemLink key={book.id} book={book} onClick={() => onBookClick(book)} />
                    ))}
                </List>
            </nav>
            <Pagination currentPage={currentPage} total={total} onPageChange={onPageChange} />
        </Box >
    );
};

export default BookList;
