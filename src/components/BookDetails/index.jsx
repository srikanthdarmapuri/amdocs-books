import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const BookDetails = ({book, onBack}) => {
  const { title, artist_display, date_display, main_reference_number, thumbnail, dimensions } = book;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={thumbnail?.lqip}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Artist: {artist_display}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {date_display}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Main Reference Number: {main_reference_number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dimensions: {dimensions}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onBack}>Back</Button>
      </CardActions>
    </Card>
  );
}

export default BookDetails;
