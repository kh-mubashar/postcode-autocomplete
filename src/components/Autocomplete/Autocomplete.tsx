import { useState } from 'react';
import { List, ListItemButton, TextField } from '@mui/material';
import { usePostcodeDetails } from '@/hooks/usePostcodeDetails';
import { usePostcodeAutocomplete } from '@/hooks/usePostcodeAutocomplete';
import { PostcodeDetails } from '../PostcodeDetails/PostcodeDetails';
import { styled } from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 300px;
  margin: 0 auto;
  
`;

export const Autocomplete = () => {
  const [query, setQuery] = useState('');
  const [queryDetails, setQueryDetails] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1); // Track focused suggestion

  const { data: suggestions } = usePostcodeAutocomplete(query);
  const { data: postcodeDetails } = usePostcodeDetails(queryDetails);

  const onClickHandler = (value: string) => {
    setQueryDetails(value);
    setQuery('');
    setFocusedIndex(-1); 
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions?.length) {
      switch (e.key) {
        case 'ArrowDown':
          setFocusedIndex((prevIndex) => 
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case 'ArrowUp':
          setFocusedIndex((prevIndex) => 
            prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          if (focusedIndex >= 0) {
            onClickHandler(suggestions[focusedIndex]);
            e.preventDefault();
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
    <Container>
      <TextField
        fullWidth
        label="Enter postcode"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDownHandler} // Attach the onKeyDown handler
      />
      {suggestions && (
        <List component="nav" style={{ position: 'absolute', width: '100%', maxHeight: 150, overflowY: 'auto', border: '1px solid #ddd' }}>
          {suggestions.map((suggestion, index) => (
            <ListItemButton
              key={suggestion}
              selected={index === focusedIndex}
              onClick={() => onClickHandler(suggestion)}
            >
              {suggestion}
            </ListItemButton>
          ))}
        </List>
      )}
    </Container>
      <PostcodeDetails details={postcodeDetails} />
    </>
  );
};
